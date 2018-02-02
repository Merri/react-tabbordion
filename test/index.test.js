/* global describe,it */

// setup jsdom
const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop))
    Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = { userAgent: 'node.js' }
copyProps(window, global)

// setup tests (note: using import is troublesome, code gets executed in the wrong order)
const React = require('react')
global.React = React

const { configure, mount, shallow } = require('enzyme')
const sinon = require('sinon')
const { expect } = require('chai')

const { Tabbordion, TabPanel, TabLabel, TabContent } = require('../dist/module')

const Adapter = require('enzyme-adapter-react-16')
configure({ adapter: new Adapter() })

function NOOP(){}

describe('Tabbordion', function() {
    it('should render className and have ARIA role of tablist', function() {
        const wrapper = shallow(
            <Tabbordion className="test test--test" />
        )

        expect(wrapper.hasClass('test')).to.be.true
        expect(wrapper.hasClass('test--test')).to.be.true
        expect(wrapper.prop('role')).to.equal('tablist')
    })

    it('should render using given component', function() {
        const wrapper = shallow(
            <Tabbordion component="span" />
        )

        expect(wrapper.matchesElement(<span />)).to.be.true
    })

    it('should provide bem and tabbordion context', function() {
        const wrapper = shallow(<Tabbordion />)
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

    it('should trigger bem context updates when BEM props change', function() {
        const wrapper = shallow(<Tabbordion />)
        const context = wrapper.instance().getChildContext()

        const subscriber = { forceUpdate: sinon.spy() }
        context.bem.subscribe(subscriber)

        wrapper.setProps({ bemSeparator: '--' })
        expect(subscriber.forceUpdate.calledOnce).to.be.false

        wrapper.setProps({ bemSeparator: '|' })
        expect(subscriber.forceUpdate.calledOnce).to.be.true

        wrapper.setProps({ bemModifiers: {} })
        expect(subscriber.forceUpdate.calledTwice).to.be.true

        wrapper.setProps({ blockElements: {} })
        expect(subscriber.forceUpdate.calledThrice).to.be.true

        context.bem.unsubscribe(subscriber)
    })

    it('should trigger tabbordion context updates when other props change', function() {
        const wrapper = shallow(<Tabbordion />)
        const context = wrapper.instance().getChildContext()

        const subscriber = { forceUpdate: sinon.spy() }
        context.tabbordion.subscribe(subscriber)

        wrapper.setProps({ animateContent: false })
        expect(subscriber.forceUpdate.calledOnce).to.be.false

        wrapper.setProps({ animateContent: 'height' })
        expect(subscriber.forceUpdate.calledOnce).to.be.true

        wrapper.setProps({ animateContent: 'marginTop' })
        expect(subscriber.forceUpdate.calledTwice).to.be.true

        context.tabbordion.unsubscribe(subscriber)
    })

    it('should support panels added using React.Fragment', function() {
        const wrapper = mount(<Tabbordion>
            <React.Fragment>
                <TabPanel>
                    <TabLabel>Test label</TabLabel>
                    <TabContent>
                        Test content
                    </TabContent>
                </TabPanel>
            </React.Fragment>
        </Tabbordion>)

        const context = wrapper.instance().getChildContext()
        const state = context.tabbordion.getState()

        expect(state.checkedPanels.length).to.equal(1)
        expect(state.firstVisiblePanel).to.equal(0)
        expect(state.lastVisiblePanel).to.equal(0)
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
            hidden: 'hidden',
            last: 'last',
            noContent: 'no-content',
            unchecked: 'unchecked',
        },
        bemSeparator: '--',
        blockElements: {
            animator: 'animator',
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
        tabbordionId: 'one',
    }
}

function getFourPanelTabbordionState() {
    return {
        animateContent: false,
        checkedPanels: [1, 2],
        disabledPanels: [2],
        firstVisiblePanel: 0,
        lastVisiblePanel: 2,
        panelName: 'test',
        panelType: 'checkbox',
        tabbordionId: 'four',
    }
}

const singlePanelContext = {
    bem: {
        getState: getBemState,
        subscribe: NOOP,
        unsubscribe: NOOP,
    },
    tabbordion: {
        getState: getSinglePanelTabbordionState,
        subscribe: NOOP,
        unsubscribe: NOOP,
    },
}

const fourPanelContext = {
    bem: {
        getState: getBemState,
        subscribe: NOOP,
        unsubscribe: NOOP,
    },
    tabbordion: {
        getState: getFourPanelTabbordionState,
        subscribe: NOOP,
        unsubscribe: NOOP,
    },
}

describe('TabPanel', function() {
    it('should provide tabbordionPanel context', function() {
        const options = { context: singlePanelContext }

        const wrapper = shallow(<TabPanel />, options)
        const context = wrapper.instance().getChildContext()

        expect(context.bem).to.not.be.ok
        expect(context.tabbordion).to.not.be.ok
        expect(context.tabbordionPanel).to.be.ok

        expect(typeof context.tabbordionPanel.getState).to.equal('function')
        expect(typeof context.tabbordionPanel.onClickLabel).to.equal('function')
        expect(typeof context.tabbordionPanel.subscribe).to.equal('function')
        expect(typeof context.tabbordionPanel.unsubscribe).to.equal('function')
    })

    it('should trigger context subscribes when mounted', function() {
        const subscribeBem = sinon.spy()
        const subscribeTabbordion = sinon.spy()
        const unsubscribeBem = sinon.spy()
        const unsubscribeTabbordion = sinon.spy()

        const options = {
            context: {
                bem: {
                    getState: getBemState,
                    subscribe: subscribeBem,
                    unsubscribe: unsubscribeBem,
                },
                tabbordion: {
                    getState: getSinglePanelTabbordionState,
                    subscribe: subscribeTabbordion,
                    unsubscribe: unsubscribeTabbordion,
                }
            }
        }

        const wrapper = mount(<TabPanel />, options)

        expect(subscribeBem.calledOnce).to.be.true
        expect(subscribeTabbordion.calledOnce).to.be.true
        expect(unsubscribeBem.calledOnce).to.be.false
        expect(unsubscribeTabbordion.calledOnce).to.be.false

        wrapper.unmount()

        expect(subscribeBem.calledOnce).to.be.true
        expect(subscribeTabbordion.calledOnce).to.be.true
        expect(unsubscribeBem.calledOnce).to.be.true
        expect(unsubscribeTabbordion.calledOnce).to.be.true
    })

    it('should generate BEM classes and other rendered props from given context', function() {
        const options = { context: singlePanelContext }

        const wrapper = shallow(<TabPanel index={0} />, options)
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

        const wrapper = shallow(<TabPanel index={0}><div /></TabPanel>, options)

        expect(wrapper.childAt(1).equals(<div />)).be.true
    })

    it('should handle first/between/last BEM classes', function() {
        const options = { context: fourPanelContext }

        const panel0 = shallow(<TabPanel index={0} />, options)
        const panel1 = shallow(<TabPanel index={1} />, options)
        const panel2 = shallow(<TabPanel index={2} />, options)
        const panel3 = shallow(<TabPanel index={3} visible={false} />, options)

        expect(panel0.hasClass('panel--first')).to.be.true
        expect(panel0.hasClass('panel--between')).to.be.false
        expect(panel0.hasClass('panel--last')).to.be.false
        expect(panel0.hasClass('panel--hidden')).to.be.false

        expect(panel1.hasClass('panel--first')).to.be.false
        expect(panel1.hasClass('panel--between')).to.be.true
        expect(panel1.hasClass('panel--last')).to.be.false
        expect(panel1.hasClass('panel--hidden')).to.be.false

        expect(panel2.hasClass('panel--first')).to.be.false
        expect(panel2.hasClass('panel--between')).to.be.false
        expect(panel2.hasClass('panel--last')).to.be.true
        expect(panel2.hasClass('panel--hidden')).to.be.false

        expect(panel3.hasClass('panel--first')).to.be.false
        expect(panel3.hasClass('panel--between')).to.be.false
        expect(panel3.hasClass('panel--last')).to.be.false
        expect(panel3.hasClass('panel--hidden')).to.be.true
    })

    it('should reflect disabled state', function() {
        const options = { context: fourPanelContext }

        const wrapper = shallow(<TabPanel index={2} />, options)
        const wrapperInput = wrapper.childAt(0)

        expect(wrapper.hasClass('panel--disabled')).to.be.true
        expect(wrapperInput.prop('disabled')).to.be.true
    })

    it('should reflect hidden state', function() {
        const options = { context: fourPanelContext }

        const wrapper = shallow(<TabPanel index={3} visible={false} />, options)
        const wrapperInput = wrapper.childAt(0)

        expect(wrapper.hasClass('panel--hidden')).to.be.true
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

        const wrapper = shallow(<TabPanel {...props} />, options)
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

        const wrapper = shallow(<TabPanel {...props} />, options)

        expect(wrapper.hasClass('panel--i-am-custom')).to.be.true
        expect(wrapper.hasClass('panel--i-am-too')).to.be.true
    })

    // this was a v0 feature that has been deprecated in favor of modifiers prop
    it('should NOT extend custom BEM modifiers via className', function() {
        const options = { context: singlePanelContext }
        const props = {
            className: '--i-am-custom blergh --i-am-too',
            index: 0,
        }

        const wrapper = shallow(<TabPanel {...props} />, options)

        expect(wrapper.hasClass('panel--i-am-too')).to.be.false
        expect(wrapper.hasClass('--i-am-too')).to.be.true
        expect(wrapper.hasClass('panel--i-am-custom')).to.be.false
        expect(wrapper.hasClass('--i-am-custom')).to.be.true
        expect(wrapper.hasClass('blergh')).to.be.true
    })
})

function makeGetTabbordionPanelState(animateContent = false) {
    return function() {
        return {
            animateContent,
            checked: true,
            contentId: 'contentId',
            disabled: false,
            inputId: 'inputId',
            index: 0,
            modifiers: ['modifier'],
            visible: true,
        }
    }
}

const panelContextWithoutAnimator = {
    bem: {
        getState: getBemState,
        subscribe: NOOP,
        unsubscribe: NOOP,
    },
    tabbordionPanel: {
        getState: makeGetTabbordionPanelState(),
        subscribe: NOOP,
        unsubscribe: NOOP,
    }
}

const panelContextWithAnimator = {
    bem: {
        getState: getBemState,
        subscribe: NOOP,
        unsubscribe: NOOP,
    },
    tabbordionPanel: {
        getState: makeGetTabbordionPanelState('height'),
        subscribe: NOOP,
        unsubscribe: NOOP,
    }
}

describe('TabLabel', function() {
    it('should trigger context subscribes when mounted', function() {
        const subscribeBem = sinon.spy()
        const subscribeTabbordionPanel = sinon.spy()
        const unsubscribeBem = sinon.spy()
        const unsubscribeTabbordionPanel = sinon.spy()

        const options = {
            context: {
                bem: {
                    getState: getBemState,
                    subscribe: subscribeBem,
                    unsubscribe: unsubscribeBem,
                },
                tabbordionPanel: {
                    getState: makeGetTabbordionPanelState(),
                    subscribe: subscribeTabbordionPanel,
                    unsubscribe: unsubscribeTabbordionPanel,
                }
            }
        }

        const wrapper = mount(<TabLabel />, options)

        expect(subscribeBem.calledOnce).to.be.true
        expect(subscribeTabbordionPanel.calledOnce).to.be.true
        expect(unsubscribeBem.calledOnce).to.be.false
        expect(unsubscribeTabbordionPanel.calledOnce).to.be.false

        wrapper.unmount()

        expect(subscribeBem.calledOnce).to.be.true
        expect(subscribeTabbordionPanel.calledOnce).to.be.true
        expect(unsubscribeBem.calledOnce).to.be.true
        expect(unsubscribeTabbordionPanel.calledOnce).to.be.true
    })

    it('should trigger onClickLabel when clicked on', function() {
        const onClickLabel = sinon.spy()

        const options = {
            context: {
                bem: {
                    getState: getBemState,
                    subscribe: NOOP,
                    unsubscribe: NOOP,
                },
                tabbordionPanel: {
                    getState: makeGetTabbordionPanelState(),
                    onClickLabel,
                    subscribe: NOOP,
                    unsubscribe: NOOP,
                }
            }
        }

        const wrapper = mount((
            <TabLabel>
                <p />
                <span onClick={function(event) { event.preventDefault() }} />
            </TabLabel>
        ), options)

        wrapper.simulate('click')
        expect(onClickLabel.calledOnce).to.be.true

        wrapper.find('p').simulate('click')
        expect(onClickLabel.calledTwice).to.be.true

        wrapper.find('span').simulate('click')
        expect(onClickLabel.calledTwice).to.be.true
    })

    it('should generate BEM classes and other rendered props from given context', function() {
        const options = { context: panelContextWithoutAnimator }

        const wrapper = shallow(<TabLabel />, options)

        expect(wrapper.hasClass('label')).to.be.true
        expect(wrapper.hasClass('label--modifier')).to.be.true
        expect(wrapper.prop('htmlFor')).to.equal('inputId')
    })

    it('should preserve className classes despite BEM classes in use', function() {
        const options = { context: panelContextWithAnimator }

        const wrapper = shallow(<TabLabel className="hellurei" />, options)

        expect(wrapper.hasClass('hellurei')).to.be.true
    })
})

describe('TabContent', function() {
    it('should trigger context subscribes when mounted', function() {
        const subscribeBem = sinon.spy()
        const subscribeTabbordionPanel = sinon.spy()
        const unsubscribeBem = sinon.spy()
        const unsubscribeTabbordionPanel = sinon.spy()

        const options = {
            context: {
                bem: {
                    getState: getBemState,
                    subscribe: subscribeBem,
                    unsubscribe: unsubscribeBem,
                },
                tabbordionPanel: {
                    getState: makeGetTabbordionPanelState(),
                    subscribe: subscribeTabbordionPanel,
                    unsubscribe: unsubscribeTabbordionPanel,
                }
            }
        }

        const wrapper = mount(<TabContent />, options)

        expect(subscribeBem.calledOnce).to.be.true
        expect(subscribeTabbordionPanel.calledOnce).to.be.true
        expect(unsubscribeBem.calledOnce).to.be.false
        expect(unsubscribeTabbordionPanel.calledOnce).to.be.false

        wrapper.unmount()

        expect(subscribeBem.calledOnce).to.be.true
        expect(subscribeTabbordionPanel.calledOnce).to.be.true
        expect(unsubscribeBem.calledOnce).to.be.true
        expect(unsubscribeTabbordionPanel.calledOnce).to.be.true
    })

    it('should generate BEM classes and other rendered props from given context without animateContent', function() {
        const options = { context: panelContextWithoutAnimator }

        const wrapper = shallow(<TabContent />, options)

        expect(wrapper.hasClass('content')).to.be.true
        expect(wrapper.hasClass('content--modifier')).to.be.true
        expect(wrapper.prop('id')).to.equal('contentId')
        expect(wrapper.prop('aria-labelledby')).to.equal('inputId')
        expect(wrapper.prop('role')).to.equal('tabpanel')
    })

    it('should generate BEM classes and other rendered props from given context WITH animateContent', function() {
        const options = { context: panelContextWithAnimator }

        const wrapper = shallow(<TabContent />, options)
        const wrapperChild = wrapper.childAt(0)

        expect(wrapper.hasClass('animator')).to.be.true
        expect(wrapper.hasClass('animator--modifier')).to.be.true
        expect(wrapper.prop('id')).to.equal('contentId')
        expect(wrapper.prop('aria-labelledby')).to.equal('inputId')
        expect(wrapper.prop('role')).to.equal('tabpanel')
        expect(wrapper.prop('style').height).to.equal('auto')
        expect(wrapper.prop('style').overflow).to.equal('hidden')

        expect(wrapperChild.hasClass('content')).to.be.true
        expect(wrapperChild.hasClass('content--modifier')).to.be.true
    })

    it('should preserve className classes despite BEM classes in use', function() {
        const options = { context: panelContextWithAnimator }

        const wrapper = shallow(<TabContent className="hellurei" />, options)
        const wrapperChild = wrapper.childAt(0)

        expect(wrapper.hasClass('hellurei')).to.be.true
        expect(wrapperChild.hasClass('hellurei')).to.be.false
    })
})
