import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const tabbordionUuid = (function() {
    let index = 0

    return function() {
        return 'tabbordion-' + index++
    }
})()

const isFunction = (function() {
    function typeOfFn(fn) {
        return typeof fn === 'function'
    }

    function objectFn(fn) {
        return Object.prototype.toString.call(fn) === '[object Function]'
    }

    // typeof is fastest way to check if a function but older IEs don't support it for that and Chrome had a bug
    if (typeof typeOfFn === 'function' && typeof /./ !== 'function') {
        return typeOfFn
    }

    return objectFn
})()

function classWithModifiers(className, modifiers, separator) {
    let classNames = ''

    if (className == null) {
        return null
    }

    if (typeof className !== 'string') {
        className = String(className)
    }

    if (!Array.isArray(modifiers)) {
        return className
    }

    if (typeof separator !== 'string') {
        separator = '--'
    }

    let i = className.indexOf(' ')

    if (i >= 0) {
        classNames = className.slice(i)
        className = className.slice(0, i)

        if (separator.length > 0) {
            let prefixedClassName = ' ' + className + separator
            let prefixedSeparator = ' ' + separator

            for (
                i = classNames.indexOf(prefixedSeparator);
                i >= 0;
                i = classNames.indexOf(prefixedSeparator, i + className.length)
            ) {
                classNames = classNames.replace(prefixedSeparator, prefixedClassName)
            }
        }
    }

    let BEM = className

    for (i = 0; i < modifiers.length; i++) {
        if ((typeof modifiers[i] === 'string') && (modifiers[i].length > 0)) {
            BEM += ' ' + className + separator + modifiers[i]
        }
    }

    return BEM + classNames
}

function getElementHeight(element) {
    let bounds = element.getBoundingClientRect()
    let elementHeightInPixels = Math.ceil(bounds.bottom - bounds.top)

    return elementHeightInPixels
}

