import { describe } from 'riteway'
import React from 'react'

import { TabPanelContext } from '../../components/Tabbordion'
import { defaultBemModifiers, defaultBemSeparator, defaultBlockElements } from '../../lib/bem'
import { Tabbordion, TabContent, TabLabel, TabPanel, updatePanelsByToggle } from '../..'
import { createTestPanel, renderToHtml } from '../utils.test'

describe('Tabbordion > TabPanel', async (assert) => {
    {
        const html = renderToHtml(
            <Tabbordion>
                <TabPanel />
            </Tabbordion>
        ) //
        Tabbordion.resetSSR()

        assert({
            given: 'nothing',
            should: 'render TabPanel with Tabbordion defaults',
            actual: html,
            expected: `
<ul role="tablist">
    <li class="panel panel--checked panel--no-content panel--enabled panel--first panel--last">
        <input
            type="radio"
            data-state="tabbordion"
            aria-selected="true"
            checked=""
            id="tabbordion-0-0"
            name="tabbordion-0"
            role="tab"
            value="0"
        />
    </li>
</ul>
`,
        })
    }

    {
        const html = renderToHtml(
            <Tabbordion>
                <TabPanel />
                <TabPanel checked id="test-panel" type="checkbox" value="test-value" />
            </Tabbordion>
        ) //
        Tabbordion.resetSSR()

        assert({
            given: 'two panels where second panel has prop overrides',
            should: 'render second TabPanel with overrides',
            actual: html,
            expected: `
<ul role="tablist">
    <li class="panel panel--unchecked panel--no-content panel--enabled panel--first">
        <input
            type="radio"
            data-state="tabbordion"
            aria-selected="false"
            id="tabbordion-0-0"
            name="tabbordion-0"
            role="tab"
            value="0"
        />
    </li>
    <li class="panel panel--checked panel--no-content panel--enabled panel--last">
        <input
            type="checkbox"
            data-state="tabbordion"
            aria-selected="true"
            checked=""
            id="test-panel"
            name="tabbordion-0"
            role="tab"
            value="test-value"
        />
    </li>
</ul>
`,
        })
    }
})

describe('Tabbordion > TabPanel > TabLabel', async (assert) => {
    {
        const html = renderToHtml(
            <Tabbordion>
                <TabPanel>
                    <TabLabel>Tab</TabLabel>
                </TabPanel>
            </Tabbordion>
        ) //
        Tabbordion.resetSSR()

        assert({
            given: 'nothing',
            should: 'render TabLabel and TabPanel with Tabbordion defaults',
            actual: html,
            expected: `
<ul role="tablist">
    <li class="panel panel--checked panel--no-content panel--enabled panel--first panel--last">
        <input
            type="radio"
            data-state="tabbordion"
            aria-selected="true"
            checked=""
            id="tabbordion-0-0"
            name="tabbordion-0"
            role="tab"
            value="0"
        /><label
            class="panel__label panel__label--checked panel__label--no-content panel__label--enabled panel__label--first panel__label--last"
            id="tabbordion-0-0-label"
            for="tabbordion-0-0"
            >Tab</label
        >
    </li>
</ul>
`,
        })
    }

    {
        const html = renderToHtml(
            <Tabbordion>
                <TabPanel>
                    <TabLabel id="test-label">Unchecked</TabLabel>
                </TabPanel>
                <TabPanel checked id="test-panel" type="checkbox" value="test-value">
                    <TabLabel>Checked</TabLabel>
                </TabPanel>
            </Tabbordion>
        ) //
        Tabbordion.resetSSR()

        assert({
            given: 'two panels where second panel has prop overrides',
            should: 'render second TabPanel with overrides',
            actual: html,
            expected: `
<ul role="tablist">
    <li class="panel panel--unchecked panel--no-content panel--enabled panel--first">
        <input
            type="radio"
            data-state="tabbordion"
            aria-selected="false"
            id="tabbordion-0-0"
            name="tabbordion-0"
            role="tab"
            value="0"
        /><label
            class="panel__label panel__label--unchecked panel__label--no-content panel__label--enabled panel__label--first"
            id="test-label"
            for="tabbordion-0-0"
            >Unchecked</label
        >
    </li>
    <li class="panel panel--checked panel--no-content panel--enabled panel--last">
        <input
            type="checkbox"
            data-state="tabbordion"
            aria-selected="true"
            checked=""
            id="test-panel"
            name="tabbordion-0"
            role="tab"
            value="test-value"
        /><label
            class="panel__label panel__label--checked panel__label--no-content panel__label--enabled panel__label--last"
            id="test-panel-label"
            for="test-panel"
            >Checked</label
        >
    </li>
</ul>
`,
        })
    }
})

describe('Tabbordion > TabPanel > TabLabel + TabContent', async (assert) => {
    {
        const html = renderToHtml(
            <Tabbordion>
                <TabPanel>
                    <TabLabel>Tab</TabLabel>
                    <TabContent>Content</TabContent>
                </TabPanel>
            </Tabbordion>
        ) //
        Tabbordion.resetSSR()

        assert({
            given: 'nothing',
            should: 'render TabContent, TabLabel and TabPanel with Tabbordion defaults',
            actual: html,
            expected: `
<ul role="tablist">
    <li class="panel panel--checked panel--content panel--enabled panel--first panel--last">
        <input
            type="radio"
            data-state="tabbordion"
            aria-controls="tabbordion-0-0-content"
            aria-selected="true"
            checked=""
            id="tabbordion-0-0"
            name="tabbordion-0"
            role="tab"
            value="0"
        /><label
            class="panel__label panel__label--checked panel__label--content panel__label--enabled panel__label--first panel__label--last"
            id="tabbordion-0-0-label"
            for="tabbordion-0-0"
            >Tab</label
        >
        <div
            aria-hidden="false"
            aria-labelledby="tabbordion-0-0-label"
            class="panel__content panel__content--checked panel__content--content panel__content--enabled panel__content--first panel__content--last"
            id="tabbordion-0-0-content"
            role="tabpanel"
            tabindex="0"
        >
            Content
        </div>
    </li>
</ul>
`,
        })
    }

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
    <li class="panel panel--unchecked panel--content panel--enabled panel--first panel--animated panel--height">
        <input
            type="radio"
            data-state="tabbordion"
            aria-controls="test-content"
            aria-selected="false"
            id="tabbordion-0-0"
            name="tabbordion-0"
            role="tab"
            value="0"
        /><label
            class="panel__label panel__label--unchecked panel__label--content panel__label--enabled panel__label--first panel__label--animated panel__label--height"
            id="test-label"
            for="tabbordion-0-0"
            >Unchecked</label
        >
        <div
            id="test-content"
            aria-hidden="true"
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
        <div class="panel panel--checked panel--content panel--enabled panel--last panel--animated panel--height">
            <input
                type="checkbox"
                data-state="tabbordion"
                aria-controls="test-panel-content"
                aria-selected="true"
                checked=""
                id="test-panel"
                name="tabbordion-0"
                role="tab"
                value="test-value"
            /><label
                class="panel__label panel__label--checked panel__label--content panel__label--enabled panel__label--last panel__label--animated panel__label--height"
                id="test-panel-label"
                for="test-panel"
                >Checked</label
            >
            <div>
                <div
                    aria-hidden="false"
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
