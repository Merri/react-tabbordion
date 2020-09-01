import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'
import { withContext } from 'shallow-with-context'

import { identity } from '../lib/identity'

Enzyme.configure({ adapter: new Adapter() })

class Event {
    constructor(type, opts) {
        this.type = type
        this.bubbles = !!(opts && opts.bubbles)
        this.cancelable = !!(opts && opts.cancelable)
    }
    stopPropagation() {
        this._stop = true
    }
    stopImmediatePropagation() {
        this._end = this._stop = true
    }
    preventDefault() {
        this.defaultPrevented = true
    }
}

export function createClick(handler) {
    function click(event) {
        click.clickCount++
        click.lastClickEvent = event
        if (typeof handler === 'function') handler(event)
    }
    click.clickCount = 0
    return click
}

export function shallowSimulateClick(component, props, context, contextValue) {
    // https://github.com/enzymejs/enzyme/issues/2189
    const Component = context ? withContext(component, contextValue) : component
    const wrapper = shallow(<Component {...props} />, { context: contextValue })
    wrapper.simulate('click', new Event('click'))
    return wrapper
}

export function createTestPanel({
    animateContent,
    checked,
    id = 'tabbordion',
    disabled,
    hasContent,
    index,
    isBetween,
    isFirst,
    isLast,
    value,
    visible,
}) {
    const inputId = `${id}-${index}`
    return {
        checked: !!checked,
        contentId: `${inputId}-content`,
        disabled: !!disabled,
        hasContent: !!hasContent,
        index,
        inputId,
        labelId: `${inputId}-label`,
        modifiers: [
            checked ? 'checked' : 'unchecked',
            hasContent ? 'content' : 'no-content',
            disabled ? 'disabled' : 'enabled',
            isFirst && 'first',
            isLast && 'last',
            isBetween && 'between',
            animateContent && 'animated',
            animateContent,
        ].filter(identity),
        value: value != null ? value : String(index),
        visible: visible != null ? visible : true,
    }
}

export function withClaims(context) {
    const nextContext = {
        ...context,
        claims: [],
        claim: (component) => {
            if (!nextContext.claims.includes(component)) nextContext.claims.push(component)
        },
        unclaim: (component) => {
            const index = nextContext.claims.indexOf(component)
            if (~index) nextContext.claims.splice(index, 1)
        }
    }
    return nextContext
}
