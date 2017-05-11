## v0.5.6 - 2017-05-11
- Fix missing dist in npm


## v0.5.5 - 2017-05-11
- Fix incorrect main filename in package.json


## v0.5.4 - 2017-05-11
- Suddenly remember why I didn't use ES2015 syntax in earlier releases
- Fixes import


## v0.5.3 - 2017-05-11
- Move dist version to root, move source version to src
- Fixes imports where being used (edit: did not)


## v0.5.2 - 2017-05-11
- Update all npm packages to latest except jsdom
- Babel 6
- Webpack 2
- Use Node 6.10 on Travis CI
- Remember to update changelog before publishing a release

### Issues:
- PropTypes is not yet available on any CDN as a separate package, has to be included in the minified dist version


## v0.5.1 - 2017-05-11
- I have a changelog it seems
- Require `.isPanel` and `.isPanelChild` in components that depend on Tabbordion or Panel respectively.


## v0.5.0 - 2017-05-11
- Update to React 15.5
- Update to ES6 class syntax
- Update linting
- Fix minor bug when checking for `child.type`


## v0.4.3 - 2016-08-11
- Remember that you have a changelog
- Now React 15 friendly
- Fix: empty array no longer is counted as "having content"
- Fix: passing `undefined` as value to checked property is no longer understood as explicit `false`
- Fix: no longer pass extra Tabbordion related props to non-component children of Panel


## v0.4.1 - 2016-04-11
- Fix ARIA role="tab" in the wrong element.


## v0.4.0 - 2016-04-11
- Upgrade testing to Node 4.4 LTS only.
- Drop support for testing on Node 0.12 and earlier, because complicated.


## v0.3.3 - 2016-04-11
- Update outdated Travis config.


## v0.3.2 - 2016-04-11
- Fix linting.
- Update dependencies to fix builds.
- Remind yourself of not releasing when you are tired.
- Happened anyway.


## v0.3.0 - 2016-04-11
- Finally an update to React 0.14


## v0.2.5 - 2015-07-11

- Move React to devDependencies for now.


## v0.2.4 - 2015-07-06

- Fix an issue where render could block internal state from changing.
- Other minor bug fixes.


## v0.2.3 - 2015-07-05

- Allow Panel props to override ones set by Tabbordion [issue #2](https://github.com/Merri/react-tabbordion/issues/2)
- Add support for shorthand BEM modifier syntax
- Fix a bug where checked prop passed to Panel could be incorrect


## v0.2.2 - 2015-06-30

- Fix crashes with undefined or null children


## v0.2.1 - 2015-06-30

- Make isomorphic rendering possible
- More tests


## v0.2.0 - 2015-06-27

- Set up environment: linting, tests, Travis
- Add first set of tests
- Add support for animators (using height and marginTop)
- Change names of properties passed to non-Panel children of Tabbordion.
- Fix bug in Panel where between, first and last modifiers were applied when not visible.
- Fix incorrect order of merging classNames in Panel.
- Improve documentation.


## v0.1.1 - 2015-06-26

- Fix critical issue where not working with minified React due to differences in React's internals.


## v0.1.0 - 2015-06-26

- Initial release
