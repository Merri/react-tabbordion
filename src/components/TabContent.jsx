import React from 'react'
import PropTypes from 'prop-types'

import { bemClassName } from '../lib/bem'
import { tabbordionBlockElementTypes } from './Tabbordion'

function TabContent(
    { className, component: Component, ...props },
    { bemSeparator, blockElements, panelContentId, panelInputId, panelModifiers }
) {
    const panelBem = bemClassName(blockElements, 'content', panelModifiers, bemSeparator)

    // panelContentId will be overwritten by props.id (intended behavior)
    return (
        <Component
            id={panelContentId}
            {...props}
            aria-labelledby={panelInputId}
            className={!panelBem ? className : (className ? `${panelBem} ${className}` : panelBem)}
            role="tabpanel"
        />
    )
}

TabContent.contextTypes = {
    bemSeparator: PropTypes.string,
    blockElements: PropTypes.shape(tabbordionBlockElementTypes),
    panelContentId: PropTypes.string,
    panelInputId: PropTypes.string,
    panelModifiers: PropTypes.array,
}

TabContent.defaultProps = {
    component: 'div',
}

TabContent.propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
}

export default TabContent
