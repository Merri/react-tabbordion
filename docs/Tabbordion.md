# `<Tabbordion />`

Tabbordion is the main container component for managing state and passing props to the other components that are aware
of Tabbordion.

The design goal of Tabbordion is to make things as easy as possible for the dev: you can leave very critical information
out and the component will do it's best to figure out a valid, working way to behave properly and render valid HTML
syntax.

Unlike previous versions of this component the new v1.0 allows your component or a Redux store to be the main source of
state!

Note: You can find info on changes at the bottom of this document if you have just jumped to version 1.0 from an earlier
version of Tabbordion.


## Props

Property          | Type          | Description
:-----------------|:--------------|:-----------
animateContent    | string/false  | Default to false. Can be 'height' or 'marginTop'. Read more below.
component         | string        | Component used to render Tabbordion. Defaults to `ul`.
bemModifiers      | object        | Object containing strings to use as BEM modifiers in child component classes.
bemSeparator      | string        | Separator string to use between BEM block-elements and modifiers.
blockElements     | object        | Object containing strings to use as class block-elements in child component classes.
initialPanels     | array         | Can provide initial panel information for `stateful` usage of Tabbordion.
mode              | string        | Can be `single`, `toggle` or `multiple`. Read more below.
name              | string        | Name attribute in panel's hidden input element to group them. Also used to generate IDs.
onChange          | func          | Gets info on clicked panel index and also tells the current mode.
onPanels          | func          | Gets new `panels` that can be used to store the state outside Tabbordion.
panels            | array         | Active state to render. Read more below.

Read [bem.md](./bem.md) to get familiar with Tabbordion's take on BEM convention.

Any other props are passed directly to the rendered `component` element.


### Controlling state

By default Tabbordion is the host of it's state. However by using `onPanels` and `panels` you can store the state where
you please, making Tabbordion a stateless component. In addition you can control state changes manually via `onChange`
if you so wish.

The typical implementation of `onPanels` is very simple if state is held in another component:

```
onPanels(panels) {
    this.setState({ panels })
}
```

Tabbordion is very smart about it's state and by default does all it can to make sure it's state is valid based on the
current `mode` setting.

`initialPanels` and `panels` are an array of objects with four properties:

- `checked`
- `disabled`
- `index`
- `visible`

Note: `initialPanels` is ignored if `panels` is set! It is intended to be used only in stateful use (whereas `panels`
trigger the `stateless` use).

Note: `initialPanels` doesn't need to be the whole state, you can also provide only the data that matters such as
`[{ checked: true, index: 1 }]` which would make the second panel active on initial render.


### Modes

Tabbordion supports three modes:

- `single` which behaves like a regular Tabs like component: keeping always one tab active.
- `toggle` which behaves like a regular Accordion like component: allowing none or any one tab active.
- `multiple` which behaves like multi select list: none or some or even all tabs active.

In HTML terms `single` and `toggle` are equivalent of radio selects, while `multiple` is like checkboxes.


### Transitions via `animateContent`

Tabbordion provides vertical transitioning. There are two modes: `height` and `marginTop`. Of these `height` is probably
the better choice as transitions via `marginTop` can sometimes result in odd side effect behavior when state changes.
`height` is visually less distracting.


## Porting from v0.X to v1.0

Here are the most notable changes:

- `classModifiers`, `classSeparator` and `classNames` have been renamed as `bemModifiers`, `bemModifier` and
`blockElements`.
- `tag` has been renamed as `component`
- Modifiers `visibleBetween`, `visibleFirst` and `visibleLast` renamed as `between`, `first` and `last` respectively
- **REMOVED**: `contentTag`
- **REMOVED**: `initialIndex`
- **REMOVED**: `onAfterChange`
- **REMOVED**: `onBeforeChange`
- **REMOVED**: `panelTag`

If you have been using `initialIndex` you can still set initial active panels manually:

```jsx
// old style
<Tabbordion initialIndex={1}>
// new style
<Tabbordion initialPanels={[{ checked: true, index: 1 }]}>
```

Or you can take control of the whole state if you want:

```jsx
onChange({ index, mode }) {
    // this method allows you to manually control what to do with the state based on changes triggered by user
    // you can call `setState` to set `panels`
}

onPanels(panels) {
    // this method receives valid state for the current mode and reflects the state as Tabbordion wants it to be
    this.setState({ panels })
}

render() {
    const { panels } = this.state

    return (
        <Tabbordion panels={panels} onChange={this.onChange} onPanels={this.onPanels}>
            ...
        </Tabbordion>
    )
}
```
