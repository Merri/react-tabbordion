import equal from 'fast-deep-equal'
import PropTypes from 'prop-types'
import React from 'react'

import { bemClassName } from '../lib/bem'
import { identity } from '../lib/identity'
import { TabContentContext, TabLabelContext, TabPanelContext } from './Tabbordion'

export class TabPanel extends React.PureComponent {
    static contextType = TabPanelContext

    static defaultProps = {
        component: 'li',
    }

    static propTypes = {
        checked: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.string,
        component: PropTypes.elementType,
        disabled: PropTypes.bool,
        forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any.isRequired })]),
        id: PropTypes.string,
        index: PropTypes.number,
        modifiers: PropTypes.array,
        name: PropTypes.string,
        type: PropTypes.oneOf(['checkbox', 'radio']),
        value: PropTypes.string,
        visible: PropTypes.bool,
    }

    static getPanelProps(component) {
        const context = component.context
        const panels = context.panels || []
        const panelIndex = (context.claims || []).indexOf(component)
        return {
            ...component.props,
            id: undefined,
            ...panels[panelIndex],
            name: component.props.name != null ? component.props.name : context.name,
            type: component.props.type != null ? component.props.type : context.type,
            animateContent: context.animateContent,
            bemModifiers: context.bemModifiers,
            bemSeparator: context.bemSeparator,
            blockElements: context.blockElements,
            inputProps: context.inputProps,
        }
    }

    input = React.createRef()

    constructor(props, context) {
        super(props, context)
        if (typeof context.claim === 'function') context.claim(this)
    }

    componentWillUnmount() {
        if (typeof context.unclaim === 'function') context.unclaim(this)
    }

    onChange = (event) => {
        if (event.defaultPrevented) return
        if (typeof this.context.onToggle === 'function') {
            this.context.onToggle(this.panelContext.index)
        }
    }

    onClickLabel = (event) => {
        this.onChange(event)
        event.preventDefault()
        // enforce similar browser behavior by focusing the input element after state change (maintains keyboard access)
        this.setState(null, () => {
            const input = this.input.current
            if (input && (input.checked || input.type === 'checkbox') && document.activeElement !== input) {
                input.focus()
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
            children,
            className,
            component: Component,
            contentId,
            disabled,
            forwardedRef,
            hasContent,
            id,
            index,
            inputId,
            inputProps,
            labelId,
            modifiers,
            name,
            style,
            type,
            value,
            visible,
            ...props
        } = TabPanel.getPanelProps(this)

        const panelBem = bemClassName(blockElements, 'panel', modifiers, bemSeparator)
        const panelClassName = [panelBem, className].filter(identity).join(' ') || undefined
        const hidden = visible != null ? !visible : undefined
        const panelContext = {
            animateContent,
            bemModifiers,
            bemSeparator,
            blockElements,
            checked,
            contentId,
            disabled,
            hasContent,
            id,
            index,
            inputId,
            labelId,
            modifiers,
            onToggle: this.onClickLabel,
            visible,
        }
        // memoize
        if (!equal(this.panelContext, panelContext)) this.panelContext = panelContext

        return (
            <TabLabelContext.Provider value={this.panelContext}>
                <TabContentContext.Provider value={this.panelContext}>
                    <Component
                        ref={forwardedRef}
                        {...props}
                        className={panelClassName}
                        hidden={hidden}
                        style={style}
                    >
                        {name != null && (
                            <input
                                {...inputProps}
                                aria-controls={hasContent ? contentId : undefined}
                                aria-selected={checked}
                                checked={checked}
                                disabled={disabled || hidden}
                                id={inputId}
                                name={name}
                                onChange={this.onChange}
                                ref={this.input}
                                role="tab"
                                type={type}
                                value={value}
                            />
                        )}
                        {children}
                    </Component>
                </TabContentContext.Provider>
            </TabLabelContext.Provider>
        )
    }
}
