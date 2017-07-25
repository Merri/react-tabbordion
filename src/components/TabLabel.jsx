import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bemClassName } from '../lib/bem'

class TabLabel extends Component {
    constructor(props, context) {
        super(props, context)

        this.onClick = this.onClick.bind(this)
    }

    onClick(event) {
        if (event.defaultPrevented) {
            return
        }

        const { onClickLabel } = this.context.tabbordionPanel.getState()
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
    bem: PropTypes.object.isRequired,
    tabbordionPanel: PropTypes.object.isRequired,
}

TabLabel.defaultProps = {
    component: 'label',
}

TabLabel.propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
}

export default TabLabel
