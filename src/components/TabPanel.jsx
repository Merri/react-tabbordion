import React, { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { addSubscriber, removeSubscriber } from '../lib/contextSubscribe'
import { bemClassName } from '../lib/bem'
import { getArray, isShallowlyDifferent } from '../lib/state'

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
    { bem, tabbordion },
    uniqId
) {
    const {
        animateContent,
        checkedPanels: checkedPanelsRaw,
        disabledPanels: disabledPanelsRaw,
        firstVisiblePanel,
        lastVisiblePanel,
        panelName,
        panelType,
        tabbordionId,
    } = tabbordion.getState()

    const checkedPanels = getArray(checkedPanelsRaw)
    const disabledPanels = getArray(disabledPanelsRaw)

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
    let hasContent = null

    const childPool = [props.children]

    // sniff the id out or use our own (will be exposed via context)
    while (!contentId && childPool.length) {
        Children.forEach(childPool.shift(), child => {
            if (contentId || !child || !child.type) {
                return
            }

            const props = child.props || (child._store && child._store.props) || {}

            if (child.type === React.Fragment) {
                childPool.push(props.children)
            } else if (child.type.hasContent) {
                hasContent = true
                contentId = props.id || null
            }
        })
    }

    if (!contentId) contentId = `${id}-content`

    const { bemModifiers, bemSeparator, blockElements } = bem.getState()

    return {
        ...props,
        animateContent,
        bemModifiers,
        bemSeparator,
        blockElements,
        checked,
        disabled,
        contentId,
        hasContent,
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
            bemModifiers[hasContent ? 'content' : 'noContent'],
            bemModifiers[disabled ? 'disabled' : 'enabled'],
            bemModifiers[visible],
            ...(firstVisiblePanel === lastVisiblePanel && index === firstVisiblePanel ? [bemModifiers['last']] : [])
        ]).concat(
            animateContent ? [bemModifiers.animated, animateContent] : []
        ) : getArray(modifiers),
        onChangePanel: tabbordion.onChangePanel,
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

        this.subscribers = []

        this.childContext = {
            tabbordionPanel: {
                getState: () => ({
                    animateContent: this.cachedProps.animateContent,
                    checked: this.cachedProps.checked,
                    contentId: this.cachedProps.contentId,
                    disabled: this.cachedProps.disabled,
                    inputId: this.cachedProps.id,
                    index: this.cachedProps.index,
                    modifiers: this.cachedProps.modifiers,
                    visible: this.cachedProps.visible,
                }),
                onClickLabel: this.onClickLabel,
                subscribe: addSubscriber(this.subscribers),
                unsubscribe: removeSubscriber(this.subscribers),
            },
        }

        this.panelState = this.childContext.tabbordionPanel.getState()
    }

    componentDidMount() {
        this.context.bem.subscribe(this)
        this.context.tabbordion.subscribe(this)
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.cachedProps = getTabPanelProps(nextProps, nextContext, this.uniqId)

        const panelState = this.childContext.tabbordionPanel.getState()

        if (isShallowlyDifferent(panelState, this.panelState)) {
            this.subscribers.forEach(component => component.forceUpdate())
            this.panelState = panelState
        }
    }

    componentWillUnmount() {
        this.context.bem.unsubscribe(this)
        this.context.tabbordion.unsubscribe(this)
        delete this.cachedProps
        panelInstances--
        if (panelInstances === 0) panelUniqId = 0
    }

    getChildContext() {
        return this.childContext
    }

    getInputRef(input) {
        this.input = input
    }

    /** Handler for input checkbox or radio */
    onChange(event) {
        if (event.defaultPrevented) {
            return
        }
        const { index, onChangePanel } = this.cachedProps
        if (onChangePanel) onChangePanel(index)
    }

    /** Handler for TabLabel child */
    onClickLabel() {
        const { index, onChangePanel, type } = this.cachedProps
        if (onChangePanel) onChangePanel(index)
        // make sure focus goes to the input element, that is what sane browsers do when a label is clicked
        raf(() => {
            // of course things may go wrong so make sure all expected conditions are met before doing stuff
            if (this.input && (this.input.checked || type === 'checkbox') && document.activeElement !== this.input) {
                this.input.focus()
            }
        })
    }

    render() {
        const {
            animateContent,
            bemModifiers,
            bemSeparator,
            blockElements,
            checked,
            checkedPanels,
            children,
            className,
            component: Component,
            contentId,
            disabled,
            disabledPanels,
            hasContent,
            id,
            index,
            modifiers,
            onChangePanel,
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
                aria-expanded={hasContent && ariaSelected}
                aria-selected={ariaSelected}
                className={!panelBem ? className : (className ? `${panelBem} ${className}` : panelBem)}
                role="tab"
                style={{ ...style, display: visible === 'hidden' ? 'none' : null }}
            >
                <input
                    aria-controls={contentId}
                    checked={checked}
                    data-state="tabbordion"
                    disabled={disabled || visible === 'hidden'}
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
    tabbordionPanel: PropTypes.object,
}

TabPanel.contextTypes = {
    bem: PropTypes.object,
    tabbordion: PropTypes.object,
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
