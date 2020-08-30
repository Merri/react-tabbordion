# react-tabbordion
[![Version](http://img.shields.io/npm/v/react-tabbordion.svg)](https://www.npmjs.org/package/react-tabbordion)
[![Build Status](https://travis-ci.org/Merri/react-tabbordion.svg)](https://travis-ci.org/Merri/react-tabbordion)

With Tabbordion you can make your own components such as Tabs or Accordions! Tabbordion will manage the state while you
can focus on doing the styles the way you want.

**New in 2020** (version 2.0): complete modernization removing legacy React patterns and legacy browser support. The new
code targets evergreen browsers. Tabbordion supported IE8 and Opera Presto in versions prior to 2.0 (since 2015). As a
result of these efforts the uncompressed UMD bundle has shrunk from `31kB` to `19kB` despite added features!


## Things taken care for you

- State complexity: controlled mode, uncontrolled mode, universal rendering to support server render and hydration
- Keyboard usability and accessibility
- Re-renders are minimal
- Optional: BEM convention classNames with full control over result CSS classes
- Optional: accordion panel transitions
- Optional: [demo styles for BEM convention](./deno/static/demo/)

You can also find [complete documentation](./docs) including migration from v1.0 and v0.x.


## Comes in two flavors

You choose between class based components which provide an opioned solution, and a React hook that provides more freedom
regarding generated HTML structure.


### Sample code: uncontrolled components

```jsx
import { Tabbordion, TabPanel, TabLabel, TabContent } from 'react-tabbordion'

const blockElements = {
    content: 'tabs-content',
    panel: 'tabs-panel',
    label: 'tabs-title'
}

<Tabbordion blockElements={blockElements} className="tabs" name="unique-identifier">
    <TabPanel>
        <TabLabel>My title</TabLabel>
        <TabContent>
            <h2>Sample</h2>
            <p>Content</p>
        </TabContent>
    </TabPanel>
    <TabPanel>
        <TabLabel>Another title</TabLabel>
        <TabContent>
            <h2>Another Sample</h2>
            <p>Some other kind of content</p>
        </TabContent>
    </TabPanel>
</Tabbordion>
```

<details><summary>Output HTML</summary><p>
```html
<ul class="tabs" role="tablist">
    <li class="tabs-panel tabs-panel--checked tabs-panel--content tabs-panel--enabled tabs-panel--first">
        <input
            type="radio"
            data-state="tabbordion"
            aria-controls="unique-identifier-0-content"
            aria-selected="true"
            checked
            id="unique-identifier-0"
            name="unique-identifier"
            role="tab"
            value="0"
        >
        <label
            class="tabs-title tabs-title--checked tabs-title--content tabs-title--enabled tabs-title--first"
            id="unique-identifier-0-label"
            for="unique-identifier-0"
        >
            My title
        </label>
        <div
            aria-hidden="false"
            aria-labelledby="unique-identifier-0-label"
            class="tabs-content tabs-content--checked tabs-content--content tabs-content--enabled tabs-content--first"
            id="unique-identifier-0-content"
            role="tabpanel"
            tabindex="0"
        >
            <h2>Sample</h2>
            <p>Content</p>
        </div>
    </li>
    <li class="tabs-panel tabs-panel--unchecked tabs-panel--content tabs-panel--enabled tabs-panel--last">
        <input
            type="radio"
            data-state="tabbordion"
            aria-controls="unique-identifier-1-content"
            aria-selected="false"
            id="unique-identifier-1"
            name="unique-identifier"
            role="tab"
            value="1"
        >
        <label
            class="tabs-title tabs-title--unchecked tabs-title--content tabs-title--enabled tabs-title--last"
            id="unique-identifier-1-label"
            for="unique-identifier-1"
        >
            Another title
        </label>
        <div
            aria-hidden="true"
            aria-labelledby="unique-identifier-1-label"
            class="tabs-content tabs-content--unchecked tabs-content--content tabs-content--enabled tabs-content--last"
            id="unique-identifier-1-content"
            role="tabpanel"
            tabindex="-1"
        >
            <h2>Another Sample</h2>
            <p>Some other kind of content</p>
        </div>
    </li>
</ul>
```
</p></details>

You don't need to define `index` props, Tabbordion component will fill those automatically. However it is recommended to
define them when using controlled state.

These components generate HTML structure that is convenient to work with in that each panel is individual unit. This
makes it possible to easily swap the same HTML structure from tabs to accordion. So you can make the element change
appearance based on media queries purely through CSS. As a side-effect it is also entirely possible to style this HTML
in CSS-only manner so you would get fully functional tabs even without JS (note that issues with screen readers can't be
handled without JavaScript).


### Sample code: build your own components with hooks

```jsx
import React from 'react'
import { useTabbordion } from './react-tabbordion'

const TabbordionContext = React.createContext('tabbordion')

const Tabbordion = React.memo(function Tabbordion({ children, ...props }) {
    const tabbordion = useTabbordion(props)
    return (
        <TabbordionContext.Provider value={tabbordion}>
            {children}
        </TabbordionContext.Provider>
    )
})

const Tabs = React.memo(function Tabs(props) {
    const tabbordion = React.useContext(TabbordionContext)
    return <ol className="tabs-list" {...props} {...tabbordion.tabList} />
})

const Tab = React.memo(function Tab({ id, tab, ...props }) {
    const tabbordion = React.useContext(TabbordionContext)
    return (
        <li className="tabs-list__item" id={id}>
            <button className="tabs-button" {...props} {...tabbordion.tabButton(tab)} />
        </li>
    )
})

const Panel = React.memo(function Panel({ tab, ...props }) {
    const tabbordion = React.useContext(TabbordionContext)
    return <div className="tabs-panel" {...props} {...tabbordion.tabPanel(tab)} />
})

export default function UsageDemo() {
    return (
        <Tabbordion id="unique-identifier" initial="1">
            <Tabs aria-label="This is hooks demo">
                <Tab tab="1">First tab</Tab>
                <Tab tab="2">Second tab</Tab>
            </Tabs>
            <Panel tab="1">
                <h2>First panel</h2>
                <p>I have more content than the second panel.</p>
            </Panel>
            <Panel tab="2">
                <p>I have less content.</p>
            </Panel>
        </Tabbordion>
    )
}

```

With hooks you must always give a unique `tab` to link the generated tabs and panels. The greatest good part with hooks
is the power of customization you have in your fingertips: you can generate all sorts of different HTML structures that
fit the requirements you may have. Yet all the hard relations with attributes are handled for you so you don't need to
spend all your time learning all the details of WAI ARIA (although a frontend dev is recommended to study them).


## Installation

```
npm install react-tabbordion
yarn add react-tabbordion
```

UMD package is also provided. It provides `ReactTabbordion` to global in browser.


### Requirements

You may need a polyfill for [`ResizeObserver API`](https://caniuse.com/#feat=mdn-api_resizeobserver). If you wish to
support very old browsers you should use version 1.0.


## Developing

Once you have cloned the GitHub repo:

```
yarn install
```

You can then run test with `yarn test` or `yarn coverage`.

You can also start a demo localhost server using `yarn demo`, however you must have [Deno](https://deno.land/)
installed!
