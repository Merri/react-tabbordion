# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [2.0.0-beta.1] - 2020-08-31

- Publish with beta tag in npm


## [1.0.6] - 2020-08-31

- Update README to reflect upcoming v2
- Release new version of v1 to fix missing beta tag in first v2 beta release


## [2.0.0-beta.0] - 2020-08-30

Rewrite to use modern React class syntax and Context API thus removing use of deprecated React APIs and legacy browser
support. Compatible with v1, but your code may break if it has relied on undocumented edge cases or internal behavior.

### Added

- `useTabbordion` hook as an alternate option for creating your own components
- `Tabbordion.resetSSR()` for server side render support when not using external unique ID generator
- `<Tabbordion />`, `<TabPanel />`, `<TabLabel />`, `<TabContent />`:
  `forwardedRef` can be used to get reference to the actual DOM element
- `<Tabbordion />`: `onChange` now receives future panels (only a suggestion if in controlled state)
- `updatePanelsByToggle()` is exposed

### Changed

- `<Tabbordion />`: `onChange` is no longer required for controlled state
- `<Tabbordion />`: `onChange` will now trigger in uncontrolled state
- `<TabLabel />`: `onClick` prop will now do the default behavior, use `event.preventDefault()` to prevent it
- `bemClassName()` now ignores blockElements and modifiers that are not strings
- Components no longer need to be direct children of their parent component
- `null` and `undefined` are no longer considered equal in state equality checks
- Use [Microbundle](https://github.com/developit/microbundle) for bundling (had custom Webpack setup)
- Use [RITEway](https://github.com/ericelliott/riteway) for tests (had react-test-renderer, Mocha, Sinon, Enzyme, Chai)
- Use [Sucrase](https://github.com/alangpierce/sucrase) for faster tests/development (had Babel)
- Use `[fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal)` over custom implementation
- Use ResizeObserver over unnecessarily backwards compatible legacy DOM tricks

### Fixed

- `component` props use PropTypes.elementType as they should
- `<TabPanel />`: prefer given prop for `disabled` and `visible` over state from context
- `<TabLabel />`: has now ID and `<TabPanel />` refers to it via `aria-labelledby` instead of the input element


## [1.0.5] - 2019-10-11

- Update all packages
- Update to Babel 7


## [1.0.4] - 2018-02-02

### Changed

- Update React to 16.2 and test tools

### Added

- support for `React.Fragment`


## [1.0.2] - 2017-08-02

### Fixed

- `animateContent` being rendered to element rendered by `Tabbordion`
- `onPanels` not being triggered when in stateful mode


## [1.0.1] - 2017-08-02

### Fixed
- crash if a Tabbordion child does not have `type`


## [1.0.0] - 2017-08-02

This is a full rewrite of Tabbordion and throws away all legacy conventions in favor of pure components and other modern
React best practises and conventions.

**Remaining known issues:**

- `TabPanel`s must be direct children of `Tabbordion`
- `TabLabel`s and `TabContent`s must be direct children of `TabPanel`

In future it may become possible to have other components in the middle, thus removing the direct child requirement.

### Added

- Expose `bemClassName` method
- Remove support for extending BEM separator prefixed classes in `className`
- `<Tabbordion />`: allow controlling state via `panels` and `onPanels()`
- `<Tabbordion />`: force state to be correct for the selected `mode`
- `<Tabbordion />`: optimize performance by minimal renders
- `<TabContent />`: detects viewport resizes and transitions quickly accordingly

### Changed

- `<Tabbordion />`: replaced `initialIndex` with `initialPanels`
- `<Tabbordion />`: rename `classModifiers` -> `bemModifiers`
- `<Tabbordion />`: rename `classNames` -> `blockModifiers`
- `<Tabbordion />`: rename `classSeparator` -> `bemSeparator`
- `<Tabbordion />`: rename `tag` -> `component`
- `<Tabbordion />`: rename modifiers `visibleBetween`, `visibleFirst`, `visibleLast` -> `between`, `first`, `last`
- `<TabPanel />`: replaced prop `title` -> `TabLabel`
- `<TabPanel />`: all other `children` should now be within `TabContent`

### Removed

- `<Tabbordion />`: `contentTag` and `panelTag`
- `<Tabbordion />`: replaced `onAfterChange()` with `onPanels()`
- `<Tabbordion />`: `onBeforeChange()`
- `<Panel />`: separated to `<TabPanel />`, `<TabLabel />` and `<TabContent />`


## [0.5.7] - 2017-07-18

- Fix `React.DOM.div` deprecated warning
- Update npm dependencies


## [0.5.6] - 2017-05-11

- Fix missing dist in npm


## [0.5.5] - 2017-05-11

- Fix incorrect main filename in package.json


## [0.5.4] - 2017-05-11

- Suddenly remember why I didn't use ES2015 syntax in earlier releases
- Fixes import


## [0.5.3] - 2017-05-11

- Move dist version to root, move source version to src
- Fixes imports where being used (edit: did not)


## [0.5.2] - 2017-05-11

- Update all npm packages to latest except jsdom
- Babel 6
- Webpack 2
- Use Node 6.10 on Travis CI
- Remember to update changelog before publishing a release

**Issues:**

- PropTypes is not yet available on any CDN as a separate package, has to be included in the minified dist version


## [0.5.1] - 2017-05-11

- I have a changelog it seems
- Require `.isPanel` and `.isPanelChild` in components that depend on Tabbordion or Panel respectively.


## [0.5.0] - 2017-05-11

- Update to React 15.5
- Update to ES6 class syntax
- Update linting
- Fix minor bug when checking for `child.type`


## [0.4.3] - 2016-08-11

- Remember that you have a changelog
- Now React 15 friendly
- Fix: empty array no longer is counted as "having content"
- Fix: passing `undefined` as value to checked property is no longer understood as explicit `false`
- Fix: no longer pass extra Tabbordion related props to non-component children of Panel


## [0.4.1] - 2016-04-11

- Fix ARIA role="tab" in the wrong element.


## [0.4.0] - 2016-04-11

- Upgrade testing to Node 4.4 LTS only.
- Drop support for testing on Node 0.12 and earlier, because complicated.


## [0.3.3] - 2016-04-11

- Update outdated Travis config.


## [0.3.2] - 2016-04-11

- Fix linting.
- Update dependencies to fix builds.
- Remind yourself of not releasing when you are tired.
- Happened anyway.


## [0.3.0] - 2016-04-11

- Finally an update to React 0.14


## [0.2.5] - 2015-07-11

- Move React to devDependencies.


## [0.2.4] - 2015-07-06

- Fix an issue where render could block internal state from changing.
- Other minor bug fixes.


## [0.2.3] - 2015-07-05

- Allow Panel props to override ones set by Tabbordion [issue #2](https://github.com/Merri/react-tabbordion/issues/2)
- Add support for shorthand BEM modifier syntax
- Fix a bug where checked prop passed to Panel could be incorrect


## [0.2.2] - 2015-06-30

- Fix crashes with undefined or null children


## [0.2.1] - 2015-06-30

- Make isomorphic rendering possible
- More tests


## [0.2.0] - 2015-06-27

- Set up environment: linting, tests, Travis
- Add first set of tests
- Add support for animators (using height and marginTop)
- Change names of properties passed to non-Panel children of Tabbordion
- Fix bug in Panel where between, first and last modifiers were applied when not visible
- Fix incorrect order of merging classNames in Panel
- Improve documentation


## [0.1.1] - 2015-06-26

- Fix critical issue where not working with minified React due to differences in React's internals.


## [0.1.0] - 2015-06-26

- Initial release
