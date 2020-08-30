import equal from 'fast-deep-equal'
import PropTypes from 'prop-types'
import React from 'react'

import { defaultBemModifiers, defaultBemSeparator, defaultBlockElements } from '../lib/bem'
import { UniqueGenerator } from '../class/UniqueGenerator'

const uniq = new UniqueGenerator()

export const TabContentContext = React.createContext('tabbordionContent')
export const TabLabelContext = React.createContext('tabbordionLabel')
export const TabPanelContext = React.createContext('tabbordionPanel')

/**
 * Recursively search for a child elements that uses given context and return the first matches props.
 * @param  {array|object} children  React elements
 * @param  {array} contextTypes     Array of React Context
 * @return {array}                  Array of element props in the same order as array of React Context.
 */
function getPropsByElementContext(children, contextTypes) {
    let missingCount = contextTypes.length
    const props = contextTypes.map(() => null)
    const stack = [children]
    while (missingCount && stack.length) {
        React.Children.forEach(stack.shift(), (child) => {
            if (missingCount === 0 || child == null || !child.type) return
            const index = contextTypes.indexOf(child.type.contextType)
            if (~index) {
                if (!props[index]) {
                    props[index] = child.props || {}
                    missingCount--
                }
            } else if (child.props.children) {
                stack.push(child.props.children)
            }
        })
    }
    return props
}

/**
 * Recursively retrieve all panel element props in order; ensures unique index for each panel.
 * @param  {array|object} children  React elements
 * @return {array}                  Array of panel element props
 */
function getPanelElementProps(children) {
    const consumedIndexes = new Set()
    const panelWithoutIndex = []
    const elementProps = []
    const stack = [children]
    while (stack.length) {
        React.Children.forEach(stack.shift(), (child) => {
            if (child == null || !child.type) {
                return
            }
            if (child.type.contextType === TabPanelContext) {
                const index = ~~child.props.index
                const isValidIndex = !consumedIndexes.has(index)
                if (isValidIndex) {
                    consumedIndexes.add(index)
                } else {
                    panelWithoutIndex.push(elementProps.length)
                }
                const [contentProps, labelProps] = getPropsByElementContext(child.props.children, [
                    TabContentContext,
                    TabLabelContext,
                ])
                elementProps.push({
                    ...child.props,
                    contentId: contentProps && contentProps.id,
                    hasContent: contentProps != null,
                    index: isValidIndex ? index : null,
                    labelId: labelProps && labelProps.id,
                })
            } else if (child.props.children) {
                stack.push(child.props.children)
            }
        })
    }
    // fill in missing indexes now that valid ones have been reserved
    for (let nextIndex = 0; panelWithoutIndex.length > 0; nextIndex++) {
        while (consumedIndexes.has(nextIndex)) {
            nextIndex++
        }
        elementProps[panelWithoutIndex.shift()].index = nextIndex
    }
    return elementProps
}

/**
 * Toggles index of given panels to checked/unchecked. Ensures valid checked state of each panel in given mode.
 * @param  {Object} options
 * @param  {Number} options.index   Index of panel to toggle
 * @param  {String} options.mode    single, toggle, or multiple
 * @param  {Array}  options.panels  Panels
 * @return {Array}                  Updated panels
 */
export function updatePanelsByToggle({ index, mode, panels }) {
    const panelIndex = panels.findIndex((panel) => panel.index === index)
    if (!~panelIndex) return panels
    const checkedPanel = panels[panelIndex]
    switch (mode) {
        case 'multiple': {
            // any panel can be in any checked state
            const nextPanels = panels.slice(0)
            nextPanels[panelIndex] = {
                checked: !checkedPanel.checked,
                disabled: checkedPanel.disabled,
                index,
                visible: checkedPanel.visible,
            }
            return nextPanels
        }
        case 'toggle': {
            // only one can remain checked, however it can also be unchecked
            const nextPanels = panels.map((panel) => {
                const checked = panel === checkedPanel ? !checkedPanel.checked : false
                return checked === panel.checked
                    ? panel
                    : {
                          checked,
                          disabled: panel.disabled,
                          index: panel.index,
                          visible: panel.visible,
                      }
            })
            return nextPanels
        }
        default: {
            // one panel must always be checked
            const stateWillUpdate = panels.some((panel) => panel.checked !== (panel === checkedPanel))
            if (!stateWillUpdate) return panels
            const nextPanels = panels.map((panel) => {
                const checked = panel === checkedPanel
                return checked === panel.checked
                    ? panel
                    : {
                          checked,
                          disabled: panel.disabled,
                          index: panel.index,
                          visible: panel.visible,
                      }
            })
            return nextPanels
        }
    }
}

