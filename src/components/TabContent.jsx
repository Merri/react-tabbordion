import React from 'react'
import PropTypes from 'prop-types'

import { bemClassName } from '../lib/bem'

function TabContent({ className, component: Component, ...props }, { bem, tabbordionPanel }) {
    const { bemSeparator, blockElements } = bem.getState()
    const { contentId, inputId, modifiers } = tabbordionPanel.getState()
    const panelBem = bemClassName(blockElements, 'content', modifiers, bemSeparator)

    // contentId will be overwritten by props.id (intended behavior)
    return (
        <Component
            id={contentId}
            {...props}
            aria-labelledby={inputId}
            className={!panelBem ? className : (className ? `${panelBem} ${className}` : panelBem)}
            role="tabpanel"
        />
    )
}

TabContent.contextTypes = {
    bem: PropTypes.object.isRequired,
    tabbordionPanel: PropTypes.object.isRequired,
}

TabContent.defaultProps = {
    component: 'div',
}

TabContent.propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
}

export default TabContent
