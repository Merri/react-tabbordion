import { describe, Try } from 'riteway'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { renderToHtml } from '../utils.test'
import { useTabbordion } from '../..'

describe('useTabbordion', async (assert) => {
    {
        function WithoutParam() {
            useTabbordion()
        }

        assert({
            given: 'call without param',
            should: 'throw',
            actual: Try(() => renderToHtml(<WithoutParam />)),
            expected: Error('useTabbordion: must give options object!'),
        })
    }

    {
        function WithoutID() {
            useTabbordion({})
        }

        assert({
            given: 'call without id',
            should: 'throw',
            actual: Try(() => renderToHtml(<WithoutID />)),
            expected: Error('useTabbordion: must give ID!'),
        })
    }

    {
        function WithoutID() {
            useTabbordion({ id: '' })
        }

        assert({
            given: 'call with falsy id',
            should: 'throw',
            actual: Try(() => renderToHtml(<WithoutID />)),
            expected: Error('useTabbordion: must give ID!'),
        })
    }

    {
        let output

        function Test() {
            output = useTabbordion({ id: 'test' })
            return null
        }

        renderToStaticMarkup(<Test />)

        assert({
            given: 'valid id',
            should: 'return object with specific keys',
            actual: Object.keys(output),
            expected: ['active', 'getProps', 'setActive', 'tabButton', 'tabItem', 'tabList', 'tabPanel', 'tabState'],
        })

        assert({
            given: 'active',
            should: 'be null',
            actual: output.active,
            expected: null,
        })

        assert({
            given: 'tabList',
            should: 'be object',
            actual: output.tabList,
            expected: { id: 'test', role: 'tablist' },
        })

        const functions = ['getProps', 'setActive', 'tabButton', 'tabItem', 'tabPanel', 'tabState']

        assert({
            given: functions.join(', '),
            should: 'be functions',
            actual: functions.map((name) => typeof output[name]),
            expected: ['function', 'function', 'function', 'function', 'function', 'function'],
        })

        assert({
            given: 'getProps() is called before tabItem',
            should: 'throw',
            actual: Try(output.getProps),
            expected: Error('useTabbordion.getProps: must call .tabItem first!'),
        })

        assert({
            given: 'tabItem() is called without key',
            should: 'throw',
            actual: Try(output.tabItem),
            expected: Error('useTabbordion.tabItem: must give a key!'),
        })

        assert({
            given: 'tabItem() is called with key',
            should: 'return first item',
            actual: output.tabItem('test'),
            expected: { 'aria-disabled': undefined, 'aria-expanded': true },
        })

        assert({
            given: 'getProps() is called with unsupported option',
            should: 'throw',
            actual: Try(output.getProps, 'nonexistant'),
            expected: Error(
                'useTabbordion.getProps: must give one of "button, input, item, label, panel, state" but got: nonexistant'
            ),
        })

        assert({
            given: 'getProps(state) is called after tabItem()',
            should: 'return props',
            actual: output.getProps('state'),
            expected: { checked: true, name: 'test', tab: 'test', tabId: 'test-0', value: '0' },
        })

        assert({
            given: 'tabItem() is called with same key',
            should: 'return first item',
            actual: output.tabItem('test'),
            expected: { 'aria-disabled': undefined, 'aria-expanded': true },
        })

        assert({
            given: 'getProps(state) is called after tabItem() with same key as first one',
            should: 'return first item',
            actual: output.getProps('state'),
            expected: { checked: true, name: 'test', tab: 'test', tabId: 'test-0', value: '0' },
        })

        assert({
            given: 'tabItem() is called with different key',
            should: 'return second item',
            actual: output.tabItem('test2'),
            expected: { 'aria-disabled': undefined, 'aria-expanded': false },
        })

        assert({
            given: 'getProps(state) is called after tabItem() with a new unique key',
            should: 'return second item',
            actual: output.getProps('state'),
            expected: { checked: false, name: 'test', tab: 'test2', tabId: 'test-1', value: '1' },
        })

        const testButton = output.tabButton('test')

        assert({
            given: 'tabButton(test) is called',
            should: 'return first item',
            actual: testButton,
            expected: {
                'aria-controls': 'test-0-panel',
                'aria-selected': true,
                disabled: undefined,
                id: 'test-0',
                onClick: testButton.onClick,
                onKeyDown: testButton.onKeyDown,
                onMouseDown: testButton.onMouseDown,
                onMouseUp: testButton.onMouseUp,
                role: 'tab',
                tabIndex: 0,
                type: 'button',
                value: '0',
            },
        })

        const test2Button = output.tabButton('test2')

        assert({
            given: 'tabButton(test2) is called',
            should: 'return second item',
            actual: test2Button,
            expected: {
                'aria-controls': 'test-1-panel',
                'aria-selected': false,
                disabled: undefined,
                id: 'test-1',
                onClick: test2Button.onClick,
                onKeyDown: test2Button.onKeyDown,
                onMouseDown: test2Button.onMouseDown,
                onMouseUp: test2Button.onMouseUp,
                role: 'tab',
                tabIndex: -1,
                type: 'button',
                value: '1',
            },
        })

        assert({
            given: 'tabPanel(test) is called',
            should: 'return first item',
            actual: output.tabPanel('test'),
            expected: {
                'aria-disabled': undefined,
                'aria-hidden': undefined,
                'aria-labelledby': 'test-0',
                id: 'test-0-panel',
                role: 'tabpanel',
                tabIndex: 0,
            },
        })

        const testInput = output.getProps('input')

        assert({
            given: 'getProps(input) is called',
            should: 'return previously queried item',
            actual: testInput,
            expected: {
                'aria-controls': 'test-0-panel',
                'aria-labelledby': 'test-0-label',
                'aria-selected': true,
                checked: true,
                disabled: undefined,
                id: 'test-0',
                onChange: testInput.onChange,
                onKeyDown: testInput.onKeyDown,
                name: 'test',
                type: 'radio',
                role: 'tab',
                value: '0',
            },
        })
    }
})
