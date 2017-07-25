import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { bemClassName } from '../lib/bem'

class TabLabel extends PureComponent {
    constructor(props, context) {
        super(props, context)

        this.onClick = this.onClick.bind(this)
    }

    componentDidMount() {
        this.context.bem.subscribe(this)
        this.context.tabbordionPanel.subscribe(this)
    }

    componentWillUnmount() {
        this.context.bem.unsubscribe(this)
        this.context.tabbordionPanel.unsubscribe(this)
    }

    onClick(event) {
        if (event.defaultPrevented) {
            return
        }

        const { onClickLabel } = this.context.tabbordionPanel
        if (onClickLabel) onClickLabel()
    }

    render() {
        const { bemSeparator, blockElements } = this.context.bem.getState()
        const { inputId, modifiers } = this.context.tabbordionPanel.getState()
        const { className, component: Component, ...props } = this.props

        const panelBem = bemClassName(blockElements, 'label', modifiers, bemSeparator)

        return (
            <Component
                className={!panelBem ? className : (className ? `${panelBem} ${className}` : panelBem)}
                htmlFor={inputId}
                onClick={this.onClick}
                {...props}
            />
        )
    }
}

TabLabel.contextTypes = {
    bem: PropTypes.object,
    tabbordionPanel: PropTypes.object,
}

TabLabel.defaultProps = {
    component: 'label',
}

TabLabel.propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
}

export default TabLabel
