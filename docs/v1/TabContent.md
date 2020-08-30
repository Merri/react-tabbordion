# `<TabContent />`

TabContent takes the role of wrapping content so that it can provide transitions when Tabbordion's `animateContent` is
set. The component renders different HTML/DOM tree when transitions are enabled, adding an additional wrapper element
that contains `height` in `style` and adds `overflow: hidden` as needed. `margin-top` is instead set to the inner
component.


## Props

Property          | Type          | Description
:-----------------|:--------------|:-----------
component         | component     | Defaults to `div`.
