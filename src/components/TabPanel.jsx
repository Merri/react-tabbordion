import React, { Children, PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import { bemClassName } from '../lib/bem'
import { getArray } from '../lib/state'
import { tabbordionBlockElementTypes, tabbordionModifierTypes } from './Tabbordion'

// we only use raf for a minor accessibility feature so it is possible to get away with this little "polyfilling"
const raf = (
    typeof window !== 'undefined' && 'requestAnimationFrame' in window
    ? window.requestAnimationFrame
    : setTimeout
)

let panelInstances = 0
let panelUniqId = 0

/*
 * Handles prop integrity and manages the complexity of props vs. context vs. nothing at all
 * @param {object} props
 * @param {object} context
 * @param {string} uniqId
 */
function getTabPanelProps(
    {
        checked: checkedProp,
        disabled: disabledProp,
        id: idProp,
        index,
        modifiers,
        name: nameProp,
        type,
        value,
        visible: visibleProp,
        ...props
    },
    {
        bemModifiers,
        bemSeparator,
        blockElements,
        checkedPanels,
        disabledPanels,
        firstVisiblePanel,
        lastVisiblePanel,
        onChangePanel,
        panelName,
        panelType,
        tabbordionId,
    },
    uniqId
) {
    checkedPanels = getArray(checkedPanels)
    disabledPanels = getArray(disabledPanels)

    // props have preference over what comes from context
    const name = (nameProp != null ? nameProp : panelName) || tabbordionId || `tabbordion-panel-${uniqId}`
    const id = idProp || `${tabbordionId || name}-${index}`

    const checked = checkedProp != null ? checkedProp : checkedPanels.includes(index)
    const disabled = disabledProp != null ? disabledProp : disabledPanels.includes(index)

    const visible = visibleProp === false ? 'hidden' : (
        firstVisiblePanel === index && 'first'
        || lastVisiblePanel === index && 'last'
        || 'between'
    )

    let contentId = null

    // sniff the id out or use our own (will be exposed via context)
    Children.forEach(props.children, child => {
        if (child && child.type.contextTypes && child.type.contextTypes.panelContentId) {
            contentId = (child.props || (child._store && child._store.props) || {}).id || `${id}-content`
        }
    })

    return {
        ...props,
        bemModifiers,
        bemSeparator,
        blockElements,
        checked,
        disabled,
        contentId,
        id,
        index,
        name,
        type: type != null ? type : panelType,
        value: value != null ? value : String(index),
        visible,
        checkedPanels,
        disabledPanels,
        modifiers: bemModifiers ? getArray(modifiers).concat([
            bemModifiers[checked ? 'checked' : 'unchecked'],
            bemModifiers[contentId ? 'content' : 'noContent'],
            bemModifiers[disabled ? 'disabled' : 'enabled'],
            bemModifiers[visible],
        ]) : getArray(modifiers),
        onChangePanel,
    }
}

class TabPanel extends PureComponent {
    constructor(props, context) {
        super(props, context)
        // essentially an attempt for keeping id and name consistent from page to page even when that data is missing
        panelInstances++
        // fallback to generate name and id
        this.uniqId = `${panelUniqId}`
        panelUniqId++
        // use caching to minimize the need of recalculating stuff all the time
        this.cachedProps = getTabPanelProps(props, context, this.uniqId)

        this.getInputRef = this.getInputRef.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onClickLabel = this.onClickLabel.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.cachedProps = getTabPanelProps(nextProps, nextContext, this.uniqId)
    }

    componentWillUnmount() {
        delete this.cachedProps
        panelInstances--
        if (panelInstances === 0) panelUniqId = 0
    }

    getChildContext() {
        return {
            onClickPanelLabel: this.onClickLabel,
            panelChecked: this.cachedProps.checked,
            panelContentId: this.cachedProps.contentId,
            panelDisabled: this.cachedProps.disabled,
            panelInputId: this.cachedProps.id,
            panelIndex: this.cachedProps.index,
            panelModifiers: this.cachedProps.modifiers,
            panelVisible: this.cachedProps.visible,
        }
    }

    getInputRef(input) {
        this.input = input
    }

    /** Handler for input checkbox or radio */
    onChange(event) {
        if (event.defaultPrevented) {
            return
        }
        const { index, onChange } = this.cachedProps
        if (onChange) onChange(index)
    }

    /** Handler for TabLabel child */
    onClickLabel() {
        const { index, onChangePanel } = this.cachedProps
        if (onChangePanel) onChangePanel(index)
        // make sure focus goes to the input element, that is what sane browsers do when a label is clicked
        raf(() => {
            const input = findDOMNode(this.input)
            // of course things may go wrong so make sure all expected conditions are met before doing stuff
            if (input && input.checked && document.activeElement !== input) input.focus()
        })
    }

    render() {
        const {
            bemModifiers, // eslint-disable-line
            bemSeparator,
            blockElements,
            checked,
            checkedPanels, // eslint-disable-line
            children,
            className,
            component: Component, // eslint-disable-line
            contentId,
            disabled,
            disabledPanels, // eslint-disable-line
            id,
            index, // eslint-disable-line
            modifiers,
            onChangePanel, // eslint-disable-line
            name,
            style,
            type,
            value,
            visible,
            ...props
        } = this.cachedProps

        const panelBem = bemClassName(blockElements, 'panel', modifiers, bemSeparator)
        const ariaSelected = checked ? 'true' : 'false'

        return (
            <Component
                {...props}
                aria-expanded={contentId && ariaSelected}
                aria-selected={ariaSelected}
                className={!panelBem ? className : (className ? `${panelBem} ${className}` : panelBem)}
                role="tab"
                style={{ ...style, display: visible === 'hidden' ? 'none' : null }}
            >
                <input
                    aria-controls={contentId}
                    checked={checked}
                    data-state="tabbordion"
                    disabled={disabled}
                    id={id}
                    name={name}
                    onChange={this.onChange}
                    ref={this.getInputRef}
                    type={type}
                    value={value}
                />
                {children}
            </Component>
        )
    }
}

TabPanel.childContextTypes = {
    onClickPanelLabel: PropTypes.func,
    panelChecked: PropTypes.bool,
    panelContentId: PropTypes.string,
    panelDisabled: PropTypes.bool,
    panelInputId: PropTypes.string,
    panelIndex: PropTypes.number,
    panelModifiers: PropTypes.array,
    panelVisible: PropTypes.oneOf(['between', 'first', 'hidden', 'last']),
}

TabPanel.contextTypes = {
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

TabPanel.defaultProps = {
    component: 'li',
}

TabPanel.propTypes = {
    // state (these will override contextTypes if set)
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    index: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.oneOf(['checkbox', 'radio']),
    value: PropTypes.string,
    visible: PropTypes.bool,
    // contents
    children: PropTypes.node,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    // BEM convention props
    modifiers: PropTypes.array,
}

export default TabPanel
