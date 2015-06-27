'use strict';

var React = require('react/addons'),
    jsdom = require('mocha-jsdom'),
    expect = require('chai').expect,
    Tabbordion = require('../').Tabbordion,
    Panel = require('../').Panel

var TestUtils = React.addons.TestUtils

describe('ReactTabbordion', function() {
    jsdom()

    it('should not set a class if no className is passed as prop', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Tabbordion, {})
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal(null)
    })
})

describe('ReactTabbordionPanel', function() {
    jsdom()

    it('should set a class even if no className is passed as prop', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {})
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal(
            'panel panel--unchecked panel--enabled panel--no-content'
        )
    })

    it('should retain a class if className is passed as prop', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, { className: 'test' })
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal(
            'test panel panel--unchecked panel--enabled panel--no-content'
        )
    })
})