// backwards compatibility export
export class Panel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            contentHeight: null
        }

        this.tag = props.tag || 'li'

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleLabelClick = this.handleLabelClick.bind(this)
        this.updateHeight = this.updateHeight.bind(this)
    }

    componentDidMount() {
        this.updateHeight()

        if (window.addEventListener) {
            window.addEventListener('resize', this.updateHeight, false)
        }
    }

    componentDidUpdate() {
        this.updateHeight()
    }

    componentWillReceiveProps(nextProps) {
        this.tag = nextProps.tag || 'li'
    }

    componentWillUnmount() {
        if (window.removeEventListener) {
            window.removeEventListener('resize', this.updateHeight, false)
        }
    }

    updateHeight() {
        if (this.props.animateContent && this.refs.content) {
            const animator = ReactDOM.findDOMNode(this.refs.animator)
            const content = ReactDOM.findDOMNode(this.refs.content)
            let height = null

            switch (this.props.animateContent) {
                case 'height':
                    height = this.props.checked ? getElementHeight(content) : 0

                    const cssHeight = height + 'px'

                    if (animator.style.height === cssHeight) {
                        return
                    }

                    animator.style.height = cssHeight

                    if (content.style.marginTop) {
                        content.style.marginTop = null
                    }

                    break
                case 'marginTop':
                    height = !this.props.checked ? getElementHeight(content) : 0

                    // required for transitions: display: none; in parent will result any child to have zero height
                    // (yes, even before the display rule visually kicks in we will get zero for any child it has)
                    if (this.props.checked === false && height === 0) {
                        return
                    }

                    const marginTop = -height + 'px'

                    if (content.style.marginTop === marginTop) {
                        return
                    }

                    content.style.marginTop = marginTop

                    if (animator.style.height) {
                        animator.style.height = null
                    }

                    break
                default:
            }

            // would infinite loop if used setState
            if (this.state.height !== height) {
                this.state.height = height
            }
        }
    }

    handleInputChange() {
        this.props.setIndex(this.props.index)
    }

    handleLabelClick(event) {
        event.preventDefault()
        const input = ReactDOM.findDOMNode(this.refs.input)
        if (input) input.click()
    }

    render() {
        const ariaSelected = this.props.checked ? 'true' : 'false'

        const elementProps = {
            'aria-expanded': this.props.children ? ariaSelected : null,
            'aria-selected': ariaSelected,
            'role': 'tab'
        }

        for (let key in this.props) {
            if (this.props.hasOwnProperty(key) && !Panel.propTypes.hasOwnProperty(key)) {
                elementProps[key] = this.props[key]
            }
        }

        if (!this.props.visible) {
            elementProps.style = elementProps.style || {}
            elementProps.style.display = 'none'
        }

        const classNames = this.props.classNames
        const separator = this.props.classSeparator
        const id = this.props.name + '-' + this.props.index
        const value = '' + this.props.index

        const classModifiers = this.props.classModifiers
        const modifiers = []

        if (this.props.animateContent) {
            modifiers.push(classModifiers.animated)
        }

        modifiers.push(this.props.checked ? classModifiers.checked : classModifiers.unchecked)
        modifiers.push(this.props.disabled ? classModifiers.disabled : classModifiers.enabled)

        if (this.props.visible) {
            if (this.props.isBetween) {
                modifiers.push(classModifiers.visibleBetween)
            } else {
                if (this.props.isFirst) {
                    modifiers.push(classModifiers.visibleFirst)
                }

                if (this.props.isLast) {
                    modifiers.push(classModifiers.visibleLast)
                }
            }
        }

        if (React.Children.count(this.props.children)) {
            const animatedModifiers = modifiers.concat(this.props.animateContent)

            const contentProps = {
                'aria-labelledby': id,
                'className': classWithModifiers(classNames.content, animatedModifiers, separator),
                'id': 'panel-' + id,
                'ref': 'content',
                'role': 'tabpanel',
                'style': { marginTop: '' }
            }

            const animatorProps = {
                className: classWithModifiers(classNames.animator, animatedModifiers, separator),
                ref: 'animator',
                style: { height: '', overflow: 'hidden' }
            }

            switch (this.props.animateContent && this.state.contentHeight != null) {
                case 'height':
                    animatorProps.style.height = this.state.contentHeight + 'px'
                    break
                case 'marginTop':
                    contentProps.style.marginTop = -this.state.contentHeight + 'px'
                    break
                default:
            }

            var children = React.createElement(
                this.props.contentTag || 'div',
                contentProps,
                (function(props) {
                    return React.Children.map(props.children, function(child) {
                        if (child && child.type && child.type.isPanelChild === true) {
                            return React.cloneElement(child, {
                                isPanelChecked: props.checked,
                                isPanelVisible: props.visible,
                                panelIndex: props.index,
                                panelName: props.name,
                                panelSelectedChecked: props.selectedChecked,
                                panelSelectedIndex: props.selectedIndex,
                                setPanelIndex: props.setIndex
                            })
                        }

                        return child
                    })
                })(this.props)
            )

            if (this.props.animateContent) {
                children = React.createElement('div', animatorProps, children)
            }

            modifiers.push(classModifiers.content)
        } else {
            modifiers.push(classModifiers.noContent)
        }

        elementProps.className = classWithModifiers(
            classNames.panel + (elementProps.className ? ' ' + elementProps.className : ''),
            modifiers,
            separator
        )

        return (
            <this.tag {...elementProps}>
                <input
                    aria-controls={children ? 'panel-' + id : null}
                    checked={this.props.checked}
                    className={classWithModifiers(classNames.state, modifiers, separator)}
                    data-state="tabbordion"
                    disabled={!this.props.visible || this.props.disabled}
                    id={id}
                    name={this.props.name}
                    onChange={this.handleInputChange}
                    ref="input"
                    type={this.props.type}
                    value={value}
                />
                <label
                    className={classWithModifiers(classNames.title, modifiers, separator)}
                    id={'label-' + id}
                    htmlFor={id}
                    onClick={this.handleLabelClick}
                >
                    {this.props.title}
                </label>
                {children}
            </this.tag>
        )
    }
}

Panel.defaultProps = {
    animateContent: false,
    classModifiers: {
        animated: 'animated',
        checked: 'checked',
        content: 'content',
        disabled: 'disabled',
        enabled: 'enabled',
        noContent: 'no-content',
        unchecked: 'unchecked',
        visibleBetween: 'between',
        visibleFirst: 'first',
        visibleLast: 'last'
    },
    classNames: {
        animator: 'panel__animator',
        content: 'panel__content',
        panel: 'panel',
        state: 'panel__state',
        title: 'panel__title'
    },
    classSeparator: '--',
    disabled: false,
    visible: true
}

