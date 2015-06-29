(function(isCommonJs) {
    'use strict'

    var React = isCommonJs ? require('react') : window.React

    var tabbordionUuid = (function() {
        var index = 0

        return function() {
            return 'tabbordion-' + index++
        }
    })()

    var isFunction = (function() {
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
        var BEM, classNames = '', i

        if (className == null) {
            return null
        }

        if (typeof className !== 'string') {
            className = String(className)
        }

        if (!Array.isArray(modifiers) || modifiers.length === 0) {
            return className
        }

        if (typeof separator !== 'string') {
            separator = '--'
        }

        i = className.indexOf(' ')

        if (i >= 0) {
            classNames = className.slice(i)
            className = className.slice(0, i)
        }

        BEM = className

        for (i = 0; i < modifiers.length; i++) {
            if ((typeof modifiers[i] === 'string') && (modifiers[i].length > 0)) {
                BEM += ' ' + className + separator + modifiers[i]
            }
        }

        return BEM + classNames
    }

    function getCountsOfType(props, reactType) {
        var count = 0,
            visibleCount = 0

        React.Children.map(props.children, function(child) {
            if (child.type === reactType) {
                count++

                if ((child.props || child._store.props).visible) {
                    visibleCount++
                }
            }
        })

        return {
            count: count,
            visibleCount: visibleCount
        }
    }

    function getElementHeight(element) {
        var bounds = element.getBoundingClientRect(),
            elementHeightInPixels = Math.ceil(bounds.bottom - bounds.top)

        return elementHeightInPixels
    }

    var Panel = React.createClass({
        displayName: 'Panel',

        propTypes: {
            animateContent: React.PropTypes.oneOf([
                false,
                'height',
                'marginTop'
            ]),
            checked: React.PropTypes.bool,
            children: React.PropTypes.oneOfType([
                React.PropTypes.arrayOf(React.PropTypes.node),
                React.PropTypes.node
            ]),
            classModifiers: React.PropTypes.shape({
                animated: React.PropTypes.string,
                checked: React.PropTypes.string,
                content: React.PropTypes.string,
                disabled: React.PropTypes.string,
                enabled: React.PropTypes.string,
                noContent: React.PropTypes.string,
                unchecked: React.PropTypes.string,
                visibleBetween: React.PropTypes.string,
                visibleFirst: React.PropTypes.string,
                visibleLast: React.PropTypes.string
            }),
            classNames: React.PropTypes.shape({
                animator: React.PropTypes.string,
                content: React.PropTypes.string,
                panel: React.PropTypes.string,
                state: React.PropTypes.string,
                title: React.PropTypes.string
            }),
            classSeparator: React.PropTypes.string,
            contentTag: React.PropTypes.string,
            disabled: React.PropTypes.bool,
            index: React.PropTypes.number,
            isBetween: React.PropTypes.bool,
            isFirst: React.PropTypes.bool,
            isLast: React.PropTypes.bool,
            name: React.PropTypes.string,
            selectedChecked: React.PropTypes.array,
            selectedIndex: React.PropTypes.number,
            setIndex: React.PropTypes.func,
            tag: React.PropTypes.string,
            title: React.PropTypes.node.isRequired,
            type: React.PropTypes.oneOf(['checkbox', 'radio']),
            visible: React.PropTypes.bool
        },

        getDefaultProps: function() {
            return {
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
                contentTag: 'div',
                disabled: false,
                tag: 'li',
                visible: true
            }
        },

        getInitialState: function() {
            return {
                contentHeight: null
            }
        },

        componentDidMount: function() {
            this.updateHeight()
            if (window.addEventListener) {
                addEventListener('resize', this.updateHeight)
            }
        },

        componentDidUpdate: function() {
            this.updateHeight()
        },

        componentWillUnmount: function() {
            if (window.removeEventListener) {
                removeEventListener('resize', this.updateHeight)
            }
        },

        updateHeight: function() {
            if (this.props.animateContent && this.refs.content) {
                var animator = React.findDOMNode(this.refs.animator),
                    content = React.findDOMNode(this.refs.content),
                    height = null

                switch (this.props.animateContent) {
                    case 'height':
                        height = this.props.checked ? getElementHeight(content) : 0

                        var cssHeight = height + 'px'

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

                        var marginTop = -height + 'px'

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
        },

        handleInputChange: function() {
            this.props.setIndex(this.props.index)
        },

        handleLabelClick: function(event) {
            event.preventDefault()
            var input = React.findDOMNode(this.refs.input)
            input.click()
        },

        render: function() {
            var ariaSelected = this.props.checked ? 'true' : 'false'

            var elementProps = {
                'aria-expanded': this.props.children ? ariaSelected : null,
                'aria-selected': ariaSelected
            }

            for (var key in this.props) {
                if (this.props.hasOwnProperty(key) && !Panel.propTypes.hasOwnProperty(key)) {
                    elementProps[key] = this.props[key]
                }
            }

            if (!this.props.visible) {
                elementProps.style = elementProps.style || {}
                elementProps.style.display = 'none'
            }

            var classNames = this.props.classNames,
                separator = this.props.classSeparator,
                id = this.props.name + '-' + this.props.index,
                value = '' + this.props.index

            var classModifiers = this.props.classModifiers,
                modifiers = []

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

            if (this.props.children) {
                var animatedModifiers = modifiers.concat(this.props.animateContent)

                var contentProps = {
                    'aria-labelledby': id,
                    className: classWithModifiers(classNames.content, animatedModifiers, separator),
                    id: 'panel-' + id,
                    ref: 'content',
                    role: 'tabpanel',
                    style: { marginTop: '' }
                }

                var animatorProps = {
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
                    this.props.contentTag,
                    contentProps,
                    (function(props) {
                        return React.Children.map(props.children, function(child) {
                            return React.cloneElement(child, {
                                isPanelChecked: props.checked,
                                isPanelVisible: props.visible,
                                panelIndex: props.index,
                                panelName: props.name,
                                panelSelectedChecked: props.selectedChecked,
                                panelSelectedIndex: props.selectedIndex,
                                setPanelIndex: props.setIndex
                            })
                        })
                    })(this.props)
                )

                if (this.props.animateContent) {
                    children = React.DOM.div(animatorProps, children)
                }

                modifiers.push(classModifiers.content)
            } else {
                modifiers.push(classModifiers.noContent)
            }

            elementProps.className = classWithModifiers(classNames.panel, modifiers, separator) + (
                elementProps.className ? ' ' + elementProps.className : ''
            )

            return React.createElement(
                this.props.tag,
                elementProps,
                React.DOM.input({
                    'aria-controls': children ? 'panel-' + id : null,
                    checked: this.props.checked,
                    className: classWithModifiers(classNames.state, modifiers, separator),
                    'data-state': 'tabbordion',
                    disabled: !this.props.visible || this.props.disabled,
                    id: id,
                    name: this.props.name,
                    onChange: this.handleInputChange,
                    ref: 'input',
                    role: 'tab',
                    type: this.props.type,
                    value: value
                }),
                React.DOM.label(
                    {
                        className: classWithModifiers(classNames.title, modifiers, separator),
                        id: 'label-' + id,
                        htmlFor: id,
                        onClick: this.handleLabelClick
                    },
                    this.props.title
                ),
                children
            )
        }
    })

    var Tabbordion = React.createClass({
        displayName: 'Tabbordion',

        propTypes: {
            animateContent: React.PropTypes.oneOf([false, 'height', 'marginTop']),
            classModifiers: React.PropTypes.shape({
                animated: React.PropTypes.string,
                checked: React.PropTypes.string,
                content: React.PropTypes.string,
                disabled: React.PropTypes.string,
                enabled: React.PropTypes.string,
                noContent: React.PropTypes.string,
                unchecked: React.PropTypes.string,
                visibleBetween: React.PropTypes.string,
                visibleFirst: React.PropTypes.string,
                visibleLast: React.PropTypes.string
            }),
            classNames: React.PropTypes.shape({
                animator: React.PropTypes.string,
                content: React.PropTypes.string,
                panel: React.PropTypes.string,
                state: React.PropTypes.string,
                title: React.PropTypes.string
            }),
            classSeparator: React.PropTypes.string,
            contentTag: React.PropTypes.string,
            initialIndex: React.PropTypes.number,
            mode: React.PropTypes.oneOf(['multiple', 'single', 'toggle']),
            name: React.PropTypes.string,
            onAfterChange: React.PropTypes.func,
            onBeforeChange: React.PropTypes.func,
            onChange: React.PropTypes.func,
            panelTag: React.PropTypes.string,
            tag: React.PropTypes.string
        },

        getDefaultProps: function() {
            return {
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
                contentTag: 'div',
                initialIndex: null,
                mode: 'single',
                name: '',
                panelTag: 'li',
                tag: 'ul'
            }
        },

        getInitialState: function() {
            return {
                checked: [],
                index: this.props.initialIndex || null,
                name: tabbordionUuid()
            }
        },

        componentWillMount: function() {
            var checked = this.state.checked,
                newLength = getCountsOfType(this.props, Panel).count

            checked.length = newLength
            for (var index = 0; index < checked.length; index++) {
                checked[index] = !!checked[index]
            }

            if (this.props.initialIndex >= 0 && this.props.initialIndex < newLength) {
                checked[this.props.initialIndex] = true
            }

            this.setState({ checked: checked })
        },

        componentWillReceiveProps: function(nextProps) {
            var checked = this.state.checked,
                newLength = getCountsOfType(nextProps, Panel).count

            if (checked.length !== newLength) {
                checked.length = newLength
                this.setState({ checked: checked.map(Boolean) })
            }
        },

        setIndex: function(newIndex) {
            var newState = { checked: this.state.checked, index: this.state.index }

            switch (this.props.mode) {
                // any panel can be open or closed (plausible accordion behavior)
                case 'multiple':
                    newState.index = newIndex
                    newState.checked[newIndex] = !newState.checked[newIndex]
                    break;
                // one panel is always open (normal tabs behavior)
                case 'single':
                    newState.index = newIndex
                    newState.checked = newState.checked.map(function(checked, index) {
                        return index === newIndex
                    })
                    break;
                // only one panel may be open at one time (normal accordion behavior)
                case 'toggle':
                    newState.index = newState.index !== newIndex ? newIndex : null
                    newState.checked = newState.checked.map(function(checked, index) {
                        return index === newIndex && newIndex === newState.index
                    })
                    break;
                default:
                    throw new Error('unknown mode: ' + this.props.mode)
            }

            if (isFunction(this.props.onBeforeChange)) {
                var stateOverride = this.props.onBeforeChange(
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
                this.setState(newState, function() {
                    this.props.onAfterChange({ checked: newState.checked.slice(0), index: newState.index })
                }.bind(this))
            } else {
                this.setState(newState)
            }

            if (isFunction(this.props.onChange)) {
                this.props.onChange({ checked: newState.checked.slice(0), index: newState.index })
            }
        },

        render: function() {
            var elementProps = { role: 'tablist' }

            for (var key in this.props) {
                if (this.props.hasOwnProperty(key) && !Tabbordion.propTypes.hasOwnProperty(key)) {
                    elementProps[key] = this.props[key]
                }
            }

            var panelCounts = getCountsOfType(this.props, Panel)

            if (elementProps.className) {
                elementProps.className = classWithModifiers(
                    elementProps.className,
                    [
                        'checked-count-' + this.state.checked.reduce(function(count, checked) {
                            return count + checked
                        }, 0),
                        'count-' + panelCounts.count
                    ],
                    this.props.classSeparator
                )
            }

            return React.createElement(
                this.props.tag,
                elementProps,
                (function(props, state, setIndex, visibleCount) {
                    var panelCounter = 0,
                        visibleCounter = 0

                    return React.Children.map(props.children, function(child, index) {
                        var isBetween = false, isFirst = false, isLast = false, additionalProps

                        if (child.type === Panel) {
                            if ((child.props || child._store.props).visible) {
                                visibleCounter++

                                if (visibleCounter === 1) {
                                    isFirst = true
                                }

                                if (visibleCounter === visibleCount) {
                                    isLast = true
                                }

                                isBetween = !isFirst && !isLast
                            }

                            additionalProps = {
                                animateContent: props.animateContent,
                                checked: state.checked[index],
                                classModifiers: props.classModifiers,
                                classNames: props.classNames,
                                classSeparator: props.classSeparator,
                                contentTag: props.contentTag,
                                index: panelCounter++,
                                isBetween: isBetween,
                                isFirst: isFirst,
                                isLast: isLast,
                                name: props.name.length ? props.name : state.name,
                                selectedChecked: state.checked.slice(0),
                                selectedIndex: state.index,
                                setIndex: setIndex,
                                tag: props.panelTag,
                                type: props.mode === 'multiple' ? 'checkbox' : 'radio'
                            }
                        } else {
                            additionalProps = {
                                panelName: props.name.length ? props.name : state.name,
                                panelSelectedChecked: state.checked.slice(0),
                                panelSelectedIndex: state.index,
                                panelSetIndex: setIndex
                            }
                        }

                        return React.cloneElement(child, additionalProps)
                    })
                })(this.props, this.state, this.setIndex, panelCounts.visibleCount)
            )
        }
    })

    if (isCommonJs) {
        module.exports = {
            Panel: Panel,
            Tabbordion: Tabbordion
        }
    } else {
        window.Panel = Panel
        window.Tabbordion = Tabbordion
    }
})(typeof exports === 'object')
