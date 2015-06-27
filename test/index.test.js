'use strict'

var React = require('react/addons'),
    jsdom = require('mocha-jsdom'),
    expect = require('chai').expect,
    Tabbordion = require('../').Tabbordion,
    Panel = require('../').Panel

var TestUtils = React.addons.TestUtils

function checkChildrenTags(childNodes, tags) {
    expect(childNodes.length).to.equal(tags.length)

    for (var index = 0; index < tags.length; index++) {
        expect(childNodes[index].nodeName).to.equal(tags[index])
    }
}

describe('Tabbordion', function() {
    jsdom()

    it('should not set a class if no className is passed as prop', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Tabbordion, {})
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal(null)
    })

    it('should extend a class if className is passed as a prop', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Tabbordion, { className: 'test' })
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal(
            'test test--checked-count-0 test--count-0'
        )
    })

    it('should retain additional class identifiers if space separated className is passed as a prop', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Tabbordion, { className: 'test test--test' })
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal(
            'test test--checked-count-0 test--count-0 test--test'
        )
    })

    it('should use tag passed as a prop', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Tabbordion, { tag: 'span' })
        )

        expect(React.findDOMNode(rendered).nodeName).to.equal('SPAN')
    })
})

describe('Panel', function() {
    jsdom()

    var title = React.DOM.span({}, 'Test title')

    it('should contain two child elements if no children passed', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, { title: title })
        )

        checkChildrenTags(React.findDOMNode(rendered).childNodes, ['INPUT', 'LABEL'])
    })

    it('should render title prop inside label', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, { title: title })
        )

        var childNodes = React.findDOMNode(rendered).childNodes

        expect(childNodes[1].firstChild).to.equal(childNodes[1].lastChild)
        expect(childNodes[1].firstChild.nodeName).to.equal('SPAN')
        expect(childNodes[1].firstChild.innerHTML).to.equal('Test title')
    })

    it('should contain three child elements if children passed', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, { title: title }, React.DOM.span({}))
        )

        var childNodes = React.findDOMNode(rendered).childNodes

        checkChildrenTags(childNodes, ['INPUT', 'LABEL', 'DIV'])

        expect(childNodes[2].firstChild).to.equal(childNodes[2].lastChild)
        expect(childNodes[2].firstChild.nodeName).to.equal('SPAN')
        expect(childNodes[2].firstChild.innerHTML).to.equal('')
    })

    it('should use a default class if no className is passed as prop', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, { title: title })
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal(
            'panel panel--unchecked panel--enabled panel--no-content'
        )
    })

    it('should add className if passed as prop', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, { className: 'test', title: title })
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal(
            'panel panel--unchecked panel--enabled panel--no-content test'
        )
    })

    it('should reflect given properties in className, --between should override --first and --last', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {
                checked: true,
                disabled: true,
                isBetween: true,
                isFirst: true,
                isLast: true,
                title: title
            }, React.DOM.span({}))
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal(
            'panel panel--checked panel--disabled panel--between panel--content'
        )

        rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {
                checked: true,
                disabled: true,
                isBetween: false,
                isFirst: true,
                isLast: true,
                title: title
            }, React.DOM.span({}))
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal(
            'panel panel--checked panel--disabled panel--first panel--last panel--content'
        )
    })

    it('should use only existing classModifiers', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {
                classModifiers: {},
                title: title
            }, React.DOM.span({}))
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal('panel')

        var childNodes = React.findDOMNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal('panel__state')
        expect(childNodes[1].getAttribute('class')).to.equal('panel__title')
        expect(childNodes[2].getAttribute('class')).to.equal('panel__content')

        rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {
                classModifiers: {
                    unchecked: 'test'
                },
                title: title
            }, React.DOM.span({}))
        )

        expect(React.findDOMNode(rendered).getAttribute('class')).to.equal('panel panel--test')

        childNodes = React.findDOMNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal('panel__state panel__state--test')
        expect(childNodes[1].getAttribute('class')).to.equal('panel__title panel__title--test')
        expect(childNodes[2].getAttribute('class')).to.equal('panel__content panel__content--test')
    })

    it('should apply default classes and modifiers from classNames and classModifiers props to children', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, { title: title }, React.DOM.span({}))
        )

        var childNodes = React.findDOMNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal(
            'panel__state panel__state--unchecked panel__state--enabled panel__state--content'
        )

        expect(childNodes[1].getAttribute('class')).to.equal(
            'panel__title panel__title--unchecked panel__title--enabled panel__title--content'
        )

        expect(childNodes[2].getAttribute('class')).to.equal(
            'panel__content panel__content--unchecked panel__content--enabled'
        )
    })

    it('should use only existing classNames on children', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {
                classNames: {},
                title: title
            }, React.DOM.span({}))
        )

        var childNodes = React.findDOMNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal(null)
        expect(childNodes[1].getAttribute('class')).to.equal(null)
        expect(childNodes[2].getAttribute('class')).to.equal(null)
    })

    it('should allow customizing children classNames', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {
                classModifiers: {},
                classNames: {
                    state: 'test1',
                    title: 'test2',
                    content: 'test3'
                },
                title: title
            }, React.DOM.span({}))
        )

        var childNodes = React.findDOMNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal('test1')
        expect(childNodes[1].getAttribute('class')).to.equal('test2')
        expect(childNodes[2].getAttribute('class')).to.equal('test3')
    })

    it('should allow customizing class BEM separator', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {
                classModifiers: {
                    unchecked: 'modifier'
                },
                classNames: {
                    state: 'test1',
                    title: 'test2',
                    content: 'test3'
                },
                classSeparator: 'TEST',
                title: title
            }, React.DOM.span({}))
        )

        var childNodes = React.findDOMNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal('test1 test1TESTmodifier')
        expect(childNodes[1].getAttribute('class')).to.equal('test2 test2TESTmodifier')
        expect(childNodes[2].getAttribute('class')).to.equal('test3 test3TESTmodifier')
    })

    it('should use index and name properties in attributes', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {
                index: 0,
                name: 'test',
                title: title
            }, React.DOM.span({}))
        )

        var element = React.findDOMNode(rendered)

        expect(element.childNodes[0].getAttribute('name')).to.equal('test')
        expect(element.childNodes[0].getAttribute('value')).to.equal('0')
        expect(element.childNodes[0].getAttribute('id')).to.equal('test-0')
        expect(element.childNodes[1].getAttribute('for')).to.equal('test-0')
        expect(element.childNodes[1].getAttribute('id')).to.equal('label-test-0')
        expect(element.childNodes[2].getAttribute('id')).to.equal('panel-test-0')
    })

    it('should contain ARIA and data-state attributes', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {
                index: 0,
                name: 'test',
                title: title
            }, React.DOM.span({}))
        )

        var element = React.findDOMNode(rendered)

        expect(element.getAttribute('aria-expanded')).to.equal('false')
        expect(element.getAttribute('aria-selected')).to.equal('false')

        expect(element.childNodes[0].getAttribute('aria-controls')).to.equal('panel-test-0')
        expect(element.childNodes[0].getAttribute('role')).to.equal('tab')
        expect(element.childNodes[0].getAttribute('data-state')).to.equal('tabbordion')
        expect(element.childNodes[2].getAttribute('aria-labelledby')).to.equal('test-0')
        expect(element.childNodes[2].getAttribute('role')).to.equal('tabpanel')
    })

    it('should hide element via CSS and disable input when visible prop is set to false', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Panel, {
                classModifiers: { visibleBetween: 'between', visibleFirst: 'first', visibleLast: 'last' },
                isBetween: true,
                isFirst: true,
                isLast: true,
                title: title,
                visible: false
            }, React.DOM.span({}))
        )

        var element = React.findDOMNode(rendered)

        expect(element.getAttribute('class')).to.equal('panel')
        expect(element.getAttribute('style')).to.equal('display:none;')
        expect(element.childNodes[0].getAttribute('disabled')).to.equal('')
    })
})