export class Tabbordion extends React.PureComponent {
    /**
     * Use after rendering static HTML to reset fallback ID used to generate panel ids and name attribute to avoid
     * inconsistencies between renders. Since the unique number generator is minimalistic and simple it is not fit for
     * complex use cases such as code-splitting. You can avoid relying on this code by always giving unique id & name
     * props (can be same). You can use react-uid to get reliable dynamic IDs.
     */
    static resetSSR = uniq.reset

    static defaultProps = {
        animateContent: false,
        bemModifiers: defaultBemModifiers,
        bemSeparator: defaultBemSeparator,
        blockElements: defaultBlockElements,
        component: 'ul',
        inputProps: { 'data-state': 'tabbordion' },
        mode: 'single',
    }

    static propTypes = {
        animateContent: PropTypes.oneOf([false, 'height', 'marginTop']),
        bemModifiers: PropTypes.exact({
            animated: PropTypes.string,
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
        blockElements: PropTypes.exact({
            animator: PropTypes.string,
            content: PropTypes.string,
            label: PropTypes.string,
            panel: PropTypes.string,
        }),
        children: PropTypes.node,
        className: PropTypes.string,
        component: PropTypes.elementType,
        forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any.isRequired })]),
        id: PropTypes.string,
        initialPanels: PropTypes.arrayOf(
            PropTypes.shape({
                checked: PropTypes.bool,
                disabled: PropTypes.bool,
                index: PropTypes.number,
                visible: PropTypes.bool,
            })
        ),
        inputProps: PropTypes.object,
        mode: PropTypes.oneOf(['single', 'toggle', 'multiple']),
        name: PropTypes.string,
        onChange: PropTypes.func,
        onPanels: PropTypes.func,
        panels: PropTypes.arrayOf(
            PropTypes.shape({
                checked: PropTypes.bool,
                disabled: PropTypes.bool,
                index: PropTypes.number,
                visible: PropTypes.bool,
            })
        ),
    }

    static getDerivedStateFromProps(props, state) {
        const allowMultiChecked = props.mode === 'multiple'
        const id = props.id || props.name || state.fallback
        const name = props.name || state.fallback
        const type = allowMultiChecked ? 'checkbox' : 'radio'
        // get panel element props with fixed indexes
        const elementProps = getPanelElementProps(props.children)

        let checkedCount = 0
        let firstVisibleIndex = null
        let lastVisibleIndex = null
        const hasOnPanels = typeof props.onPanels === 'function'
        const isControlled = hasOnPanels && Array.isArray(props.panels)
        const panels =
            (state.panels ? (isControlled ? props.panels : state.panels) : props.initialPanels || props.panels) || []
        // build internal state for panels
        const contextPanels = elementProps.map((panelProps, index) => {
            const panel = panels.find((panel) => panel.index === panelProps.index) || {}

            const checked =
                (panelProps.checked != null ? panelProps.checked : !!panel.checked) &&
                (allowMultiChecked || checkedCount === 0)

            const visible = panelProps.visible != null ? panelProps.visible : panel.visible === false ? false : true

            if (visible) {
                if (checked) checkedCount++
                if (firstVisibleIndex == null) firstVisibleIndex = index
                lastVisibleIndex = index
            }

            const inputId = panelProps.id != null ? panelProps.id : `${id}-${panelProps.index}`

            return {
                checked,
                contentId: panelProps.contentId != null ? panelProps.contentId : `${inputId}-content`,
                disabled: panelProps.disabled != null ? panelProps.disabled : !!panel.disabled,
                hasContent: panelProps.hasContent,
                index: panelProps.index,
                inputId,
                labelId: panelProps.labelId != null ? panelProps.labelId : `${inputId}-label`,
                modifiers: Array.isArray(panelProps.modifiers) ? panelProps.modifiers.slice(0) : [],
                value: panelProps.value != null ? panelProps.value : String(panelProps.index),
                visible,
            }
        })

        if (firstVisibleIndex != null) {
            // one panel must always be checked in single mode
            if (checkedCount === 0 && props.mode !== 'multiple' && props.mode !== 'toggle') {
                contextPanels[firstVisibleIndex].checked = true
            }
        }

        if (props.bemModifiers) {
            contextPanels.forEach((panel, index) => {
                panel.modifiers.push(
                    props.bemModifiers[panel.checked ? 'checked' : 'unchecked'],
                    props.bemModifiers[panel.hasContent ? 'content' : 'noContent'],
                    props.bemModifiers[panel.disabled ? 'disabled' : 'enabled']
                )
                if (index > firstVisibleIndex && index < lastVisibleIndex) {
                    panel.modifiers.push(props.bemModifiers.between)
                } else {
                    if (firstVisibleIndex === index) panel.modifiers.push(props.bemModifiers.first)
                    if (lastVisibleIndex === index) panel.modifiers.push(props.bemModifiers.last)
                }
                if (props.animateContent) {
                    panel.modifiers.push(props.bemModifiers.animated, props.animateContent)
                }
            })
        }

        // public panel state to expose
        const nextPanels = contextPanels.map((panel) => ({
            checked: panel.checked,
            disabled: panel.disabled,
            index: panel.index,
            visible: panel.visible,
        }))

        const nextState = {}

        if (isControlled && !equal(props.panels, nextPanels)) props.onPanels(nextPanels)
        if (!equal(state.panels, contextPanels)) {
            if (!isControlled && hasOnPanels) props.onPanels(nextPanels)
            nextState.panels = contextPanels
        }

        if (state.animateContent !== props.animateContent) nextState.animateContent = props.animateContent
        if (!equal(state.bemModifiers, props.bemModifiers)) nextState.bemModifiers = props.bemModifiers
        if (state.bemSeparator !== props.bemSeparator) nextState.bemSeparator = props.bemSeparator
        if (!equal(state.blockElements, props.blockElements)) nextState.blockElements = props.blockElements
        if (!equal(state.inputProps, props.inputProps)) nextState.inputProps = props.inputProps
        if (state.id !== id) nextState.id = id
        if (state.name !== name) nextState.name = name
        if (state.type !== type) nextState.type = type

        return Object.keys(nextState).length > 0 ? nextState : null
    }

    state = {
        animateContent: false,
        bemModifiers: defaultBemModifiers,
        bemSeparator: defaultBemSeparator,
        blockElements: defaultBlockElements,
        fallback: 'tabbordion',
        id: 'tabbordion',
        name: 'tabbordion',
        onToggle: (index) => {
            const panels = updatePanelsByToggle({ index, mode: this.props.mode, panels: this.state.panels })
            if (typeof this.props.onChange === 'function') {
                this.props.onChange({ index, mode: this.props.mode, panels })
            }
            const isControlled = typeof this.props.onPanels === 'function' && Array.isArray(this.props.panels)
            if (!isControlled && this.state.panels !== panels) {
                this.setState({ panels })
            }
        },
        panels: null,
        type: 'radio',
        claims: [],
        claim: (component) => {
            if (!this.state.claims.includes(component)) this.state.claims.push(component)
        },
        unclaim: (component) => {
            const index = this.state.claims.indexOf(component)
            if (~index) this.state.claims.splice(index, 1)
        },
    }

    constructor() {
        super()
        // the "most tolerable minimalist solution" until there is a native React solution for consistent IDs
        this.state.fallback = `tabbordion-${uniq.get()}`
    }

    componentWillUnmount() {
        // this code will only execute on browser: check Tabbordion.resetSSR() if doing server side render
        uniq.resolve()
    }

    render() {
        const {
            animateContent,
            bemModifiers,
            bemSeparator,
            blockElements,
            component: Component,
            forwardedRef,
            initialPanels,
            inputProps,
            mode,
            name,
            onChange,
            onPanels,
            panels,
            ...props
        } = this.props

        return (
            <TabPanelContext.Provider value={this.state}>
                <Component ref={forwardedRef} {...props} role="tablist" />
            </TabPanelContext.Provider>
        )
    }
}
