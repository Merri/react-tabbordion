import { describe } from 'riteway'
import React from 'react'

import { createClick, renderToHtml, shallowSimulateClick } from '../utils.test'
import { defaultBemModifiers, defaultBemSeparator, defaultBlockElements } from '../../lib/bem'
import { TabLabelContext } from '../../components/Tabbordion'
import { TabLabel } from '../..'

describe('TabLabel', async (assert) => {
    {
        const html = renderToHtml(<TabLabel />) //
        assert({
            given: 'nothing',
            should: 'render a label',
            actual: html,
            expected: '\n<label></label>\n',
        })
    }

    {
        const html = renderToHtml(<TabLabel className="test-class" id="test-id" htmlFor="test-for" tabIndex={0} />) //
        assert({
            given: 'basic attributes',
            should: 'render a label with basic attributes',
            actual: html,
            expected: '\n<label tabindex="0" class="test-class" id="test-id" for="test-for"></label>\n',
        })
    }

    {
        const html = renderToHtml(<TabLabel component="div" />) //
        assert({
            given: 'div as component',
            should: 'render a div',
            actual: html,
            expected: '\n<div></div>\n',
        })
    }

    {
        const html = renderToHtml(<TabLabel>Test</TabLabel>) //
        assert({
            given: 'children',
            should: 'render children',
            actual: html,
            expected: '\n<label>Test</label>\n',
        })
    }

    const labelContext = {
        animateContent: 'height',
        bemModifiers: defaultBemModifiers,
        bemSeparator: defaultBemSeparator,
        blockElements: defaultBlockElements,
        checked: true,
        contentId: 'content-id',
        disabled: false,
        hasContent: true,
        id: 'id',
        index: 0,
        inputId: 'input-id',
        labelId: 'label-id',
        modifiers: ['checked', 'content', 'enabled', 'first', 'last'],
        visible: true,
    }

    {
        const html = renderToHtml(
            <TabLabelContext.Provider value={labelContext}>
                <TabLabel />
            </TabLabelContext.Provider>
        ) //
        assert({
            given: 'context',
            should: 'render attributes with values derived from context',
            actual: html,
            expected: `
<label
    class="panel__label panel__label--checked panel__label--content panel__label--enabled panel__label--first panel__label--last"
    id="label-id"
    for="input-id"
></label>
`,
        })
    }

    {
        const html = renderToHtml(
            <TabLabelContext.Provider value={labelContext}>
                <TabLabel className="test-class" id="test-id" htmlFor="test-for" tabIndex={0} />
            </TabLabelContext.Provider>
        ) //
        assert({
            given: 'context and attributes',
            should: 'in conflict render context attributes over given attributes',
            actual: html,
            expected: `
<label
    tabindex="0"
    class="panel__label panel__label--checked panel__label--content panel__label--enabled panel__label--first panel__label--last test-class"
    id="label-id"
    for="input-id"
></label>
`,
        })
    }

    {
        const onClick = createClick()
        shallowSimulateClick(TabLabel, { onClick })
        assert({
            given: 'label is clicked',
            should: 'trigger onClick handler',
            actual: onClick.clickCount,
            expected: 1,
        })
    }

    {
        const onClick = createClick()
        const onToggle = createClick()
        shallowSimulateClick(TabLabel, { children: 'Test' }, TabLabelContext, { onToggle })
        assert({
            given: 'label is clicked when context with click handler is provided',
            should: 'trigger onToggle handler',
            actual: onToggle.clickCount,
            expected: 1,
        })
    }

    {
        const onClick = createClick()
        const onToggle = createClick()
        shallowSimulateClick(TabLabel, { children: 'Test', onClick }, TabLabelContext, { onToggle })
        assert({
            given: 'label is clicked when context and click handlers are provided',
            should: 'trigger both onClick and onToggle handlers',
            actual: { onClick: onClick.clickCount, onToggle: onToggle.clickCount },
            expected: { onClick: 1, onToggle: 1 },
        })
    }

    {
        const onClick = createClick((event) => void event.preventDefault())
        const onToggle = createClick()
        shallowSimulateClick(TabLabel, { children: 'Test', onClick }, TabLabelContext, { onToggle })
        assert({
            given: 'onClick calls preventDefault',
            should: 'not trigger onToggle',
            actual: { onClick: onClick.clickCount, onToggle: onToggle.clickCount },
            expected: { onClick: 1, onToggle: 0 },
        })
    }
})
