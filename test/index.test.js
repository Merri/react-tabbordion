/* global describe,it */
'use strict'

var React = require('react')
var shallow = require('enzyme').shallow
// var sinon = require('sinon')
var expect = require('chai').expect

var Tabbordion = require('../dist/module/').Tabbordion

describe('Tabbordion', function() {
    it('should render className and have ARIA role of tablist', function() {
        var rendered = shallow(
            React.createElement(Tabbordion, { className: 'test test--test' })
        )

        expect(rendered.hasClass('test')).to.equal(true)
        expect(rendered.hasClass('test--test')).to.equal(true)
        expect(rendered.prop('role')).to.equal('tablist')
    })

    it('should render using given component', function() {
        var rendered = shallow(
            React.createElement(Tabbordion, { component: 'span' })
        )

        expect(rendered.matchesElement(React.createElement('span'))).to.equal(true)
    })
})
