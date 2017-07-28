import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { bemClassName } from '../lib/bem'

class TabContent extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        this.context.bem.subscribe(this)
        this.context.tabbordionPanel.subscribe(this)
    }

    componentWillUnmount() {
        this.context.bem.unsubscribe(this)
        this.context.tabbordionPanel.unsubscribe(this)
    }

    render() {
        const { className, component: Component, ...props } = this.props
        const { bemSeparator, blockElements } = this.context.bem.getState()
        const { contentId, inputId, modifiers } = this.context.tabbordionPanel.getState()
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
}

TabContent.contextTypes = {
    bem: PropTypes.object,
    tabbordionPanel: PropTypes.object,
}

TabContent.defaultProps = {
    component: 'div',
}

TabContent.propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    style: PropTypes.object,
}

export default TabContent
