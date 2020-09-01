import PropTypes from 'prop-types'
import React from 'react'

import { bemClassName } from '../lib/bem'
import { identity } from '../lib/identity'
import { TabLabelContext } from './Tabbordion'

export class TabLabel extends React.PureComponent {
    static contextType = TabLabelContext

    static defaultProps = {
        component: 'label',
    }

    static propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        component: PropTypes.elementType,
        forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any.isRequired })]),
        htmlFor: PropTypes.string,
        onClick: PropTypes.func,
    }

    onClick = (event) => {
        if (this.props.onClick) this.props.onClick(event)
        if (event.defaultPrevented || typeof this.context.onToggle !== 'function') return
        this.context.onToggle(event)
    }

    render() {
        const { bemSeparator, blockElements, inputId, labelId, modifiers } = this.context
        const { className, component: Component, id, forwardedRef, htmlFor, ...props } = this.props
        const labelBem = bemClassName(blockElements, 'label', modifiers, bemSeparator)
        const labelClassName = [labelBem, className].filter(identity).join(' ') || undefined
        return (
            <Component
                {...props}
                ref={forwardedRef}
                className={labelClassName}
                id={labelId || id}
                onClick={this.onClick}
                htmlFor={inputId || htmlFor}
            />
        )
    }
}
