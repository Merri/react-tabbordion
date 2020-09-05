import { describe } from 'riteway'
import React from 'react'

import { defaultBemModifiers, defaultBemSeparator, defaultBlockElements } from '../../lib/bem'
import { TabPanelContext } from '../../components/Tabbordion'
import { TabPanel } from '../..'
import { createTestPanel, renderToHtml, withClaims } from '../utils.test'

describe('TabPanel', async (assert) => {
    {
        const html = renderToHtml(<TabPanel />) //
        assert({
            given: 'nothing',
            should: 'render a list item',
            actual: html,
            expected: '\n<li role="tab"></li>\n',
        })
    }

    {
        const html = renderToHtml(
            <TabPanel
                checked
                className="test-class"
                component="div"
                disabled={false}
                id="test-id"
                index={0}
                modifiers={['test']}
                name="test-name"
                style={{ background: 'green' }}
                type="radio"
                value="test-value"
                visible
            />
        ) //
        assert({
            given: 'supported props',
            should: 'render based on the props',
            actual: html,
            expected: `
<div aria-selected="true" class="test-class" role="tab" style="background: green">
    <input type="radio" checked="" name="test-name" value="test-value" />
</div>
`
        })
    }

    {
        const html = renderToHtml(
            <TabPanel
                animateContent="height"
                bemModifiers={defaultBemModifiers}
                bemSeparator={defaultBemSeparator}
                blockElements={defaultBlockElements}
                inputProps={{ 'data-test': 'test' }}
            />
        ) //
        assert({
            given: 'context props through regular props',
            should: 'ignore the props',
            actual: html,
            expected: '\n<li role="tab"></li>\n',
        })
    }

    {
        const html = renderToHtml(
            <TabPanelContext.Provider
                value={withClaims({
                    animateContent: 'height',
                    bemModifiers: defaultBemModifiers,
                    bemSeparator: defaultBemSeparator,
                    blockElements: defaultBlockElements,
                    panels: [
                        createTestPanel({
                            id: 'test-id',
                            checked: true,
                            hasContent: true,
                            index: 0,
                            isFirst: true,
                            isLast: true,
                        }),
                    ],
                    inputProps: { 'data-test': 'test' },
                    name: 'test-name',
                    type: 'radio',
                })}
            >
                <TabPanel />
            </TabPanelContext.Provider>
        ) //
        assert({
            given: 'context',
            should: 'render based on given props',
            actual: html,
            expected: `
<li
    aria-controls="test-id-0-content"
    aria-selected="true"
    class="panel panel--checked panel--content panel--enabled panel--first panel--last"
    role="tab"
>
    <input type="radio" data-test="test" checked="" id="test-id-0" name="test-name" value="0" />
</li>
`
        })
    }

    {
        const html = renderToHtml(
            <TabPanelContext.Provider
                value={withClaims({
                    animateContent: 'marginTop',
                    bemModifiers: defaultBemModifiers,
                    bemSeparator: defaultBemSeparator,
                    blockElements: defaultBlockElements,
                    panels: [
                        createTestPanel({
                            animateContent: 'marginTop',
                            id: 'test-id',
                            checked: false,
                            disabled: true,
                            hasContent: false,
                            index: 1,
                            isBetween: true,
                            isFirst: false,
                            isLast: false,
                            visible: false,
                        }),
                    ],
                    inputProps: { 'data-test': 'test' },
                    name: 'test-name',
                    type: 'radio',
                })}
            >
                <TabPanel className="test-class" />
            </TabPanelContext.Provider>
        ) //
        assert({
            given: 'context with some reversed settings',
            should: 'render based on given props',
            actual: html,
            expected: `
<li
    aria-selected="false"
    class="panel panel--unchecked panel--no-content panel--disabled panel--between panel--animated panel--marginTop test-class"
    hidden=""
    role="tab"
>
    <input type="radio" data-test="test" disabled="" id="test-id-1" name="test-name" value="1" />
</li>
`
        })
    }
})
