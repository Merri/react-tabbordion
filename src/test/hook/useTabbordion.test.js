import { fireEvent, render } from '@testing-library/react'
import dom from 'jsdom-global'
import { describe, Try } from 'riteway'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { createClick, renderToHtml } from '../utils.test'
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
            expected: {
                'aria-controls': 'test-0-panel',
                'aria-labelledby': 'test-0-label',
                'aria-selected': true,
                role: 'tab',
            },
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
            expected: {
                'aria-controls': 'test-0-panel',
                'aria-labelledby': 'test-0-label',
                'aria-selected': true,
                role: 'tab',
            },
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
            expected: {
                'aria-controls': 'test-1-panel',
                'aria-labelledby': 'test-1-label',
                'aria-selected': false,
                role: 'tab',
            },
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
                id: 'test-0',
                onClick: testButton.onClick,
                onKeyDown: testButton.onKeyDown,
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
                id: 'test-1',
                onClick: test2Button.onClick,
                onKeyDown: test2Button.onKeyDown,
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
                'aria-expanded': true,
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
                checked: true,
                id: 'test-0',
                onChange: testInput.onChange,
                onKeyDown: testInput.onKeyDown,
                name: 'test',
                type: 'radio',
                value: '0',
            },
        })
    }

    const cleanup = dom()

    {
        const noPanelIsActive = {
            one: {
                'aria-expanded': false,
                'aria-hidden': true,
                'aria-labelledby': 'test-0',
                id: 'test-0-panel',
                role: 'tabpanel',
                tabIndex: -1,
            },
            two: {
                'aria-expanded': false,
                'aria-hidden': true,
                'aria-labelledby': 'test-1',
                id: 'test-1-panel',
                role: 'tabpanel',
                tabIndex: -1,
            },
            three: {
                'aria-expanded': false,
                'aria-hidden': true,
                'aria-labelledby': 'test-2',
                id: 'test-2-panel',
                role: 'tabpanel',
                tabIndex: -1,
            },
        }

        const firstPanelIsActive = {
            one: {
                'aria-expanded': true,
                'aria-hidden': undefined,
                'aria-labelledby': 'test-0',
                id: 'test-0-panel',
                role: 'tabpanel',
                tabIndex: 0,
            },
            two: {
                'aria-expanded': false,
                'aria-hidden': true,
                'aria-labelledby': 'test-1',
                id: 'test-1-panel',
                role: 'tabpanel',
                tabIndex: -1,
            },
            three: {
                'aria-expanded': false,
                'aria-hidden': true,
                'aria-labelledby': 'test-2',
                id: 'test-2-panel',
                role: 'tabpanel',
                tabIndex: -1,
            },
        }

        const secondPanelIsActive = {
            one: {
                'aria-expanded': false,
                'aria-hidden': true,
                'aria-labelledby': 'test-0',
                id: 'test-0-panel',
                role: 'tabpanel',
                tabIndex: -1,
            },
            two: {
                'aria-expanded': true,
                'aria-hidden': undefined,
                'aria-labelledby': 'test-1',
                id: 'test-1-panel',
                role: 'tabpanel',
                tabIndex: 0,
            },
            three: {
                'aria-expanded': false,
                'aria-hidden': true,
                'aria-labelledby': 'test-2',
                id: 'test-2-panel',
                role: 'tabpanel',
                tabIndex: -1,
            },
        }

        const thirdPanelIsActive = {
            one: {
                'aria-expanded': false,
                'aria-hidden': true,
                'aria-labelledby': 'test-0',
                id: 'test-0-panel',
                role: 'tabpanel',
                tabIndex: -1,
            },
            two: {
                'aria-expanded': false,
                'aria-hidden': true,
                'aria-labelledby': 'test-1',
                id: 'test-1-panel',
                role: 'tabpanel',
                tabIndex: -1,
            },
            three: {
                'aria-expanded': true,
                'aria-hidden': undefined,
                'aria-labelledby': 'test-2',
                id: 'test-2-panel',
                role: 'tabpanel',
                tabIndex: 0,
            },
        }

        const secondAndThirdPanelsAreActive = {
            one: {
                'aria-expanded': false,
                'aria-hidden': true,
                'aria-labelledby': 'test-0',
                id: 'test-0-panel',
                role: 'tabpanel',
                tabIndex: -1,
            },
            two: {
                'aria-expanded': true,
                'aria-hidden': undefined,
                'aria-labelledby': 'test-1',
                id: 'test-1-panel',
                role: 'tabpanel',
                tabIndex: 0,
            },
            three: {
                'aria-expanded': true,
                'aria-hidden': undefined,
                'aria-labelledby': 'test-2',
                id: 'test-2-panel',
                role: 'tabpanel',
                tabIndex: 0,
            },
        }

        const allPanelsAreActive = {
            one: {
                'aria-expanded': true,
                'aria-hidden': undefined,
                'aria-labelledby': 'test-0',
                id: 'test-0-panel',
                role: 'tabpanel',
                tabIndex: 0,
            },
            two: {
                'aria-expanded': true,
                'aria-hidden': undefined,
                'aria-labelledby': 'test-1',
                id: 'test-1-panel',
                role: 'tabpanel',
                tabIndex: 0,
            },
            three: {
                'aria-expanded': true,
                'aria-hidden': undefined,
                'aria-labelledby': 'test-2',
                id: 'test-2-panel',
                role: 'tabpanel',
                tabIndex: 0,
            },
        }

        let output

        function Test(props) {
            output = useTabbordion(props)
            const { tabButton, tabList, tabPanel } = output

            return (
                <div>
                    <div {...tabList}>
                        <button {...tabButton(1)}>One</button>
                        <button {...tabButton(2)}>Two</button>
                        <button {...tabButton(3)}>Three</button>
                    </div>
                    <div {...tabPanel(1)}>Panel one</div>
                    <div {...tabPanel(2)}>Panel two</div>
                    <div {...tabPanel(3)}>Panel three</div>
                </div>
            )
        }

        const getPanelState = () => ({ one: output.tabPanel(1), two: output.tabPanel(2), three: output.tabPanel(3) })

        const { getByText, rerender } = render(<Test id="test" initial={2} />)

        assert({
            given: 'initial tells second tab to be active',
            should: 'have second panel active',
            actual: getPanelState(),
            expected: secondPanelIsActive,
        })

        fireEvent.click(getByText('Two'))

        assert({
            given: 'second button is clicked',
            should: 'activate second panel',
            actual: getPanelState(),
            expected: secondPanelIsActive,
        })

        fireEvent.keyDown(getByText('One'), { key: 'End', code: 'End' })

        assert({
            given: 'End is pressed',
            should: 'activate last panel',
            actual: getPanelState(),
            expected: thirdPanelIsActive,
        })

        fireEvent.keyDown(getByText('Three'), { key: 'Home', code: 'Home' })

        assert({
            given: 'Home is pressed',
            should: 'activate first panel',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        fireEvent.keyDown(getByText('One'), { key: 'ArrowLeft', code: 'ArrowLeft' })

        assert({
            given: 'ArrowLeft is pressed on first tab',
            should: 'activate last panel',
            actual: getPanelState(),
            expected: thirdPanelIsActive,
        })

        fireEvent.keyDown(getByText('Two'), { key: 'ArrowLeft', code: 'ArrowLeft' })

        assert({
            given: 'ArrowLeft is pressed on second tab',
            should: 'activate first panel',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        fireEvent.keyDown(getByText('Two'), { key: 'ArrowRight', code: 'ArrowRight' })

        assert({
            given: 'ArrowRight is pressed on second tab',
            should: 'activate last panel',
            actual: getPanelState(),
            expected: thirdPanelIsActive,
        })

        fireEvent.keyDown(getByText('Three'), { key: 'ArrowRight', code: 'ArrowRight' })

        assert({
            given: 'ArrowRight is pressed on third tab',
            should: 'activate first panel',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        assert({
            given: 'document active element',
            should: 'be first button',
            actual: document.activeElement === getByText('One'),
            expected: true,
        })

        fireEvent.keyDown(getByText('One'), { key: 'Escape', code: 'Escape' })

        assert({
            given: 'Esc is pressed when toggle and multiple are not used',
            should: 'not change state',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        fireEvent.click(getByText('One'))

        assert({
            given: 'already active tab is clicked',
            should: 'not change state',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        rerender(<Test id="test" toggle />)

        assert({
            given: 'rerender enabling toggle mode',
            should: 'not change state',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        fireEvent.click(getByText('One'))

        assert({
            given: 'already active tab is clicked in toggle mode',
            should: 'toggle all panels off',
            actual: getPanelState(),
            expected: noPanelIsActive,
        })

        fireEvent.click(getByText('One'))

        assert({
            given: 'inactive tab is clicked in toggle mode',
            should: 'toggle panels on',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        fireEvent.click(getByText('Two'))

        assert({
            given: 'another inactive tab is clicked in toggle mode',
            should: 'keep only the activated panel active',
            actual: getPanelState(),
            expected: secondPanelIsActive,
        })

        rerender(<Test id="test" multiple />)

        assert({
            given: 'rerender enabling multiple mode',
            should: 'not change state',
            actual: getPanelState(),
            expected: secondPanelIsActive,
        })

        fireEvent.click(getByText('Three'))

        assert({
            given: 'inactive tab is clicked in multiple mode',
            should: 'allow multiple panels to be active',
            actual: getPanelState(),
            expected: secondAndThirdPanelsAreActive,
        })

        fireEvent.keyDown(getByText('Three'), { key: 'ArrowRight', code: 'ArrowRight' })

        assert({
            given: 'ArrowRight is pressed on third tab',
            should: 'not change state, focus first tab',
            actual: { ...getPanelState(), firstPanelIsFocused: document.activeElement === getByText('One') },
            expected: { ...secondAndThirdPanelsAreActive, firstPanelIsFocused: true },
        })

        fireEvent.keyDown(document.activeElement, { key: 'Enter', code: 'Enter' })

        assert({
            given: 'Enter is pressed on active element',
            should: 'toggle panel active',
            actual: { ...getPanelState(), firstPanelIsFocused: document.activeElement === getByText('One') },
            expected: { ...allPanelsAreActive, firstPanelIsFocused: true },
        })

        fireEvent.keyDown(document.activeElement, { key: ' ', code: 'Space' })

        assert({
            given: 'Space is pressed on active element',
            should: 'toggle panel inactive',
            actual: { ...getPanelState(), firstPanelIsFocused: document.activeElement === getByText('One') },
            expected: { ...secondAndThirdPanelsAreActive, firstPanelIsFocused: true },
        })

        fireEvent.keyDown(getByText('One'), { key: 'Escape', code: 'Escape' })

        assert({
            given: 'Esc is pressed when in multiple mode',
            should: 'close all panels',
            actual: getPanelState(),
            expected: noPanelIsActive,
        })

        output.setActive(2)

        assert({
            given: 'setActive(2) is called in multiple mode',
            should: 'make second panel active',
            actual: getPanelState(),
            expected: secondPanelIsActive,
        })

        output.setActive([])

        assert({
            given: 'setActive([]) is called in multiple mode',
            should: 'have no panel active',
            actual: getPanelState(),
            expected: noPanelIsActive,
        })

        output.setActive([1])

        assert({
            given: 'setActive([1]) is called in multiple mode',
            should: 'make first panel active',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        output.setActive([3, 2])

        assert({
            given: 'setActive([3, 2]) is called in multiple mode',
            should: 'make second and third panel active',
            actual: getPanelState(),
            expected: secondAndThirdPanelsAreActive,
        })

        rerender(<Test id="test" toggle />)

        assert({
            given: 'rerender going from multiple to toggle mode',
            should: 'keep only one panel active',
            actual: getPanelState(),
            expected: thirdPanelIsActive,
        })

        output.setActive()
        rerender(<Test id="test" />)

        assert({
            given: 'rerender to normal mode when no panels active',
            should: 'activate first panel',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        output.setActive()

        assert({
            given: 'setActive() is called in normal mode',
            should: 'keep first panel active',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        output.setActive([])

        assert({
            given: 'setActive([]) is called in normal mode',
            should: 'keep first panel active',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        output.setActive([2])

        assert({
            given: 'setActive([2]) is called in normal mode',
            should: 'keep first panel active',
            actual: getPanelState(),
            expected: firstPanelIsActive,
        })

        output.setActive(3)

        assert({
            given: 'setActive(3) is called in normal mode',
            should: 'make last panel active',
            actual: getPanelState(),
            expected: thirdPanelIsActive,
        })

        assert({
            given: 'hydrated mode render vs SSR',
            should: 'differ',
            actual: renderToHtml(<Test hydrated id="test" />) !== renderToHtml(<Test id="test" />),
            expected: true,
        })
    }

    cleanup()
})
