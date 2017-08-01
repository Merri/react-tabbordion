/* global describe,it */
import React from 'react'
import { shallow } from 'enzyme'
// import sinon from 'sinon'
import { expect } from 'chai'

import { Tabbordion, TabPanel } from '../dist/module'

describe('Tabbordion', function() {
    it('should render className and have ARIA role of tablist', function() {
        const wrapper = shallow(
            React.createElement(Tabbordion, { className: 'test test--test' })
        )

        expect(wrapper.hasClass('test')).to.be.true
        expect(wrapper.hasClass('test--test')).to.be.true
        expect(wrapper.prop('role')).to.equal('tablist')
    })

    it('should render using given component', function() {
        const wrapper = shallow(
            React.createElement(Tabbordion, { component: 'span' })
        )

        expect(wrapper.matchesElement(React.createElement('span'))).to.be.true
    })

    it('should provide bem and tabbordion context', function() {
        const wrapper = shallow(React.createElement(Tabbordion))
        const context = wrapper.instance().getChildContext()

        expect(context.bem).to.be.ok
        expect(context.tabbordion).to.be.ok
        expect(context.tabbordionPanel).to.not.be.ok

        expect(typeof context.bem.getState).to.equal('function')
        expect(typeof context.bem.subscribe).to.equal('function')
        expect(typeof context.bem.unsubscribe).to.equal('function')
        expect(typeof context.tabbordion.getState).to.equal('function')
        expect(typeof context.tabbordion.subscribe).to.equal('function')
        expect(typeof context.tabbordion.unsubscribe).to.equal('function')
    })
})

function getBemState() {
    return {
        bemModifiers: {
            animated: 'animated',
            between: 'between',
            checked: 'checked',
            content: 'content',
            disabled: 'disabled',
            enabled: 'enabled',
            first: 'first',
            last: 'last',
            noContent: 'no-content',
            unchecked: 'unchecked',
        },
        bemSeparator: '--',
        blockElements: {
            content: 'content',
            label: 'label',
            panel: 'panel',
        },
    }
}

function getSinglePanelTabbordionState() {
    return {
        animateContent: false,
        checkedPanels: [0],
        disabledPanels: [],
        firstVisiblePanel: 0,
        lastVisiblePanel: 0,
        panelName: 'test',
        panelType: 'checkbox',
        tabbordionId: 'one'
    }
}

function getFourPanelTabbordionState() {
    return {
        animateContent: false,
        checkedPanels: [1, 2],
        disabledPanels: [3],
        firstVisiblePanel: 0,
        lastVisiblePanel: 3,
        panelName: 'test',
        panelType: 'checkbox',
        tabbordionId: 'four'
    }
}

const singlePanelContext = {
    bem: {
        getState: getBemState,
    },
    tabbordion: {
        getState: getSinglePanelTabbordionState,
    },
}

const fourPanelContext = {
    bem: {
        getState: getBemState,
    },
    tabbordion: {
        getState: getFourPanelTabbordionState,
    },
}

