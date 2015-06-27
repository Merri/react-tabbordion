# react-tabbordion <img alt="Travis CI" src="https://travis-ci.org/Merri/react-tabbordion.svg" />

Provides base for handling state and styles for technically similar components such as tabs, accordions, option lists,
multiselect lists and so on.

Solves most CSS issues in elegant BEM'ish conventions. You have total control over style: only one globally required
rule!

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

This hides native HTML input elements so that they remain accessible. While we are at accessibility the component also
includes ARIA attributes. You can also add CSS-only (= JS disabled) support by using `:checked` in your stylesheets.


## Demo and Installation

[View Tabbordion demo](https://merri.github.io/react-tabbordion/)

```
npm install --save react-tabbordion
```

### Usage example and sample output

```js
var classNames = {
  content: 'tabs-content',
  panel: 'tabs-panel',
  title: 'tabs-title'
}

<Tabbordion className="tabs" classNames={classNames} initialIndex={0} name="tabs">
  <Panel title={<span>My title</span>}>
    <h2>Sample</h2>
    <p>Content</p>
  </Panel>
  <Panel title={<span>Another title</span>}>
    <h2>Another Sample</h2>
    <p>Some other kind of content</p>
  </Panel>
</Tabbordion>
```

**Output:**

```html
<ul role="tablist" class="tabs tabs--active-count-1 tabs--count-2">
  <li aria-expanded="true" aria-selected="true" class="tabs-panel tabs-panel--checked tabs-panel--content tabs-panel--first">
    <input aria-controls="panel-tabs-0" checked data-state="tabbordion" id="tabs-0" name="tabs" role="tab" value="0" type="radio" />
    <label class="tabs-title tabs-title--checked tabs-title--content tabs-title--first" id="label-tabs-0" for="tabs-0">
      <span>My title</span>
    </label>
    <div aria-labelledby="tabs-0" class="tabs-content tabs-content--checked tabs-content--first" id="panel-tabs-0" role="tabpanel">
      <h2>Sample</h2>
      <p>Content</p>
    </div>
  </li>
  <li aria-expanded="false" aria-selected="false" class="tabs-panel tabs-panel--unchecked tabs-panel--content tabs-panel--last">
    <input aria-controls="panel-tabs-1" data-state="tabbordion" id="tabs-1" name="tabs" role="tab" value="1" type="radio" />
    <label class="tabs-title tabs-title--unchecked tabs-title--content tabs-title--last" id="label-tabs-1" for="tabs-1">
      <span>Another title</span>
    </label>
    <div aria-labelledby="tabs-1" class="tabs-content tabs-content--unchecked tabs-content--last" id="panel-tabs-1" role="tabpanel">
      <h2>Another Sample</h2>
      <p>Some other kind of content</p>
    </div>
  </li>
</ul>
```


## Tabbordion
This is the main controller component. It handles state and passes properties to all children.

Property          | Type          | Description
:-----------------|:--------------|:-----------
animateContent    | string/false  | Default to false. Can be 'height' or 'marginTop'. Read more below.
initialIndex      | number        | Defaults to null. Sets the Panel that is active on initial render.
mode              | string        | Can be single, toggle or multiple. Read more below.
onBeforeChange    | func          | Gets new state and old state as objects in arguments. Read more below.
onChange          | func          | Gets new state object as argument. Triggered before render.
onAfterChange     | func          | Gets new state object as argument. Triggered after render.
classModifiers    | object        | Object containing strings to use as class modifiers in Panel's classes.
classNames        | object        | Object containing strings to use as class block-elements in Panel's classes.
classSeparator    | string        | Separator string to use between BEM block-elements and modifiers.
name              | string        | Name attribute in Panel's hidden input element to group them. Also used for IDs.
contentTag        | string        | Tag to use in Panel's content element. Defaults to div.
panelTag          | string        | Tag to use in Panel's root element. Defaults to li.
tag               | string        | Tag to use in Tabbordion's root element. Defaults to ul.

### About classes

Tabbordion uses minimal BEM style in it's classes. This means if you name panel element as `derp`, you will get
`className="derp derp--checked"` when the panel is active. Output can be fully customized using `classModifiers`,
`classNames` and `classSeparator`.

```js
// classNames defaults
{
  panel: 'panel',
  state: 'panel__state',
  title: 'panel__title',
  content: 'panel__content',
  animator: 'panel__animator'
}

// classModifiers defaults
{
  animated: 'animated',
  checked: 'checked',
  content: 'content',
  disabled: 'disabled',
  enabled: 'enabled',
  noContent: 'no-content',
  unchecked: 'unchecked',
  visibleBetween: 'between',
  visibleFirst: 'first',
  visibleLast: 'last'
}
```

Say you have three panels. First one is active. `animateContent` is set to 'height'. Following classes are generated:

```js
panel1.className === 'panel panel--animated panel--checked panel--content panel--enabled panel--first'
panel2.className === 'panel panel--animated panel--unchecked panel--content panel--enabled panel--between'
panel3.className === 'panel panel--animated panel--unchecked panel--content panel--enabled panel--last'
```

### About animateContent

Enabling this will do two things:

1. A new `panel__animated` element is added to wrap `panel__content`.
2. `height` of `panel__animated` changes **or** `margin-top` of `panel__content` changes when checked/unchecked.

You can use transitions in CSS to get smooth animations. Check
[demo/accordion.css](https://github.com/Merri/react-tabbordion/blob/gh-pages/demo/accordion.css) for an example.

### About modes

There are three modes: single, toggle and multiple.

With **single** there is always one panel open. This behavior is like a normal Tabs or Radio option list component.

With **toggle** there may be one panel open. Or all can be closed. This behavior is like a normal Accordion component.

With **multiple** any panel may be open or closed. This behavior is like a Checkbox option list component.

### About onBeforeChange

This function is triggered before a change triggered by user is applied. Two objects are received in arguments:
newState and oldState. Both have two keys: checked and index.

**checked** is an array of booleans and contains the state of each Panel inside Tabbordion.

**index** is the latest active Panel index, or null if none is active.

The function may return a modified object in the same format and this new state will be used instead.

### About inheritance

Tabbordion does not make use of classModifiers, classNames, name, contentTag or panelTag. These are passed directly to
child Panels.

The following props are provided for each direct child of a Tabbordion that is **not a Panel**:

- panelName
- panelSelectedChecked
- panelSelectedIndex
- setPanelIndex

You can use this information to make customized components that depend on Tabbordion.


## Panel

This component generates native HTML radio or checkbox inputs and labels, and content wrapper element if needed.

Property          | Type          | Description
:-----------------|:--------------|:-----------
animateContent    | string/false  | Inherited.
classModifiers    | object        | Inherited.
classNames        | object        | Inherited.
classSeparator    | string        | Inherited.
name              | string        | Inherited.
contentTag        | string        | Inherited.
tag               | string        | Inherited (from Tabbordion's panelTag).

Property          | Type          | Description
:-----------------|:--------------|:-----------
checked           | bool          | Set by Tabbordion.
index             | number        | Set by Tabbordion.
isBetween         | bool          | Set by Tabbordion. Is visible and between other visible elements.
isFirst           | bool          | Set by Tabbordion. Is the first visible element.
isLast            | bool          | Set by Tabbordion. Is the last visible element.
selectedChecked   | array         | Set by Tabbordion. Current active Panels.
selectedIndex     | number/null   | Set by Tabbordion. Latest active Panel, or null if none active.
setIndex          | func          | Set by Tabbordion. Toggles given index.
type              | string        | Set by Tabbordion. 'checkbox' or 'radio'.

Property          | Type          | Description
:-----------------|:--------------|:-----------
disabled          | bool          | Defaults to false. Should the Panel be disabled?
title             | node          | Content to be rendered inside the label element.
visible           | bool          | Defaults to true. Should the Panel be visible?

As you can see most of Panel's props are set by a parent Tabbordion.

The following props are provided for each direct child of a Panel:

- isPanelChecked
- isPanelVisible
- panelIndex
- panelName
- panelSelectedChecked
- panelSelectedIndex
- setPanelIndex

You can use this information to make customized components that depend on Tabbordion's Panel.


## Developing

```
git clone git@github.com:merri/react-tabbordion.git
cd react-tabbordion
npm install
npm test
```