Panel.propTypes = {
    animateContent: PropTypes.oneOf([
        false,
        'height',
        'marginTop'
    ]),
    checked: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    classModifiers: PropTypes.shape({
        animated: PropTypes.string,
        checked: PropTypes.string,
        content: PropTypes.string,
        disabled: PropTypes.string,
        enabled: PropTypes.string,
        noContent: PropTypes.string,
        unchecked: PropTypes.string,
        visibleBetween: PropTypes.string,
        visibleFirst: PropTypes.string,
        visibleLast: PropTypes.string
    }),
    classNames: PropTypes.shape({
        animator: PropTypes.string,
        content: PropTypes.string,
        panel: PropTypes.string,
        state: PropTypes.string,
        title: PropTypes.string
    }),
    classSeparator: PropTypes.string,
    contentTag: PropTypes.string,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    isBetween: PropTypes.bool,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    name: PropTypes.string,
    selectedChecked: PropTypes.array,
    selectedIndex: PropTypes.number,
    setIndex: PropTypes.func,
    tag: PropTypes.string,
    title: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['checkbox', 'radio']),
    visible: PropTypes.bool
}

function getNextState(props, name, checked) {
    let count = 0
    let index = null
    let visibleCount = 0

    React.Children.forEach(props.children, function(child) {
        if (child && child.type === Panel) {
            const childProps = child.props || child._store.props || {}

            if (typeof childProps.checked === 'boolean') {
                checked[count] = childProps.checked
                if (index === null && checked[count]) {
                    index = count
                }
            }

            if (childProps.visible) {
                visibleCount++
            }

            count++
        }
    })

    checked.length = count

    for (let i = 0; i < count; i++) {
        if (typeof checked[i] !== 'boolean') {
            checked[i] = !!checked[i]
        }
        if (index === null && checked[i]) {
            index = i
        }
    }

    return { checked, count, index, name, visibleCount }
}

// backwards compatibility export
export class Tabbordion extends React.Component {
    constructor(props) {
        super(props)

        // this, my friend, is a hack (getNextState needs further thoughts; render can prevent state change)
        this.stateLocked = false

        this.state = getNextState(props, tabbordionUuid(), [])

        const index = props.initialIndex === ~~props.initialIndex ? props.initialIndex : null
        // handle initial index
        if (this.state.index === null && index !== null && index >= 0 && index < this.state.count) {
            this.state.checked[index] = true
            this.state.index = index
        }

        this.setIndex = this.setIndex.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (!this.stateLocked) {
            this.setState(getNextState(nextProps, this.state.name, this.state.checked))
        }
    }

    setIndex(newIndex) {
        let newState = { checked: this.state.checked, index: this.state.index }

        this.stateLocked = true

        switch (this.props.mode) {
            // any panel can be open or closed (plausible accordion behavior)
            case 'multiple':
                newState.index = newIndex
                newState.checked[newIndex] = !newState.checked[newIndex]
                break
            // one panel is always open (normal tabs behavior)
            case 'single':
                newState.index = newIndex
                newState.checked = newState.checked.map((checked, index) => index === newIndex)
                break
            // only one panel may be open at one time (normal accordion behavior)
            case 'toggle':
                newState.index = newState.index !== newIndex ? newIndex : null
                newState.checked = newState.checked.map(
                    (checked, index) => index === newIndex && newIndex === newState.index
                )
                break
            default:
                throw new Error('unknown mode: ' + this.props.mode)
        }

        if (isFunction(this.props.onBeforeChange)) {
            const stateOverride = this.props.onBeforeChange(
                { checked: newState.checked.slice(0), index: newState.index },
                { checked: this.state.checked.slice(0), index: this.state.index }
            )

            if (typeof stateOverride === 'object' && Array.isArray(stateOverride.checked)
                && stateOverride.checked.length === newState.checked.length && stateOverride.hasOwnProperty('index')
            ) {
                newState = {
                    checked: stateOverride.checked.map(Boolean),
                    index: stateOverride.index != null ? ~~stateOverride.index : null
                }
            }
        }

        if (isFunction(this.props.onAfterChange)) {
            this.setState(newState, () => {
                this.props.onAfterChange({ checked: newState.checked.slice(0), index: newState.index })
                this.stateLocked = false
            })
        } else {
            this.setState(newState, () => {
                this.stateLocked = false
            })
        }

        if (isFunction(this.props.onChange)) {
            this.props.onChange({ checked: newState.checked.slice(0), index: newState.index })
        }
    }

