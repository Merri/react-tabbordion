/* global describe,it */
import React from 'react'
import { shallow } from 'enzyme'
// import sinon from 'sinon'
import { expect } from 'chai'

import { Tabbordion } from '../dist/module'

describe('Tabbordion', function() {
    it('should render className and have ARIA role of tablist', function() {
        const rendered = shallow(
            React.createElement(Tabbordion, { className: 'test test--test' })
        )

        expect(rendered.hasClass('test')).to.equal(true)
        expect(rendered.hasClass('test--test')).to.equal(true)
        expect(rendered.prop('role')).to.equal('tablist')
    })

    it('should render using given component', function() {
        const rendered = shallow(
            React.createElement(Tabbordion, { component: 'span' })
        )

        expect(rendered.matchesElement(React.createElement('span'))).to.equal(true)
    })
})
