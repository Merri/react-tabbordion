import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { bemClassName } from '../lib/bem'
import { addResizeListener, removeResizeListener } from '../lib/resize'

class TabContent extends PureComponent {
    constructor(props, context) {
        super(props, context)

        this.state = { fastTransition: false, height: null }

        this.getRef = this.getRef.bind(this)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        this.context.bem.subscribe(this)
        this.context.tabbordionPanel.subscribe(this)
        // add reference here to reduce unnecessary references server side
        this.onResize.getState = this.context.tabbordionPanel.getState
        addResizeListener(this.onResize)
    }

    componentDidUpdate() {
        this.update()
    }

    componentWillReceiveProps(props, context) {
        // this should not happen but we know bugs happen when unexpected things happen
        if (context.tabbordionPanel !== this.context.tabbordionPanel) {
            this.onResize.getState = context.tabbordionPanel.getState
        }
    }

    componentWillUnmount() {
        removeResizeListener(this.onResize)

        this.context.bem.unsubscribe(this)
        this.context.tabbordionPanel.unsubscribe(this)
    }

    getRef(child) {
        this.child = child
    }

    onResize() {
        this.update('resize')
    }

    update(triggerer) {
        if (!this.child) {
            return
        }

        const { bottom, top } = this.child.getBoundingClientRect()
        const height = Math.ceil(bottom - top)
        let fastTransition = this.state.fastTransition

        if (this.state.height !== height) {
            // make all transitions go faster to give smoother experience
            if (triggerer === 'resize') {
                fastTransition = true
            }

            this.setState({ fastTransition, height })
        }
        // kills the previous timeout after each resize event so that fast mode is alive until after last resize event
        if (triggerer === 'resize' && fastTransition) {
            clearTimeout(this._dtt)
            this._dtt = setTimeout(() => {
                delete this._dtt
                this.setState({ fastTransition: false })
            }, 500)
        }
    }

    render() {
        const { children, className, component: Component, style, ...props } = this.props
        const { bemSeparator, blockElements } = this.context.bem.getState()
        const { animateContent, checked, contentId, inputId, modifiers } = this.context.tabbordionPanel.getState()
        const panelBem = bemClassName(blockElements, 'content', modifiers, bemSeparator)
        const animatorBem = bemClassName(blockElements, 'animator', modifiers, bemSeparator)

        const height = animateContent === 'height' ? (checked
            ? this.state.height && this.state.height + 'px' || 'auto'
            : '0px'
        ) : null

        const marginTop = animateContent === 'marginTop' ? (!checked
            ? this.state.height && -this.state.height + 'px' || '-65535px'
            : '0px'
        ) : null

        const resizeStyle = this.state.fastTransition ? {
            webkitTransition: 'all 32ms',
            transition: 'all 32ms',
        } : null

        // contentId will be overwritten by props.id (intended behavior)
        return animateContent ? (
            <Component
                id={contentId}
                {...props}
                aria-labelledby={inputId}
                className={!animatorBem ? className : (className ? `${animatorBem} ${className}` : animatorBem)}
                role="tabpanel"
                style={{
                    ...style,
                    height,
                    overflow: checked && animateContent === 'marginTop' ? 'visible' : 'hidden',
                    ...resizeStyle,
                }}
            >
                <div ref={this.getRef} className={panelBem} style={marginTop && { marginTop, ...resizeStyle }}>
                    {children}
                </div>
            </Component>
        ) : (
            <Component
                id={contentId}
                {...props}
                aria-labelledby={inputId}
                className={!panelBem ? className : (className ? `${panelBem} ${className}` : panelBem)}
                ref={this.getRef}
                role="tabpanel"
                style={style}
            >
                {children}
            </Component>
        )
    }
}

TabContent.hasContent = true

TabContent.contextTypes = {
    bem: PropTypes.object,
    tabbordionPanel: PropTypes.object,
}

TabContent.defaultProps = {
    component: 'div',
}

TabContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    style: PropTypes.object,
}

export default TabContent
