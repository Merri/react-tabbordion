import React, { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { getArray, getChecked, getDisabled, getIndex, isShallowlyDifferentArray } from '../lib/state'

let tabbordionInstances = 0
let tabbordionUniqId = 0

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
    }

    componentWillReceiveProps(nextProps) {
        const nextState = this.getNextState(nextProps, this.state)
        // only update if there were changes to the local component state
        if (nextState !== this.state) {
            this.setState(nextState)
        }
    }

    componentWillUnmount() {
        tabbordionInstances--
        if (tabbordionInstances === 0) tabbordionUniqId = 0
    }

    getChildContext() {
        const panels = getArray(this.state.stateful ? this.state.panels : this.props.panels)

        return {
            bemModifiers: this.props.bemModifiers,
            bemSeparator: this.props.bemSeparator,
            blockElements: this.props.blockElements,
            checkedPanels: panels.filter(getChecked).map(getIndex),
            disabledPanels: panels.filter(getDisabled).map(getIndex),
            firstVisiblePanel: this.firstVisibleIndex,
            lastVisiblePanel: this.lastVisibleIndex,
            onChangePanel: this.onChange,
            panelName: this.props.name || this.uniqId,
            panelType: this.props.mode === 'multiple' ? 'checkbox' : 'radio',
            tabbordionId: this.props.id || this.uniqId,
        }
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

        Children.forEach(props.children, child => {
            if (child && child.type.contextTypes && child.type.contextTypes.tabbordionId) {
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

            const checked = props.checked != null ? props.checked : !!panel.checked
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

        // keep in local state: we can do this in this way because these values are derived from main panels state
        //                      also, this state is updated each time props change, thus we maintain "pureness"
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
            component: Component, // eslint-disable-line
            bemModifiers, // eslint-disable-line
            bemSeparator, // eslint-disable-line
            blockElements, // eslint-disable-line
            component, // eslint-disable-line
            initialPanels, // eslint-disable-line
            mode, // eslint-disable-line
            name, // eslint-disable-line
            onChange, // eslint-disable-line
            onPanels, // eslint-disable-line
            panels: panelsProp, // eslint-disable-line
            ...props
        } = this.props

        let panel = 0

        const panels = this.state.stateful ? this.state.panels : panelsProp

        return (
            <Component {...props} role="tablist">
                {Children.map(children, child => {
                    if (child && child.type.contextTypes && child.type.contextTypes.tabbordionId) {
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

export const tabbordionBlockElementTypes = {
    content: PropTypes.string,
    label: PropTypes.string,
    panel: PropTypes.string,
}

export const tabbordionModifierTypes = {
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
}

Tabbordion.childContextTypes = {
    bemModifiers: PropTypes.shape(tabbordionModifierTypes),
    bemSeparator: PropTypes.string,
    blockElements: PropTypes.shape(tabbordionBlockElementTypes),
    checkedPanels: PropTypes.array,
    disabledPanels: PropTypes.array,
    firstVisiblePanel: PropTypes.number,
    lastVisiblePanel: PropTypes.number,
    onChangePanel: PropTypes.func,
    panelName: PropTypes.string,
    panelType: PropTypes.oneOf(['checkbox', 'radio']),
    tabbordionId: PropTypes.string,
}

Tabbordion.defaultProps = {
    bemModifiers: {
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

export const tabbordionPanelProps = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    visible: PropTypes.bool,
}

Tabbordion.propTypes = {
    bemModifiers: PropTypes.shape(tabbordionModifierTypes),
    bemSeparator: PropTypes.string,
    blockElements: PropTypes.shape(tabbordionBlockElementTypes),
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    id: PropTypes.string,
    initialPanels: PropTypes.arrayOf(PropTypes.shape(tabbordionPanelProps)),
    mode: PropTypes.oneOf(['single', 'toggle', 'multiple']),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onPanels: PropTypes.func,
    panels: PropTypes.arrayOf(PropTypes.shape(tabbordionPanelProps)),
}

export default Tabbordion
