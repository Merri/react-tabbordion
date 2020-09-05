import equal from 'fast-deep-equal'
import PropTypes from 'prop-types'
import React from 'react'

import { bemClassName } from '../lib/bem'
import { identity } from '../lib/identity'
import { TabContentContext } from './Tabbordion'

const noTransitionStyle = { WebkitTransition: 'none', transition: 'none' }
const resizeTransitionStyle = { WebkitTransition: 'all 32ms', transition: 'all 32ms' }

export class TabContent extends React.PureComponent {
    static contextType = TabContentContext

    static defaultProps = {
        component: 'div',
        resizeDuration: 250,
    }

    static propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        component: PropTypes.elementType,
        forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any.isRequired })]),
        resizeDuration: PropTypes.number,
        style: PropTypes.object,
    }

    state = {
        resizeTransition: false,
        height: null,
    }

    observeContent = (content) => {
        if (this.content === content) return
        if (this.content && this.contentResize) this.contentResize.unobserve(this.content)
        this.content = content
        if (content && typeof ResizeObserver !== 'undefined') {
            this.contentResize = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    if (entry.target !== this.content) continue
                    const height = Math.ceil(entry.contentRect.bottom - entry.contentRect.top)
                    const heightChanged = height !== this.state.height
                    if (heightChanged) {
                        this.setState({ resizeTransition: true, height })
                    }
                    if (heightChanged || this.state.resizeTransition) {
                        clearTimeout(this.ongoingResize)
                        this.ongoingResize = setTimeout(() => {
                            delete this.ongoingResize
                            this.setState({ resizeTransition: false })
                        }, this.props.resizeDuration)
                    }
                }
            })
            this.contentResize.observe(content, { box: 'border-box' })
        } else {
            if (this.state.height !== null) this.setState({ height: null })
            if (this.contentResize) delete this.contentResize
        }
    }

    componentDidMount() {
        if (this.content) {
            const { bottom, top } = this.content.getBoundingClientRect()
            const height = Math.ceil(bottom - top)
            if (height !== this.state.height) this.setState({ height })
        }
    }

    componentWillUnmount() {
        if (this.content && this.contentResize) contentResize.unobserve(this.content)
        if (this.ongoingResize) clearTimeout(this.ongoingResize)
    }

    render() {
        const { animateContent, bemSeparator, blockElements, checked, contentId, labelId, modifiers } = this.context
        const { children, className, component: Component, forwardedRef, style, resizeDuration, ...props } = this.props
        const { resizeTransition, height } = this.state
        const contentBem = bemClassName(blockElements, 'content', modifiers, bemSeparator)
        const animatorBem = bemClassName(blockElements, 'animator', modifiers, bemSeparator)

        const contentStyle =
            (animateContent === 'marginTop' && {
                marginTop: checked ? '0px' : height != null ? `-${height}px` : '-50000px',
            }) ||
            (animateContent !== 'height' && style) ||
            undefined

        const animatorStyle =
            (animateContent === 'marginTop' && {
                ...style,
                overflow: 'hidden',
            }) ||
            (animateContent === 'height' && {
                ...style,
                height: checked ? (height != null ? `${height}px` : 'auto') : '0px',
                overflow: 'hidden',
            }) ||
            undefined

        // transitions have to be disabled when swapping between animation modes to prevent unintended transitions
        const disableTransition = animateContent !== this.animateContent
        if (disableTransition) {
            this.animateContent = animateContent
            if (contentStyle) Object.assign(contentStyle, noTransitionStyle)
            if (animatorStyle) Object.assign(animatorStyle, noTransitionStyle)
        } else if (resizeTransition) {
            if (contentStyle) Object.assign(contentStyle, resizeTransitionStyle)
            if (animatorStyle) Object.assign(animatorStyle, resizeTransitionStyle)
        }

        if (!equal(this.contentStyle, contentStyle)) this.contentStyle = contentStyle
        if (!equal(this.animatorStyle, animatorStyle)) this.animatorStyle = animatorStyle

        if (!animateContent) {
            return (
                <Component
                    {...props}
                    ref={forwardedRef}
                    aria-expanded={checked}
                    aria-labelledby={labelId}
                    className={[contentBem, className].filter(identity).join(' ') || undefined}
                    id={contentId || this.props.id}
                    role="tabpanel"
                    style={this.contentStyle}
                    tabIndex={~~checked - 1}
                >
                    {children}
                </Component>
            )
        }

        return (
            <Component
                {...props}
                ref={forwardedRef}
                aria-expanded={checked}
                aria-labelledby={labelId}
                className={[animatorBem, className].filter(identity).join(' ') || undefined}
                id={contentId || this.props.id}
                role="tabpanel"
                style={this.animatorStyle}
                tabIndex={~~checked - 1}
            >
                <div ref={this.observeContent} className={contentBem} style={this.contentStyle}>
                    {children}
                </div>
            </Component>
        )
    }
}
