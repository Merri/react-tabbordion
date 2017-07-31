# `<TabPanel />`

TabPanel handles state of a single Tabbordion panel. Technically in the background TabPanel takes care of rendering
`<input type="radio" />` or `<input type="checkbox" />` which reflects the active state of the panel, while the
remaining children can be a mixture of TabLabels, TabContents and other React components. The most common and most sane
pattern is to have a TabLabel followed by a TabContent.

In future it may become possible to nest TabLabels and TabContents further down the TabPanel tree; for the moment you
must always place these components as direct children of TabPanel. Throw an issue if you feel you need this feature and
have use case for it.

## Props

Property          | Type          | Description
:-----------------|:--------------|:-----------
index             | number        | Index of panel. You can have panels out-of-order.
modifiers         | array         | Array of custom BEM modifiers (strings).
visible           | boolean       | Is the panel visible.

The given custom modifiers also have effect to `className`s generated in TabLabel and TabContent elements.

In addition the component supports the usual `input` related props, which you can even use to override state given by
Tabbordion:

Property          | Type          | Description
:-----------------|:--------------|:-----------
checked           | boolean       | Checked of `input` element.
disabled          | boolean       | Disabled of `input` element.
id                | string        | Id of `input` element. Setting this one can be helpful for tests.
name              | string        | Name of `input` element.
type              | string        | Type of `input` element.
value             | string        | Value of `input` element.

Most commonly you probably only want to set the `id` and maybe `value`.
