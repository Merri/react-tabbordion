/* global React, ReactDOM */
;(function() {
    var Tabbordion = React.createFactory(window.ReactTabbordion.Tabbordion)
    var Panel = React.createFactory(window.ReactTabbordion.TabPanel)
    var Label = React.createFactory(window.ReactTabbordion.TabLabel)
    var Content = React.createFactory(window.ReactTabbordion.TabContent)
    var HContent = React.createFactory(window.ReactTabbordion.HeightTransition)

    var demoName = ['Tabs', 'Accordion', 'Multiselect Accordion']

    var Demo = React.createClass({
        displayName: 'Demo',

        getInitialState: function() {
            return {
                demoProps: [
                    {
                        className: 'traditional-tabs',
                        blockElements: {
                            content: 'traditional-tabs-content',
                            panel: 'traditional-tabs-panel',
                            label: 'traditional-tabs-title'
                        },
                        name: 'demo'
                    },
                    {
                        animateContent: 'height',
                        className: 'accordion',
                        blockElements: {
                            animator: 'accordion-animator',
                            content: 'accordion-content',
                            panel: 'accordion-panel',
                            label: 'accordion-title'
                        },
                        mode: 'toggle',
                        name: 'demo'
                    },
                    {
                        animateContent: 'height',
                        className: 'accordion',
                        blockElements: {
                            animator: 'accordion-animator',
                            content: 'accordion-content',
                            panel: 'accordion-panel',
                            label: 'accordion-title'
                        },
                        mode: 'multiple',
                        name: 'demo'
                    }
                ],
                panels: [
                    {
                        checked: true,
                        disabled: false,
                        index: 0,
                        visible: true
                    },
                    {
                        checked: false,
                        disabled: false,
                        index: 1,
                        visible: true
                    },
                    {
                        checked: false,
                        disabled: false,
                        index: 2,
                        visible: true
                    },
                ]
            }
        },

        onChange: function(state) {
            this.setState({
                panels: this.state.panels.map(function(panel) {
                    panel.checked = state.index === panel.index
                    return panel
                })
            })
        },

        onPanels: function(panels) {
            this.setState({ panels: panels })
        },

        render: function() {
            return React.DOM.article(
                {},
                React.DOM.header(
                    {},
                    React.DOM.p({}, 'Choose display style and mode:'),
                    Tabbordion(
                        {
                            className: 'option-list',
                            blockElements: {
                                panel: 'option-item --horizontal',
                                label: 'option-label --horizontal'
                            },
                            id: 'style',
                            name: 'display-style',
                            onChange: this.onChange,
                            onPanels: this.onPanels,
                            panels: this.state.panels,
                        },
                        this.state.demoProps.map(function(props, index) {
                            return Panel(
                                {
                                    key: 'demo-' + index,
                                    index: index,
                                },
                                Label(null, demoName[index])
                            )
                        })
                    )
                ),
                React.DOM.section(
                    {},
                    React.DOM.p({}, 'The component below remains the same, it just receives new props:'),
                    Tabbordion(
                        this.state.demoProps[this.state.panels.filter(function(panel) {
                            return panel.checked === true
                        })[0].index],
                        Panel(
                            null,
                            Label({}, 'Panel #1'),
                            HContent(
                                null,
                                React.DOM.h2({}, 'Content Be Here'),
                                React.DOM.p({}, 'Unless we have nothing.')
                            )
                        ),
                        Panel(
                            null,
                            Label({}, 'Panel #2'),
                            HContent(
                                null,
                                React.DOM.h2({}, 'More Content Be Here'),
                                React.DOM.p({}, 'But we have something.')
                            )
                        ),
                        Panel(null, Label({}, 'Panel #3 - No Content')),
                        // non-Panel elements are allowed to be here
                        React.DOM.div(
                            { className: 'demo' },
                            React.DOM.small({}, 'This is just a normal div here together with the panels.'
                                + ' If you don\'t see what is awesome: doesn\'t break those nice border-radius styles!')
                        )
                    )
                )
            )
        }
    })

    ReactDOM.render(React.createElement(Demo), document.getElementById('app'))
})();