    render() {
        const elementProps = { role: 'tablist' }

        for (let key in this.props) {
            if (this.props.hasOwnProperty(key) && !Tabbordion.propTypes.hasOwnProperty(key)) {
                elementProps[key] = this.props[key]
            }
        }

        if (elementProps.className) {
            elementProps.className = classWithModifiers(
                elementProps.className,
                [
                    'checked-count-' + this.state.checked.reduce(function(count, checked) {
                        return count + checked
                    }, 0),
                    'count-' + this.state.count
                ],
                this.props.classSeparator
            )
        }

        return (
            <this.props.tag {...elementProps}>
                {(function(props, state, setIndex) {
                    const modeType = props.mode === 'multiple' ? 'checkbox' : 'radio'
                    const name = props.name.length ? props.name : state.name

                    let panelCounter = 0
                    let visibleCounter = 0

                    return React.Children.map(props.children, function(child) {
                        let isBetween = false, isFirst = false, isLast = false

                        if (!child) {
                            return child
                        } else if (child.type === Panel) {
                            const childProps = child.props || child._store.props || {}
                            const index = panelCounter++

                            if (childProps.visible) {
                                visibleCounter++

                                if (visibleCounter === 1) {
                                    isFirst = true
                                }

                                if (visibleCounter === state.visibleCount) {
                                    isLast = true
                                }

                                isBetween = !isFirst && !isLast
                            }

                            child = React.cloneElement(child, {
                                animateContent: props.animateContent,
                                checked: state.checked[index],
                                classModifiers: props.classModifiers,
                                classNames: props.classNames,
                                classSeparator: props.classSeparator,
                                contentTag: childProps.contentTag || props.contentTag,
                                index: index,
                                isBetween: isBetween,
                                isFirst: isFirst,
                                isLast: isLast,
                                name: childProps.name || name,
                                selectedChecked: state.checked.slice(0),
                                selectedIndex: state.index,
                                setIndex: setIndex,
                                tag: childProps.tag || props.panelTag,
                                type: childProps.type || modeType
                            })
                        } else if (child.type && child.type.isPanel === true) {
                            child = React.cloneElement(child, {
                                panelName: name,
                                panelSelectedChecked: state.checked.slice(0),
                                panelSelectedIndex: state.index,
                                panelSetIndex: setIndex
                            })
                        }

                        return child
                    })
                })(this.props, this.state, this.setIndex)}
            </this.props.tag>
        )
    }
}

Tabbordion.defaultProps = {
    animateContent: false,
    classModifiers: {
        animated: 'animated',
        checked: 'checked',
        content: 'content',
        disabled: 'disabled',
        enabled: 'enabled',
        noContent: 'no-content',
        unchecked: 'unchecked',
        visibleBetween: 'between',
        visibleFirst: 'first',
        visibleLast: 'last'
    },
    classNames: {
        animator: 'panel__animator',
        content: 'panel__content',
        panel: 'panel',
        state: 'panel__state',
        title: 'panel__title'
    },
    classSeparator: '--',
    initialIndex: null,
    mode: 'single',
    name: '',
    tag: 'ul'
}

Tabbordion.propTypes = {
    animateContent: PropTypes.oneOf([false, 'height', 'marginTop']),
    classModifiers: PropTypes.shape({
        animated: PropTypes.string,
        checked: PropTypes.string,
        content: PropTypes.string,
        disabled: PropTypes.string,
        enabled: PropTypes.string,
        noContent: PropTypes.string,
        unchecked: PropTypes.string,
        visibleBetween: PropTypes.string,
        visibleFirst: PropTypes.string,
        visibleLast: PropTypes.string
    }),
    classNames: PropTypes.shape({
        animator: PropTypes.string,
        content: PropTypes.string,
        panel: PropTypes.string,
        state: PropTypes.string,
        title: PropTypes.string
    }),
    classSeparator: PropTypes.string,
    contentTag: PropTypes.string,
    initialIndex: PropTypes.number,
    mode: PropTypes.oneOf(['multiple', 'single', 'toggle']),
    name: PropTypes.string,
    onAfterChange: PropTypes.func,
    onBeforeChange: PropTypes.func,
    onChange: PropTypes.func,
    panelTag: PropTypes.string,
    tag: PropTypes.string
}

// UMD exports
Tabbordion.Panel = Panel
export default Tabbordion