describe('TabPanel', function() {
    it('should provide tabbordionPanel context', function() {
        const options = { context: singlePanelContext }

        const wrapper = shallow(React.createElement(TabPanel), options)
        const context = wrapper.instance().getChildContext()

        expect(context.bem).to.not.be.ok
        expect(context.tabbordion).to.not.be.ok
        expect(context.tabbordionPanel).to.be.ok

        expect(typeof context.tabbordionPanel.getState).to.equal('function')
        expect(typeof context.tabbordionPanel.onClickLabel).to.equal('function')
        expect(typeof context.tabbordionPanel.subscribe).to.equal('function')
        expect(typeof context.tabbordionPanel.unsubscribe).to.equal('function')
    })

    it('should generate BEM classes and other rendered props from given context', function() {
        const options = { context: singlePanelContext }

        const wrapper = shallow(React.createElement(TabPanel, { index: 0 }), options)
        const wrapperInput = wrapper.childAt(0)

        expect(wrapper.hasClass('panel')).to.be.true
        expect(wrapper.hasClass('panel--checked')).to.be.true
        expect(wrapper.hasClass('panel--enabled')).to.be.true
        expect(wrapper.hasClass('panel--first')).to.be.true
        expect(wrapper.hasClass('panel--last')).to.be.true
        expect(wrapper.hasClass('panel--no-content')).to.be.true

        expect(wrapper.prop('aria-expanded')).to.be.null
        expect(wrapper.prop('aria-selected')).to.equal('true')
        expect(wrapper.prop('role')).to.equal('tab')
        expect(wrapper.prop('style').display).to.be.null

        expect(wrapperInput.prop('aria-controls')).to.equal('one-0-content')
        expect(wrapperInput.prop('checked')).to.be.true
        expect(wrapperInput.prop('data-state')).to.equal('tabbordion')
        expect(wrapperInput.prop('disabled')).to.equal(false)
        expect(wrapperInput.prop('id')).to.equal('one-0')
        expect(wrapperInput.prop('name')).to.equal('test')
        expect(wrapperInput.prop('type')).to.equal('checkbox')
        expect(wrapperInput.prop('value')).to.equal('0')
    })

    it('should place other children always after the input box', function() {
        const options = { context: singlePanelContext }

        const div = React.createElement('div')
        const wrapper = shallow(React.createElement(TabPanel, { index: 0 }, div), options)

        expect(wrapper.childAt(1).equals(div)).be.true
    })

    it('should handle first/between/last BEM classes', function() {
        const options = { context: fourPanelContext }

        const panel0 = shallow(React.createElement(TabPanel, { index: 0 }), options)
        const panel1 = shallow(React.createElement(TabPanel, { index: 1 }), options)
        const panel2 = shallow(React.createElement(TabPanel, { index: 2 }), options)
        const panel3 = shallow(React.createElement(TabPanel, { index: 3 }), options)

        expect(panel0.hasClass('panel--first')).to.be.true
        expect(panel0.hasClass('panel--between')).to.be.false
        expect(panel0.hasClass('panel--last')).to.be.false

        expect(panel1.hasClass('panel--first')).to.be.false
        expect(panel1.hasClass('panel--between')).to.be.true
        expect(panel1.hasClass('panel--last')).to.be.false

        expect(panel2.hasClass('panel--first')).to.be.false
        expect(panel2.hasClass('panel--between')).to.be.true
        expect(panel2.hasClass('panel--last')).to.be.false

        expect(panel3.hasClass('panel--first')).to.be.false
        expect(panel3.hasClass('panel--between')).to.be.false
        expect(panel3.hasClass('panel--last')).to.be.true
    })

    it('should reflect disabled state', function() {
        const options = { context: fourPanelContext }

        const wrapper = shallow(React.createElement(TabPanel, { index: 3 }), options)
        const wrapperInput = wrapper.childAt(0)

        expect(wrapper.hasClass('panel--disabled')).to.be.true
        expect(wrapperInput.prop('disabled')).to.be.true
    })

    it('should allow props to override context', function() {
        const options = { context: singlePanelContext }
        const props = {
            checked: false,
            disabled: true,
            id: 'myself',
            index: 0,
            name: 'different',
            type: 'radio',
            value: 'best',
            visible: false,
        }

        const wrapper = shallow(React.createElement(TabPanel, props), options)
        const wrapperInput = wrapper.childAt(0)

        expect(wrapper.hasClass('panel--unchecked')).to.be.true
        expect(wrapper.hasClass('panel--disabled')).to.be.true
        expect(wrapper.prop('style').display).to.equal('none')

        expect(wrapperInput.prop('checked')).to.be.false
        expect(wrapperInput.prop('disabled')).to.equal(true)
        expect(wrapperInput.prop('id')).to.equal('myself')
        expect(wrapperInput.prop('name')).to.equal('different')
        expect(wrapperInput.prop('type')).to.equal('radio')
        expect(wrapperInput.prop('value')).to.equal('best')
    })

    it('should allow usage of custom BEM modifiers via props', function() {
        const options = { context: singlePanelContext }
        const props = {
            index: 0,
            modifiers: ['i-am-custom', 'i-am-too']
        }

        const wrapper = shallow(React.createElement(TabPanel, props), options)

        expect(wrapper.hasClass('panel--i-am-custom')).to.be.true
        expect(wrapper.hasClass('panel--i-am-too')).to.be.true
    })

    // this was a v0 feature that has been deprecated by modifiers prop
    it('should NOT extend custom BEM modifiers via className', function() {
        const options = { context: singlePanelContext }
        const props = {
            className: '--i-am-custom blergh --i-am-too',
            index: 0,
        }

        const wrapper = shallow(React.createElement(TabPanel, props), options)

        expect(wrapper.hasClass('panel--i-am-too')).to.be.false
        expect(wrapper.hasClass('--i-am-too')).to.be.true
        expect(wrapper.hasClass('panel--i-am-custom')).to.be.false
        expect(wrapper.hasClass('--i-am-custom')).to.be.true
        expect(wrapper.hasClass('blergh')).to.be.true
    })
})
