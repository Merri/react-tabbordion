# react-tabbordion
[![Version](http://img.shields.io/npm/v/react-tabbordion.svg)](https://www.npmjs.org/package/react-tabbordion)
[![Build Status](https://travis-ci.org/Merri/react-tabbordion.svg)](https://travis-ci.org/Merri/react-tabbordion)

**Tabbordion** is a component for managing active state between multiple elements. You can make anything out of it:

- Tabs component
- Accordion component
- Multi select list component
- Option component
- List of options
- List of checkboxes

Essentially Tabbordion handles the state, gives tools for complete CSS based styling, manages WAI ARIA and provides a
great HTML/DOM structure to work with. Tabbordion is universal and therefore works both server side and client side!

You have complete control over the generated classNames, you can even disable generating them if you wish to. There is
only one required style:

```css
[data-state="tabbordion"] {
    clip: rect(0 0 0 0);
    height: 1px;
    position: absolute;
    position: fixed;
    width: 1px;
    z-index: -1;
}
```

This will hide the input elements so that they remain accessible via keyboard on all browsers.

[You're welcome to steal the demo styles.](./demo/)


## Demo and Installation

[View Tabbordion demo](https://merri.github.io/react-tabbordion/)

```
npm install react-tabbordion
```

### Documentation

[It exists.](./docs/)

### Usage example and sample output

```jsx
import { Tabbordion, TabPanel, TabLabel, TabContent } from 'react-tabbordion'

const blockElements = {
    content: 'tabs-content',
    panel: 'tabs-panel',
    label: 'tabs-title'
}

<Tabbordion blockElements={blockElements} className="tabs" name="tabs">
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

**Output:**

```html
<ul role="tablist" class="tabs">
    <li aria-expanded="true" aria-selected="true" class="tabs-panel tabs-panel--checked tabs-panel--content tabs-panel--first" role="tab">
        <input aria-controls="panel-tabs-0" checked data-state="tabbordion" id="tabs-0" name="tabs" value="0" type="radio" />
        <label class="tabs-title tabs-title--checked tabs-title--content tabs-title--first" id="label-tabs-0" for="tabs-0">
            My title
        </label>
        <div aria-labelledby="tabs-0" class="tabs-content tabs-content--checked tabs-content--first" id="panel-tabs-0" role="tabpanel">
            <h2>Sample</h2>
            <p>Content</p>
        </div>
    </li>
    <li aria-expanded="false" aria-selected="false" class="tabs-panel tabs-panel--unchecked tabs-panel--content tabs-panel--last" role="tab">
        <input aria-controls="panel-tabs-1" data-state="tabbordion" id="tabs-1" name="tabs" value="1" type="radio" />
        <label class="tabs-title tabs-title--unchecked tabs-title--content tabs-title--last" id="label-tabs-1" for="tabs-1">
            Another title
        </label>
        <div aria-labelledby="tabs-1" class="tabs-content tabs-content--unchecked tabs-content--last" id="panel-tabs-1" role="tabpanel">
            <h2>Another Sample</h2>
            <p>Some other kind of content</p>
        </div>
    </li>
</ul>
```


## Developing

```
npm install
npm run build
npm test
```

There is no development environment provided that you could run in your localhost. I'm a bit old fashioned here, being
able to write things without all the cool tools. Sorry for being such a guy.
