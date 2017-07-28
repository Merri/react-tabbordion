import React from 'react'
import PropTypes from 'prop-types'

import { bemClassName } from '../lib/bem'

import TabContent from './TabContent'

class HeightTransition extends TabContent {
    constructor(props, context) {
        super(props, context)

        this.state = { height: null }

        this.getRef = this.getRef.bind(this)
    }

    componentDidUpdate() {
        if (!this.child) {
            return
        }

        const { bottom, top } = this.child.getBoundingClientRect()
        const height = Math.ceil(bottom - top)

        if (this.state.height !== height) {
            this.setState({ height })
        }
    }

    getRef(child) {
        this.child = child
    }

    render() {
        const { children, className, component: Component, style, ...props } = this.props
        const { bemSeparator, blockElements } = this.context.bem.getState()
        const { animated, checked, contentId, inputId, modifiers } = this.context.tabbordionPanel.getState()
        const panelBem = bemClassName(blockElements, 'content', modifiers, bemSeparator)
        const animatorBem = bemClassName(blockElements, 'animator', modifiers, bemSeparator)

        const height = checked
            ? this.state.height && this.state.height + 'px' || 'auto'
            : '0px'

        // contentId will be overwritten by props.id (intended behavior)
        return (
            <Component
                id={contentId}
                {...props}
                aria-labelledby={inputId}
                className={!animatorBem ? className : (className ? `${animatorBem} ${className}` : animatorBem)}
                role="tabpanel"
                style={animated ? { ...style, height, overflow: 'hidden' } : { ...style, display: 'inline' }}
            >
                <div ref={this.getRef} className={panelBem}>
                    {children}
                </div>
            </Component>
        )
    }
}

HeightTransition.contextTypes = TabContent.contextTypes
HeightTransition.defaultProps = TabContent.defaultProps

HeightTransition.propTypes = {
    ...TabContent.propTypes,
    style: PropTypes.object,
}

export default HeightTransition
