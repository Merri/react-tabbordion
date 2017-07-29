import React, { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { addSubscriber, removeSubscriber } from '../lib/contextSubscribe'

import {
    getArray,
    getChecked,
    getDisabled,
    getIndex,
    isShallowlyDifferent,
    isShallowlyDifferentArray,
} from '../lib/state'

let tabbordionInstances = 0
let tabbordionUniqId = 0

function getStateBem(props) {
    return {
        bemModifiers: props.bemModifiers,
        bemSeparator: props.bemSeparator,
        blockElements: props.blockElements,
    }
}

function getStateTabbordion(context, props, state) {
    const panels = getArray(state.stateful ? state.panels : props.panels)

    return {
        animateContent: props.animateContent,
        checkedPanels: panels.filter(getChecked).map(getIndex),
        disabledPanels: panels.filter(getDisabled).map(getIndex),
        firstVisiblePanel: context.firstVisibleIndex,
        lastVisiblePanel: context.lastVisibleIndex,
        panelName: props.name || context.uniqId,
        panelType: props.mode === 'multiple' ? 'checkbox' : 'radio',
        tabbordionId: props.id || context.uniqId,
    }
}

class Tabbordion extends PureComponent {
    constructor(props) {
        super(props)

        tabbordionInstances++
        this.uniqId = `tabbordion-${tabbordionUniqId}`
        tabbordionUniqId++

        this.getNextState = this.getNextState.bind(this)
        this.onChange = this.onChange.bind(this)

        this.firstVisibleIndex = null
        this.lastVisibleIndex = null

        // panels always overrides initialPanels
        this.state = this.getNextState(
            props,
            { stateful: false },
            Array.isArray(props.panels) ? props.panels : props.initialPanels
        )

        // context subscribers
        this.subscribers = {
            bem: [],
            tabbordion: [],
        }

        this.childContext = {
            bem: {
                getState: () => this.bemState,
                subscribe: addSubscriber(this.subscribers.bem),
                unsubscribe: removeSubscriber(this.subscribers.bem),
            },
            tabbordion: {
                getState: () => this.tabbordionState,
                onChangePanel: this.onChange,
                subscribe: addSubscriber(this.subscribers.tabbordion),
                unsubscribe: removeSubscriber(this.subscribers.tabbordion),
            },
        }

        this.bemState = getStateBem(props)
        this.tabbordionState = getStateTabbordion(this, props, this.state)
    }

    componentWillReceiveProps(nextProps) {
        const nextState = this.getNextState(nextProps, this.state)
        // only update if there were changes to the local component state
        if (nextState !== this.state) {
            this.setState(nextState)
        }

        const bemState = getStateBem(nextProps)

        if (isShallowlyDifferent(bemState, this.bemState)) {
            this.subscribers.bem.forEach(component => component.forceUpdate())
            this.bemState = bemState
        }

        const tabbordionState = getStateTabbordion(this, nextProps, nextState)

        if (isShallowlyDifferent(tabbordionState, this.tabbordionState)) {
            this.subscribers.tabbordion.forEach(component => component.forceUpdate())
            this.tabbordionState = tabbordionState
        }
    }

    componentWillUnmount() {
        tabbordionInstances--
        if (tabbordionInstances === 0) tabbordionUniqId = 0
    }

    getChildContext() {
        return this.childContext
    }

    /*
     * Controls props and does those nasty little staties we kills them My Precious, *gollum* *gollum*
     * @param {object} props Props received by the component
     * @param {object} prevState State contained in the component
     * @param {array} initialPanels Initial panels state when component is mounted as a stateful component
     * @return {object} State to be used by the component
     */
    getNextState(props, prevState, initialPanels) {
        const panels = getArray(prevState.stateful ? prevState.panels : initialPanels || props.panels)
        const panelProps = []
        const usedIndexes = []
        const invalidIndexes = []

        const allowMultiChecked = props.mode === 'multiple'

        Children.forEach(props.children, child => {
            if (child && child.type.contextTypes && child.type.contextTypes.tabbordion) {
                const props = child.props || (child._store && child._store.props) || {}
                // use false to mark panels with invalid index
                const index = props.index != null ? props.index : false
                // missing index and duplicates are invalid
                const isInvalidIndex = index === false || usedIndexes.includes(index)

                if (isInvalidIndex) {
                    invalidIndexes.push(panelProps.length)
                } else {
                    usedIndexes.push(index)
                }

                panelProps.push({
                    checked: props.checked,
                    disabled: props.disabled,
                    index: isInvalidIndex ? false : index,
                    visible: props.visible,
                })
            }
        })

        // time to fix invalid index values
        let unusedIndex = 0

        while (invalidIndexes.length > 0) {
            // find the next usable index value
            while (usedIndexes.includes(unusedIndex)) {
                unusedIndex++
            }
            // use the index value
            panelProps[invalidIndexes.shift()].index = unusedIndex
            // try another index on the next round
            unusedIndex++
        }

        // now that we know the indexes we can link to existing data; if it happens to exist, of course
        let checkedCount = 0
        let firstVisibleIndex = null
        let lastVisibleIndex = null

        const nextPanels = panelProps.map((props, index) => {
            const panel = panels.find(panel => panel.index === props.index) || { checked, disabled, visible }

            const checked = (
                props.checked != null ? props.checked : !!panel.checked
            ) && (allowMultiChecked || checkedCount === 0)

            const disabled = props.disabled != null ? props.disabled : !!panel.disabled
            const visible = props.visible != null ? props.visible : (panel.visible === false ? false : true)

            if (visible) {
                lastVisibleIndex = index
                if (firstVisibleIndex == null) firstVisibleIndex = lastVisibleIndex
            }

            if (checked && visible) checkedCount++

            return {
                checked,
                disabled,
                index: props.index,
                visible,
            }
        })

        if (firstVisibleIndex != null) {
            // one panel must always be checked in single mode
            if (checkedCount === 0 && props.mode !== 'multiple' && props.mode !== 'toggle') {
                nextPanels[firstVisibleIndex].checked = true
            }
            // it is now safe to use the actual indexes instead of references
            firstVisibleIndex = nextPanels[firstVisibleIndex].index
            lastVisibleIndex = nextPanels[lastVisibleIndex].index
        }

        // keep in local state: We can do this in this way because these values are derived from main panels state.
        //                      Also, this state is updated each time props change, thus we maintain "pureness".
        this.firstVisibleIndex = firstVisibleIndex
        this.lastVisibleIndex = lastVisibleIndex

        // determine who will own the state
        const stateful = !props.onChange || !props.onPanels || !Array.isArray(props.panels)

        if (stateful) {
            // it is mine, my own, My Preciouss...
            if (!prevState.stateful || isShallowlyDifferentArray(prevState.panels, nextPanels)) {
                return {
                    panels: nextPanels,
                    stateful,
                }
            }
        } else {
            // provide updated state to whomever will own it
            if (isShallowlyDifferentArray(panels, nextPanels)) {
                props.onPanels(nextPanels)
            }
            // clear local state
            if (prevState.stateful) {
                return { panels: null, stateful }
            }
        }

        return prevState
    }

    onChange(index) {
        const { mode } = this.props

        if (!this.state.stateful) {
            this.props.onChange({
                index,
                mode,
            })
            return
        }

        // we can mutate this state as we please because we own this state
        const panel = this.state.panels.find(panel => panel.index === index)

        if (panel == null) {
            throw new Error('Unexpected invalid panel index: ' + index)
        }

        let didMutate = false

        switch (mode) {
            case 'toggle':
                // only one can be active, but also none can be active (radio, but allow unselect)
                this.state.panels.forEach(togglePanel => {
                    if (togglePanel !== panel && togglePanel.checked) {
                        togglePanel.checked = false
                    }
                })
                panel.checked = !panel.checked
                didMutate = true
                break
            case 'multiple':
                // no state restrictions/relations (checkbox)
                panel.checked = !panel.checked
                didMutate = true
                break
            default:
                // only one panel must stay active (radio)
                this.state.panels.forEach(togglePanel => {
                    if (togglePanel !== panel && togglePanel.checked) {
                        togglePanel.checked = false
                        didMutate = true
                    }
                })
                if (!panel.checked) {
                    panel.checked = true
                    didMutate = true
                }
        }

        if (didMutate) {
            this.setState({ panels: this.state.panels.slice(0) })
        }
    }

    render() {
        // use destructuring to pick out props we don't need to pass to the rendered component
        const {
            children,
            component: Component,
            bemModifiers,
            bemSeparator,
            blockElements,
            component,
            initialPanels,
            mode,
            name,
            onChange,
            onPanels,
            panels: panelsProp,
            ...props
        } = this.props

        let panel = 0

        const panels = this.state.stateful ? this.state.panels : panelsProp

        return (
            <Component {...props} role="tablist">
                {Children.map(children, child => {
                    if (child && child.type.contextTypes && child.type.contextTypes.tabbordion) {
                        const output = React.cloneElement(child, panels[panel])
                        panel++
                        return output
                    } else {
                        return child
                    }
                })}
            </Component>
        )
    }
}

Tabbordion.childContextTypes = {
    bem: PropTypes.object,
    tabbordion: PropTypes.object,
}

Tabbordion.defaultProps = {
    animateContent: false,
    bemModifiers: {
        animated: 'animated',
        between: 'between',
        checked: 'checked',
        content: 'content',
        disabled: 'disabled',
        enabled: 'enabled',
        first: 'first',
        last: 'last',
        noContent: 'no-content',
        unchecked: 'unchecked',
    },
    bemSeparator: '--',
    blockElements: {
        content: 'panel__content',
        label: 'panel__label',
        panel: 'panel',
    },
    component: 'ul',
    mode: 'single',
}

const tabbordionPanelProps = PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    visible: PropTypes.bool,
}))

Tabbordion.propTypes = {
    animateContent: PropTypes.oneOf([false, 'height', 'marginTop']),
    bemModifiers: PropTypes.shape({
        between: PropTypes.string,
        checked: PropTypes.string,
        content: PropTypes.string,
        disabled: PropTypes.string,
        enabled: PropTypes.string,
        first: PropTypes.string,
        hidden: PropTypes.string,
        last: PropTypes.string,
        noContent: PropTypes.string,
        unchecked: PropTypes.string,
    }),
    bemSeparator: PropTypes.string,
    blockElements: PropTypes.shape({
        content: PropTypes.string,
        label: PropTypes.string,
        panel: PropTypes.string,
    }),
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    id: PropTypes.string,
    initialPanels: tabbordionPanelProps,
    mode: PropTypes.oneOf(['single', 'toggle', 'multiple']),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onPanels: PropTypes.func,
    panels: tabbordionPanelProps,
}

export default Tabbordion
