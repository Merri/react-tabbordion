import { describe } from 'riteway'
import React from 'react'

import { TabPanelContext } from '../../components/Tabbordion'
import { defaultBemModifiers, defaultBemSeparator, defaultBlockElements } from '../../lib/bem'
import { Tabbordion, TabContent, TabLabel, TabPanel, updatePanelsByToggle } from '../..'
import { createTestPanel, renderToHtml } from '../utils.test'

describe('Tabbordion > TabPanel > TabLabel + TabContent', async (assert) => {
    {
        const html = renderToHtml(
            <Tabbordion animateContent="height">
                <TabPanel>
                    <TabLabel id="test-label">Unchecked</TabLabel>
                    <TabContent id="test-content">Content</TabContent>
                </TabPanel>
                <li>
                    <TabPanel component="div" checked id="test-panel" type="checkbox" value="test-value">
                        <TabLabel>Checked</TabLabel>
                        <div>
                            <TabContent>Test content</TabContent>
                        </div>
                    </TabPanel>
                </li>
            </Tabbordion>
        ) //
        Tabbordion.resetSSR()

        assert({
            given: 'prop overrides, extra children, and animateContent="height"',
            should: 'render with overrides, extra children, and with matching animateContent rules',
            actual: html,
            expected: `
<ul role="tablist">
    <li
        aria-controls="test-content"
        aria-selected="false"
        class="panel panel--unchecked panel--content panel--enabled panel--first panel--animated panel--height"
        role="tab"
    >
        <input type="radio" data-state="tabbordion" id="tabbordion-0-0" name="tabbordion-0" value="0" /><label
            class="panel__label panel__label--unchecked panel__label--content panel__label--enabled panel__label--first panel__label--animated panel__label--height"
            id="test-label"
            for="tabbordion-0-0"
            >Unchecked</label
        >
        <div
            id="test-content"
            aria-expanded="false"
            aria-labelledby="test-label"
            class="panel__animator panel__animator--unchecked panel__animator--content panel__animator--enabled panel__animator--first panel__animator--animated panel__animator--height"
            role="tabpanel"
            style="height: 0px; overflow: hidden; -webkit-transition: none; transition: none"
            tabindex="-1"
        >
            <div
                class="panel__content panel__content--unchecked panel__content--content panel__content--enabled panel__content--first panel__content--animated panel__content--height"
            >
                Content
            </div>
        </div>
    </li>
    <li>
        <div
            aria-controls="test-panel-content"
            aria-selected="true"
            class="panel panel--checked panel--content panel--enabled panel--last panel--animated panel--height"
            role="tab"
        >
            <input
                type="checkbox"
                data-state="tabbordion"
                checked=""
                id="test-panel"
                name="tabbordion-0"
                value="test-value"
            /><label
                class="panel__label panel__label--checked panel__label--content panel__label--enabled panel__label--last panel__label--animated panel__label--height"
                id="test-panel-label"
                for="test-panel"
                >Checked</label
            >
            <div>
                <div
                    aria-expanded="true"
                    aria-labelledby="test-panel-label"
                    class="panel__animator panel__animator--checked panel__animator--content panel__animator--enabled panel__animator--last panel__animator--animated panel__animator--height"
                    id="test-panel-content"
                    role="tabpanel"
                    style="height: auto; overflow: hidden; -webkit-transition: none; transition: none"
                    tabindex="0"
                >
                    <div
                        class="panel__content panel__content--checked panel__content--content panel__content--enabled panel__content--last panel__content--animated panel__content--height"
                    >
                        Test content
                    </div>
                </div>
            </div>
        </div>
    </li>
</ul>
`,
        })
    }
})
