import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { bemClassName } from '../lib/bem'

const instances = []
let timeout

function onResize() {
    clearTimeout(timeout)
    timeout = setTimeout(function() {
        timeout = null
        instances.forEach(callback => callback.getState().animateContent && callback())
    }, 100)
}

function addListener(callback) {
    if (instances.length === 0) {
        window.addEventListener('resize', onResize, false)
    }

    if (!instances.includes(callback)) {
        instances.push(callback)
    }
}

function removeListener(callback) {
    const index = instances.indexOf(callback)

    if (~index) {
        instances.splice(index, 1)
    }

    if (instances.length === 0) {
        window.removeEventListener('resize', onResize, false)
    }
}

class TabContent extends PureComponent {
    constructor(props, context) {
        super(props, context)

        this.state = { disableTransition: false, height: null }

        this.getRef = this.getRef.bind(this)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
        this.onResize.getState = context.tabbordionPanel.getState
    }

    componentDidMount() {
        this.context.bem.subscribe(this)
        this.context.tabbordionPanel.subscribe(this)

        addListener(this.onResize)
    }

    componentWillUnmount() {
        removeListener(this.onResize)

        this.context.bem.unsubscribe(this)
        this.context.tabbordionPanel.unsubscribe(this)
    }

    componentDidUpdate() {
        this.update()
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

        if (this.state.height !== height) {
            if (triggerer === 'resize') {
                this.setState({ disableTransition: true, height })

                clearTimeout(this._dtt)
                this._dtt = setTimeout(() => {
                    delete this._dtt
                    this.setState({ disableTransition: false })
                }, 500)
            } else {
                this.setState({ height })
            }
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

        const disabledStyle = this.state.disableTransition ? { webkitTransition: 'unset', transition: 'unset' } : null

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
                    ...disabledStyle,
                }}
            >
                <div ref={this.getRef} className={panelBem} style={marginTop && { marginTop, ...disabledStyle }}>
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