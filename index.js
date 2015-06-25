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

    var PANEL_PROPTYPES

    var Panel = React.createClass({
        displayName: 'Panel',

        propTypes: PANEL_PROPTYPES = {
            checked: React.PropTypes.bool,
            classModifiers: React.PropTypes.shape({
                checked: React.PropTypes.string,
                content: React.PropTypes.string,
                disabled: React.PropTypes.string
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
            name: React.PropTypes.string,
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
                    disabled: 'disabled'
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
                if (this.props.hasOwnProperty(key) && !PANEL_PROPTYPES.hasOwnProperty(key)) {
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

            var modifiers = []

            if (this.props.checked) modifiers.push(this.props.classModifiers.checked)
            if (this.props.disabled) modifiers.push(this.props.classModifiers.disabled)

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
                modifiers.push(this.props.classModifiers.content)
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

    var TABBORDION_PROPTYPES

    var Tabbordion = React.createClass({
        displayName: 'Tabbordion',

        propTypes: TABBORDION_PROPTYPES = {
            classModifiers: React.PropTypes.shape({
                checked: React.PropTypes.string,
                content: React.PropTypes.string,
                disabled: React.PropTypes.string
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
                    disabled: 'disabled'
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
                newLength = this.getCountOfPanels(this.props)

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
                newLength = this.getCountOfPanels(nextProps)
            
            if (checked.length !== newLength) {
                checked.length = newLength
                this.setState({ checked: checked.map(Boolean) })
            }
        },

        getCountOfPanels: function(props) {
            var panelCount = 0

            React.Children.map(props.children, function(child) {
                panelCount += child.type === Panel
            })

            return panelCount
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

        renderedPanelCount: 0,
        renderChild: function(child, index) {
            // renderedPanelCount must be 0 before renderChild is called
            if (child.type === Panel)
                index = this.renderedPanelCount++
            else
                index = null

            return React.cloneElement(child, {
                checked: this.state.checked[index],
                classModifiers: this.props.classModifiers,
                classNames: this.props.classNames,
                classSeparator: this.props.classSeparator,
                contentTag: this.props.contentTag,
                index: index,
                name: this.props.name.length ? this.props.name : this.state.name,
                selectedIndex: this.state.index,
                setIndex: this.setIndex,
                tag: this.props.panelTag,
                type: this.props.mode === 'multiple' ? 'checkbox' : 'radio'
            })
        },

        render: function() {
            var elementProps = { role: 'tablist' }

            for (var key in this.props) {
                if (this.props.hasOwnProperty(key) && !TABBORDION_PROPTYPES.hasOwnProperty(key)) {
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
                        'count-' + this.getCountOfPanels(this.props)
                    ],
                    this.props.classSeparator
                )
            }

            this.renderedPanelCount = 0

            return React.createElement(
                this.props.tag,
                elementProps,
                React.Children.map(this.props.children, this.renderChild)
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
