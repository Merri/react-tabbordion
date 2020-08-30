# BEM convention as used by Tabbordion

Yes, this component **does not** follow the trends and instead gives **you** the power of CSS! You can customize the
generated `className`s to fit your needs and all styling is controlled via CSS. Only when transitions occur there are
some `style` set into related DOM elements (and you can select whether it will be `height` or `marginTop`).

Tabbordion takes in three BEM related props: `bemModifiers`, `bemSeparator` and `blockElements`. These props are used to
determine the final `className` of `TabPanel`, `TabLabel´ and `TabContent`. They have no effect on Tabbordion's
`className`.


## `blockElements`

These set the block element names for child components controlled by Tabbordion. Default values:

```js
{
    animator: 'panel__animator',
    content: 'panel__content',
    label: 'panel__label',
    panel: 'panel',
}
```

This means that `TabPanel` would get a `className="panel"`, while `TabLabel` would have `className="panel__label"`. You
can disable BEM behavior by giving an empty object or to a single component by leaving a value empty or undefined.

Animator is an extra element that is wrapped around content element when `animateContent` is set.


## `bemModifiers`

This is an object that determines modifier names for specific states. These are the defaults:

```js
{
    animated: 'animated',
    between: 'between',
    checked: 'checked',
    content: 'content',
    disabled: 'disabled',
    enabled: 'enabled',
    first: 'first',
    hidden: 'hidden',
    last: 'last',
    noContent: 'no-content',
    unchecked: 'unchecked',
}
```

For example, if a panel is the active panel it will have modifier `checked` active and as part of the `className`.
Therefore effectively `TabPanel`'s `className` would be `"panel panel--checked"`. There are often multiple modifiers
active at the same time so you will see `className`s like
`"panel panel--animated panel--between panel--checked panel--enabled"`.


## `bemSeparator`

By default block elements are separated from modifiers by using `--`, which is the default value. You may change this to
fit your own conventions. For example at some point some BEM conventions used a single `_` instead of `--`.


## `className`

You can still set `className` to `TabPanel`, `TabLabel` or `TabContent`. It will be simply appended after the classes
generated via `BEM` convention.

Note that unlike v0 Tabbordion you can no longer expand BEM modifiers via `className`: instead, use `modifiers` prop.


## `modifiers`

You can add custom flavor to Tabbordion panels, labels and content by using this prop:

```jsx
<TabPanel modifiers={['custom', 'another']}>
    <TabLabel className="WTF">
```

Which in the label will expand to `className`: `panel__label panel__label--custom panel__label--another WTF`.


## Generating Tabbordion BEM in your own components

```js
import { bemClassName } from 'react-tabbordion'

...

// takes in blockElements, name of block element to render, modifiers and a separator
const className = bemClassName({ custom: 'custom' }, 'custom', ['modifier1', 'modifier2'], '--')
```

You can also make your component aware of Tabbordion's BEM **and** panel state!

```jsx
import { bemClassName } from 'react-tabbordion'

class Custom extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        this.context.bem.subscribe(this)
        this.context.tabbordionPanel.subscribe(this)
    }

    componentWillUnmount() {
        this.context.bem.unsubscribe(this)
        this.context.tabbordionPanel.unsubscribe(this)
    }

    render() {
        const { bemSeparator, blockElements } = this.context.bem.getState()
        const { modifiers } = this.context.tabbordionPanel.getState()
        const { className, ...props } = this.props

        const customBem = bemClassName(blockElements, 'custom', modifiers, bemSeparator)

        return (
            <div
                className={!customBem ? className : (className ? `${customBem} ${className}` : customBem)}
                {...props}
            />
        )
    }
}

Custom.contextTypes = {
    bem: PropTypes.object,
    tabbordionPanel: PropTypes.object,
}

Custom.propTypes = {
    className: PropTypes.string,
}

export default Custom
```

Note that this isn't considered the cleanest way to use React's `context` and React's `context` may change in the future
due to having a buggy implementation (which is why you can see those subscribe, unsubscribe and getState lines).
Tabbordion's own logic makes sure that render is called only if changes in state are detected.
