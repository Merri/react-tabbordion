/* global describe,it */
'use strict'

var React = require('react')
var shallow = require('enzyme').shallow
// var sinon = require('sinon')
var expect = require('chai').expect

var Tabbordion = require('../dist/module/').Tabbordion
/*
var Panel = require('../dist/module/').Panel

function checkChildrenTags(childNodes, tags) {
    expect(childNodes.length).to.equal(tags.length)

    for (var index = 0; index < tags.length; index++) {
        expect(childNodes[index].nodeName).to.equal(tags[index])
    }
}
*/
describe('Tabbordion', function() {
    it('should extend a class if className is passed as a prop', function() {
        var rendered = shallow(
            React.createElement(Tabbordion, { className: 'test' })
        )

        expect(rendered.hasClass('test')).to.equal(true)
    })

    it('should retain additional class identifiers if space separated className is passed as a prop', function() {
        var rendered = shallow(
            React.createElement(Tabbordion, { className: 'test test--test' })
        )

        expect(rendered.hasClass('test')).to.equal(true)
        expect(rendered.hasClass('test--test')).to.equal(true)
    })

    it('should render using given component', function() {
        var rendered = shallow(
            React.createElement(Tabbordion, { component: 'span' })
        )

        expect(rendered.matchesElement(React.createElement('span'))).to.equal(true)
    })
/*
    describe('Panel', function() {
        var title = React.createElement('span', {}, 'Test title')

        it('should inherit properties from parent Tabbordion', function() {
            var rendered = shallow(
                React.createElement(Tabbordion, {
                    animateContent: 'height',
                    classModifiers: {
                        checked: 'test1',
                        visibleFirst: 'test5',
                        visibleLast: 'test6'
                    },
                    classNames: {
                        animator: 'test2',
                        panel: 'test'
                    },
                    classSeparator: '|',
                    initialIndex: 0,
                    name: 'test4',
                    contentTag: 'article',
                    panelTag: 'section'
                }, React.createElement(Panel, {
                    animateContent: false,
                    classModifiers: {},
                    classNames: {},
                    classSeparator: '',
                    title: title
                }, React.createElement('span', {})))
            )

            var element = findNode(rendered).firstChild

            expect(element.getAttribute('class')).to.equal('test test|test1 test|test5 test|test6')
            expect(element.nodeName).to.equal('SECTION')
            expect(element.childNodes[2].getAttribute('class')).to.equal(
                'test2 test2|test1 test2|test5 test2|test6 test2|height'
            )
            expect(element.childNodes[0].getAttribute('name')).to.equal('test4')
            expect(element.childNodes[0].getAttribute('checked')).to.be.null
            expect(element.childNodes[0].getAttribute('type')).to.equal('radio')
            expect(element.childNodes[2].firstChild.nodeName).to.equal('ARTICLE')
        })

        it('should toggle state in TOGGLE mode when title is clicked', function() {
            var rendered = shallow(
                React.createElement(
                    Tabbordion,
                    { mode: 'toggle' },
                    React.createElement(Panel, { title: title })
                )
            )

            var input = TestUtils.findRenderedDOMComponentWithTag(rendered, 'input')
            expect(findNode(input).checked).to.equal(false)

            var label = TestUtils.findRenderedDOMComponentWithTag(rendered, 'label')
            TestUtils.Simulate.click(label)
            expect(findNode(input).checked).to.equal(true)
        })

        it('should toggle state in MULTIPLE mode when title is clicked', function() {
            var rendered = shallow(
                React.createElement(
                    Tabbordion,
                    { mode: 'multiple' },
                    React.createElement(Panel, { title: title })
                )
            )

            var input = TestUtils.findRenderedDOMComponentWithTag(rendered, 'input')
            expect(findNode(input).checked).to.equal(false)

            var label = TestUtils.findRenderedDOMComponentWithTag(rendered, 'label')
            TestUtils.Simulate.click(label)
            expect(findNode(input).checked).to.equal(true)
        })

        it('should NOT toggle state in SINGLE mode when title is clicked', function() {
            var rendered = shallow(
                React.createElement(
                    Tabbordion,
                    { initialIndex: 0, mode: 'single' },
                    React.createElement(Panel, { title: title })
                )
            )

            var input = TestUtils.findRenderedDOMComponentWithTag(rendered, 'input')
            expect(findNode(input).checked).to.equal(true)

            var label = TestUtils.findRenderedDOMComponentWithTag(rendered, 'label')
            TestUtils.Simulate.click(label)
            expect(findNode(input).checked).to.equal(true)
        })

        it('\'s existance should affect count modifiers of parent Tabbordion', function() {
            var rendered = shallow(
                React.createElement(
                    Tabbordion,
                    { className: 'test', initialIndex: 0, mode: 'single' },
                    React.createElement(Panel, { title: title }),
                    React.createElement(Panel, { title: title }),
                    React.createElement(Panel, { title: title })
                )
            )

            expect(findNode(rendered).getAttribute('class')).to.equal(
                'test test--checked-count-1 test--count-3'
            )
        })

        it('should be able to override props set by Tabbordion', function() {
            var rendered = shallow(
                React.createElement(
                    Tabbordion,
                    {
                        contentTag: 'article',
                        initialIndex: 1,
                        mode: 'single',
                        name: 'TEST1',
                        panelTag: 'dd',
                        tag: 'dl'
                    },
                    React.createElement(Panel, {
                        contentTag: 'section',
                        checked: true,
                        name: 'test1',
                        title: title,
                        type: 'checkbox',
                        tag: 'dt'
                    }, React.createElement('span', {})),
                    React.createElement(Panel, { title: title }, React.createElement('span', {}))
                )
            )

            var tabbordion = findNode(rendered)
            var firstPanel = tabbordion.firstChild
            var secondPanel = firstPanel.nextSibling

            checkChildrenTags(tabbordion.childNodes, ['DT', 'DD'])
            checkChildrenTags(firstPanel.childNodes, ['INPUT', 'LABEL', 'SECTION'])
            checkChildrenTags(secondPanel.childNodes, ['INPUT', 'LABEL', 'ARTICLE'])

            expect(firstPanel.firstChild.checked).to.equal(true)
            expect(secondPanel.firstChild.checked).to.equal(false)

            expect(firstPanel.firstChild.getAttribute('name')).to.equal('test1')
            expect(secondPanel.firstChild.getAttribute('name')).to.equal('TEST1')

            expect(firstPanel.firstChild.getAttribute('type')).to.equal('checkbox')
            expect(secondPanel.firstChild.getAttribute('type')).to.equal('radio')
        })
    })
})

describe('Panel', function() {
    var title = React.createElement('span', {}, 'Test title')

    it('should contain two child elements if no children passed', function() {
        var rendered = shallow(
            React.createElement(Panel, { title: title })
        )

        checkChildrenTags(findNode(rendered).childNodes, ['INPUT', 'LABEL'])
    })

    it('should render title prop inside label', function() {
        var rendered = shallow(
            React.createElement(Panel, { title: title })
        )

        var childNodes = findNode(rendered).childNodes

        expect(childNodes[1].firstChild).to.equal(childNodes[1].lastChild)
        expect(childNodes[1].firstChild.nodeName).to.equal('SPAN')
        expect(childNodes[1].firstChild.innerHTML).to.equal('Test title')
    })

    it('should contain three child elements if children passed', function() {
        var rendered = shallow(
            React.createElement(Panel, { title: title }, React.createElement('span', {}))
        )

        var childNodes = findNode(rendered).childNodes

        checkChildrenTags(childNodes, ['INPUT', 'LABEL', 'DIV'])

        expect(childNodes[2].firstChild).to.equal(childNodes[2].lastChild)
        expect(childNodes[2].firstChild.nodeName).to.equal('SPAN')
        expect(childNodes[2].firstChild.innerHTML).to.equal('')
    })

    it('should use a default class if no className is passed as prop', function() {
        var rendered = shallow(
            React.createElement(Panel, { title: title })
        )

        expect(findNode(rendered).getAttribute('class')).to.equal(
            'panel panel--unchecked panel--enabled panel--no-content'
        )
    })

    it('should add className if passed as prop', function() {
        var rendered = shallow(
            React.createElement(Panel, { className: 'test', title: title })
        )

        expect(findNode(rendered).getAttribute('class')).to.equal(
            'panel panel--unchecked panel--enabled panel--no-content test'
        )
    })

    it('should reflect given properties in className, --between should override --first and --last', function() {
        var rendered = shallow(
            React.createElement(Panel, {
                checked: true,
                disabled: true,
                isBetween: true,
                isFirst: true,
                isLast: true,
                title: title
            }, React.createElement('span', {}))
        )

        expect(findNode(rendered).getAttribute('class')).to.equal(
            'panel panel--checked panel--disabled panel--between panel--content'
        )

        rendered = shallow(
            React.createElement(Panel, {
                checked: true,
                disabled: true,
                isBetween: false,
                isFirst: true,
                isLast: true,
                title: title
            }, React.createElement('span', {}))
        )

        expect(findNode(rendered).getAttribute('class')).to.equal(
            'panel panel--checked panel--disabled panel--first panel--last panel--content'
        )
    })

    it('should use only existing classModifiers', function() {
        var rendered = shallow(
            React.createElement(Panel, {
                classModifiers: {},
                title: title
            }, React.createElement('span', {}))
        )

        expect(findNode(rendered).getAttribute('class')).to.equal('panel')

        var childNodes = findNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal('panel__state')
        expect(childNodes[1].getAttribute('class')).to.equal('panel__title')
        expect(childNodes[2].getAttribute('class')).to.equal('panel__content')

        rendered = shallow(
            React.createElement(Panel, {
                classModifiers: {
                    unchecked: 'test'
                },
                title: title
            }, React.createElement('span', {}))
        )

        expect(findNode(rendered).getAttribute('class')).to.equal('panel panel--test')

        childNodes = findNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal('panel__state panel__state--test')
        expect(childNodes[1].getAttribute('class')).to.equal('panel__title panel__title--test')
        expect(childNodes[2].getAttribute('class')).to.equal('panel__content panel__content--test')
    })

    it('should apply default classes and modifiers from classNames and classModifiers props to children', function() {
        var rendered = shallow(
            React.createElement(Panel, { title: title }, React.createElement('span', {}))
        )

        var childNodes = findNode(rendered).childNodes

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
        var rendered = shallow(
            React.createElement(Panel, {
                classNames: {},
                title: title
            }, React.createElement('span', {}))
        )

        var childNodes = findNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal(null)
        expect(childNodes[1].getAttribute('class')).to.equal(null)
        expect(childNodes[2].getAttribute('class')).to.equal(null)
    })

    it('should allow customizing children classNames', function() {
        var rendered = shallow(
            React.createElement(Panel, {
                classModifiers: {},
                classNames: {
                    state: 'test1',
                    title: 'test2',
                    content: 'test3'
                },
                title: title
            }, React.createElement('span', {}))
        )

        var childNodes = findNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal('test1')
        expect(childNodes[1].getAttribute('class')).to.equal('test2')
        expect(childNodes[2].getAttribute('class')).to.equal('test3')
    })

    it('should allow customizing class BEM separator', function() {
        var rendered = shallow(
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
            }, React.createElement('span', {}))
        )

        var childNodes = findNode(rendered).childNodes

        expect(childNodes[0].getAttribute('class')).to.equal('test1 test1TESTmodifier')
        expect(childNodes[1].getAttribute('class')).to.equal('test2 test2TESTmodifier')
        expect(childNodes[2].getAttribute('class')).to.equal('test3 test3TESTmodifier')
    })

    it('should use index and name properties in attributes', function() {
        var rendered = shallow(
            React.createElement(Panel, {
                index: 0,
                name: 'test',
                title: title
            }, React.createElement('span', {}))
        )

        var element = findNode(rendered)

        expect(element.childNodes[0].getAttribute('name')).to.equal('test')
        expect(element.childNodes[0].getAttribute('value')).to.equal('0')
        expect(element.childNodes[0].getAttribute('id')).to.equal('test-0')
        expect(element.childNodes[1].getAttribute('for')).to.equal('test-0')
        expect(element.childNodes[1].getAttribute('id')).to.equal('label-test-0')
        expect(element.childNodes[2].getAttribute('id')).to.equal('panel-test-0')
    })

    it('should contain ARIA and data-state attributes', function() {
        var rendered = shallow(
            React.createElement(Panel, {
                index: 0,
                name: 'test',
                title: title
            }, React.createElement('span', {}))
        )

        var element = findNode(rendered)

        expect(element.getAttribute('aria-expanded')).to.equal('false')
        expect(element.getAttribute('aria-selected')).to.equal('false')
        expect(element.getAttribute('role')).to.equal('tab')

        expect(element.childNodes[0].getAttribute('aria-controls')).to.equal('panel-test-0')
        expect(element.childNodes[0].getAttribute('data-state')).to.equal('tabbordion')
        expect(element.childNodes[2].getAttribute('aria-labelledby')).to.equal('test-0')
        expect(element.childNodes[2].getAttribute('role')).to.equal('tabpanel')
    })

    it('should hide element via CSS and disable input when visible prop is set to false', function() {
        var rendered = shallow(
            React.createElement(Panel, {
                classModifiers: { visibleBetween: 'between', visibleFirst: 'first', visibleLast: 'last' },
                isBetween: true,
                isFirst: true,
                isLast: true,
                title: title,
                visible: false
            }, React.createElement('span', {}))
        )

        var element = findNode(rendered)

        expect(element.getAttribute('class')).to.equal('panel')
        expect(element.getAttribute('style')).to.equal('display: none;')
        expect(element.childNodes[0].getAttribute('disabled')).to.equal('')
    })

    it('should extend shorthand BEM modifiers', function() {
        var rendered = shallow(
            React.createElement(Panel, {
                classModifiers: {},
                classNames: {
                    panel: 'test --test1'
                },
                className: 'TEST --TEST1',
                title: title
            })
        )

        var element = findNode(rendered)

        expect(element.getAttribute('class')).to.equal('test test--test1 TEST test--TEST1')
    })
*/
})
