# `<TabLabel />`

This is a very simple component that renders a `label`. You can add any **inline elements** as children of a TabLabel.
Do not use `div`s and other block level elements as this is against the HTML spec. Although modern browsers don't really
break if you do invalid HTML.

The `label` is linked to the `input` element rendered by TabPanel, which means TabLabel is always a clickable state
changing element.


## Props

Property          | Type          | Description
:-----------------|:--------------|:-----------
component         | component     | Defaults to `label`.

You can use a custom component to render, but your custom component should also always render a `label`. You can use
your own composing component to add more elements in the middle if you don't like `label` being in the same level with
content.

```jsx
// wrap a header element around label
function MyLabel(props) {
    return (
        <header>
            <label {...props} />
        </header>
    )
}

...

<TabLabel component={MyLabel}>
    This is my clickable title
</TabLabel>
```
