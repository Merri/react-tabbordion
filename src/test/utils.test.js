import prettier from 'prettier'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { identity } from '../lib/identity'

/**
 * Creates a click handler to allow tracking number of calls to function.
 *
 * @param      {Function}  handler  The handler
 * @return     {Function}  Function which contains clickCount and lastClickEvent
 */
export function createClick(handler) {
    function click(event) {
        click.clickCount++
        click.lastClickEvent = event
        if (typeof handler === 'function') handler(event)
    }
    click.clickCount = 0
    return click
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

/**
 * Insert claiming methods and array to React context object. Claiming is a workaround to rely on React lifecycle order
 * over reliance on valid index/key references.
 *
 * @param      {object}  context  Context
 * @return     {object}  Context with claims
 */
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
        },
    }
    return nextContext
}

const htmlOptions = {
    parser: 'html',
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    fluid: false,
}

/**
 * Renders pretty formatted static HTML of a given React element.
 *
 * @param      {object}  element  React element
 * @return     {string}  HTML
 */
export function renderToHtml(element) {
    return '\n' + prettier.format(renderToStaticMarkup(element), htmlOptions)
}
