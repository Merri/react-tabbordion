import { describe } from 'riteway'
import React from 'react'

import { renderToHtml } from '../utils.test'
import { defaultBemModifiers, defaultBemSeparator, defaultBlockElements } from '../../lib/bem'
import { TabContentContext } from '../../components/Tabbordion'
import { TabContent } from '../..'

describe('TabContent', async (assert) => {
    {
        const html = renderToHtml(<TabContent />) //
        assert({
            given: 'nothing',
            should: 'render a div',
            actual: html,
            expected: '\n<div aria-hidden="true" role="tabpanel" tabindex="-1"></div>\n',
        })
    }

    {
        const html = renderToHtml(
            <TabContent aria-hidden="false" role="presentational" tabIndex={0}>
                Content
            </TabContent>
        ) //
        assert({
            given: 'props controlled by state',
            should: 'ignore the props',
            actual: html,
            expected: '\n<div aria-hidden="true" role="tabpanel" tabindex="-1">Content</div>\n',
        })
    }

    {
        const html = renderToHtml(<TabContent className="test-class" id="test-id" style={{ background: 'black' }} />) //
        assert({
            given: 'common props',
            should: 'render them as attributes',
            actual: html,
            expected:
                '\n<div id="test-id" aria-hidden="true" class="test-class" role="tabpanel" style="background: black" tabindex="-1"></div>\n',
        })
    }

    const contentContext = {
        animateContent: false,
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
        modifiers: ['test'],
        visible: true,
    }
    const heightContext = { ...contentContext, animateContent: 'height' }
    const marginTopContext = { ...contentContext, animateContent: 'marginTop' }

    {
        const html = renderToHtml(
            <TabContentContext.Provider value={contentContext}>
                <TabContent />
            </TabContentContext.Provider>
        ) //
        assert({
            given: 'context',
            should: 'render attributes with values derived from context',
            actual: html,
            expected: `
<div
    aria-hidden="false"
    aria-labelledby="label-id"
    class="panel__content panel__content--test"
    id="content-id"
    role="tabpanel"
    tabindex="0"
></div>
`,
        })
    }

    {
        const html = renderToHtml(
            <TabContentContext.Provider value={heightContext}>
                <TabContent />
            </TabContentContext.Provider>
        ) //
        assert({
            given: 'context with animateContent="height"',
            should: 'render with animator element',
            actual: html,
            expected: `
<div
    aria-hidden="false"
    aria-labelledby="label-id"
    class="panel__animator panel__animator--test"
    id="content-id"
    role="tabpanel"
    style="height: auto; overflow: hidden; -webkit-transition: none; transition: none"
    tabindex="0"
>
    <div class="panel__content panel__content--test"></div>
</div>
`,
        })
    }

    {
        const html = renderToHtml(
            <TabContentContext.Provider value={marginTopContext}>
                <TabContent />
            </TabContentContext.Provider>
        ) //
        assert({
            given: 'context with animateContent="marginTop"',
            should: 'render with animator element',
            actual: html,
            expected: `
<div
    aria-hidden="false"
    aria-labelledby="label-id"
    class="panel__animator panel__animator--test"
    id="content-id"
    role="tabpanel"
    style="overflow: hidden; -webkit-transition: none; transition: none"
    tabindex="0"
>
    <div
        class="panel__content panel__content--test"
        style="margin-top: 0px; -webkit-transition: none; transition: none"
    ></div>
</div>
`,
        })
    }

    {
        const html = renderToHtml(
            <TabContentContext.Provider value={{ ...heightContext, checked: false }}>
                <TabContent />
            </TabContentContext.Provider>
        ) //
        assert({
            given: 'context with animateContent="height" and checked={false}',
            should: 'render with animator element',
            actual: html,
            expected: `
<div
    aria-hidden="true"
    aria-labelledby="label-id"
    class="panel__animator panel__animator--test"
    id="content-id"
    role="tabpanel"
    style="height: 0px; overflow: hidden; -webkit-transition: none; transition: none"
    tabindex="-1"
>
    <div class="panel__content panel__content--test"></div>
</div>
`,
        })
    }

    {
        const html = renderToHtml(
            <TabContentContext.Provider value={{ ...marginTopContext, checked: false }}>
                <TabContent />
            </TabContentContext.Provider>
        ) //
        assert({
            given: 'context with animateContent="marginTop" and checked={false}',
            should: 'render with animator element',
            actual: html,
            expected: `
<div
    aria-hidden="true"
    aria-labelledby="label-id"
    class="panel__animator panel__animator--test"
    id="content-id"
    role="tabpanel"
    style="overflow: hidden; -webkit-transition: none; transition: none"
    tabindex="-1"
>
    <div
        class="panel__content panel__content--test"
        style="margin-top: -50000px; -webkit-transition: none; transition: none"
    ></div>
</div>
`,
        })
    }
})
