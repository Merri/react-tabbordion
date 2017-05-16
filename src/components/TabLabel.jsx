import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bemClassName } from '../lib/bem'
import { tabbordionBlockElementTypes } from './Tabbordion'

class TabLabel extends Component {
    constructor(props, context) {
        super(props, context)

        this.onClick = this.onClick.bind(this)
    }

    onClick(event) {
        if (event.defaultPrevented) {
            return
        }

        const { onClickPanelLabel } = this.context
        if (onClickPanelLabel) onClickPanelLabel()
    }

    render() {
        const { bemSeparator, blockElements, panelInputId, panelModifiers } = this.context
        const { className, component: Component, ...props } = this.props

        const panelBem = bemClassName(blockElements, 'label', panelModifiers, bemSeparator)

        return (
            <Component
                className={!panelBem ? className : (className ? `${panelBem} ${className}` : panelBem)}
                htmlFor={panelInputId}
                onClick={this.onClick}
                {...props}
            />
        )
    }
}

TabLabel.contextTypes = {
    bemSeparator: PropTypes.string,
    blockElements: PropTypes.shape(tabbordionBlockElementTypes),
    onClickPanelLabel: PropTypes.func,
    panelInputId: PropTypes.string,
    panelModifiers: PropTypes.array,
}

TabLabel.defaultProps = {
    component: 'label',
}

TabLabel.propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
}

export default TabLabel
