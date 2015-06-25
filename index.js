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
    if (typeof typeOfFn === 'function' && typeof /./ !== 'function')
        return typeOfFn
    else
        return objectFn
})()

function classWithModifiers(className, modifiers, separator) {
    var BEM, classNames = '', i

    if (className == null) return null
    if (typeof className !== 'string') className = String(className)
    if (!Array.isArray(modifiers) || modifiers.length === 0) return className
    if (typeof separator !== 'string') separator = '--'

    i = className.indexOf(' ')

    if (i >= 0) {
        classNames = className.slice(i)
        className = className.slice(0, i)
    }

    BEM = className

    for (i = 0; i < modifiers.length; i++) {
        if ((typeof modifiers[i] === 'string') && (modifiers[i].length > 0))
            BEM += ' ' + className + separator + modifiers[i]
    }

    return BEM + classNames
}

(function(global) {'use strict'

    var Panel = React.createClass({
        displayName: 'Panel',

        propTypes: {
            checked: React.PropTypes.bool,
            classModifiers: React.PropTypes.shape({
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
                classModifiers: {
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

        handleInputChange: function(event) {
            this.props.setIndex(this.props.index)
        },

        handleLabelClick: function(event) {
            event.preventDefault()
            var input = React.findDOMNode(this.refs.input)
            input.click()
            input.focus()
        },

        renderChild: function(child) {
            return React.cloneElement(child, {
                isPanelChecked: this.props.checked,
                isPanelVisible: this.props.visible,
                panelIndex: this.props.index,
                panelName: this.props.name,
                panelSelectedChecked: this.props.selectedChecked,
                panelSelectedIndex: this.props.selectedIndex,
                setPanelIndex: this.props.setIndex
            })
        },

        render: function() {
            var elementProps = {
                'aria-expanded': this.props.children ? (this.props.checked ? 'true' : 'false') : null,
                'aria-selected': this.props.checked ? 'true' : 'false'
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

            modifiers.push(this.props.checked ? classModifiers.checked : classModifiers.unchecked)
            modifiers.push(this.props.disabled ? classModifiers.disabled : classModifiers.enabled)

            if (this.props.isBetween) {
                modifiers.push(classModifiers.visibleBetween)
            } else {
                if (this.props.isFirst)
                    modifiers.push(classModifiers.visibleFirst)

                if (this.props.isLast)
                    modifiers.push(classModifiers.visibleLast)
            }

            if (this.props.children) {
                var children = React.createElement(
                    this.props.contentTag,
                    {
                        'aria-labelledby': id,
                        className: classWithModifiers(classNames.content, modifiers, separator),
                        id: 'panel-' + id,
                        role: 'tabpanel'
                    },
                    React.Children.map(this.props.children, this.renderChild)
                )
                modifiers.push(classModifiers.content)
            } else {
                modifiers.push(classModifiers.noContent)
            }

            if (elementProps.className)
                elementProps.className += ' ' + classWithModifiers(classNames.panel, modifiers, separator)
            else
                elementProps.className = classWithModifiers(classNames.panel, modifiers, separator)

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
            classModifiers: React.PropTypes.shape({
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
                content: React.PropTypes.string,
                panel: React.PropTypes.string,
                state: React.PropTypes.string,
                title: React.PropTypes.string
            }),
            classSeparator: React.PropTypes.string,
            contentTag: React.PropTypes.string,
            initialIndex: React.PropTypes.number,
            mode: React.PropTypes.oneOf([
                'multiple',     // any panel can be open or closed (plausible accordion behavior)
                'single',       // one panel is always open (normal tabs behavior)
                'toggle'        // only one panel may be open at one time (normal accordion behavior)
            ]),
            name: React.PropTypes.string,
            onAfterChange: React.PropTypes.func,
            onBeforeChange: React.PropTypes.func,
            onChange: React.PropTypes.func,
            panelTag: React.PropTypes.string,
            tag: React.PropTypes.string
        },

        getDefaultProps: function() {
            return {
                classModifiers: {
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
                newLength = this.getCountsOfPanels(this.props).count

            checked.length = newLength
            for (var index = 0; index < checked.length; index++)
                checked[index] = !!checked[index]

            if (this.props.initialIndex >= 0 && this.props.initialIndex < newLength) {
                checked[this.props.initialIndex] = true
            }

            this.setState({ checked: checked })
        },

        componentWillReceiveProps: function(nextProps) {
            var checked = this.state.checked,
                newLength = this.getCountsOfPanels(nextProps).count
            
            if (checked.length !== newLength) {
                checked.length = newLength
                this.setState({ checked: checked.map(Boolean) })
            }
        },

        getCountsOfPanels: function(props) {
            var count = 0,
                visibleCount = 0

            React.Children.map(props.children, function(child) {
                if (child.type === Panel) {
                    count ++

                    if (child._store.props.visible)
                        visibleCount++
                }
            })

            return {
                count: count,
                visibleCount: visibleCount
            }
        },

        setIndex: function(newIndex) {
            var newState = { checked: this.state.checked, index: this.state.index }

            switch (this.props.mode) {
                case 'multiple':
                    newState.index = newIndex
                    newState.checked[newIndex] = !newState.checked[newIndex]
                    break;
                case 'single':
                    newState.index = newIndex
                    newState.checked = newState.checked.map(function(checked, index) {
                        return index === newIndex
                    })
                    break;
                case 'toggle':
                    newState.index = newState.index !== newIndex ? newIndex : null
                    newState.checked = newState.checked.map(function(checked, index) {
                        return index === newIndex && newIndex === newState.index
                    })
                    break;
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

            var panelCounts = this.getCountsOfPanels(this.props)

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
                        var isBetween = false, isFirst = false, isLast = false

                        if (child.type === Panel) {
                            index = panelCounter++

                            if (child._store.props.visible) {
                                visibleCounter++

                                if (visibleCounter === 1)
                                    isFirst = true

                                if (visibleCounter === visibleCount)
                                    isLast = true

                                isBetween = !(isFirst || isLast)
                            }
                        } else {
                            index = null
                        }

                        return React.cloneElement(child, {
                            checked: state.checked[index],
                            classModifiers: props.classModifiers,
                            classNames: props.classNames,
                            classSeparator: props.classSeparator,
                            contentTag: props.contentTag,
                            index: index,
                            isBetween: isBetween,
                            isFirst: isFirst,
                            isLast: isLast,
                            name: props.name.length ? props.name : state.name,
                            selectedChecked: state.checked.slice(0),
                            selectedIndex: state.index,
                            setIndex: setIndex,
                            tag: props.panelTag,
                            type: props.mode === 'multiple' ? 'checkbox' : 'radio'
                        })
                    })
                })(this.props, this.state, this.setIndex, panelCounts.visibleCount)
            )
        }
    })

    // support CommonJS
    if (typeof exports === 'object')
        module.exports = {
            Panel: Panel,
            Tabbordion: Tabbordion
        }
    // support AMD
    else if (typeof define === 'function' && define.amd)
        define(function() {
            return {
                Panel: Panel,
                Tabbordion: Tabbordion
            }
        })
    // support browser
    else {
        global.Panel = Panel
        global.Tabbordion = Tabbordion
    }
})(this)
