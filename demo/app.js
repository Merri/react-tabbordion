/* global createReactClass, React, ReactDOM, ReactTabbordion */
// import React from 'react'
// import ReactDOM from 'react-dom'

// YES, this demo is in ES5!
(function() {
    // import { Tabbordion, TabPanel as Panel, TabLabel as Label, TabContent as Content } from 'react-tabbordion'
    var Tabbordion = React.createFactory(ReactTabbordion.Tabbordion)
    var Panel = React.createFactory(ReactTabbordion.TabPanel)
    var Label = React.createFactory(ReactTabbordion.TabLabel)
    var Content = React.createFactory(ReactTabbordion.TabContent)

    var demoName = ['Tabs', 'Accordion', 'Multiselect Accordion']

    // you can individually control checked, disabled and visible of each panel
    var initialPanels = [
        {
            checked: true,
            index: 1
        },
        {
            checked: true,
            index: 2
        }
    ]

    // these are the props passed to Tabbordion
    var demoProps = [
        {
            className: 'traditional-tabs',
            blockElements: {
                content: 'traditional-tabs-content',
                panel: 'traditional-tabs-panel',
                label: 'traditional-tabs-title'
            },
            initialPanels: initialPanels,
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
            initialPanels: initialPanels,
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
            initialPanels: initialPanels,
            mode: 'multiple',
            name: 'demo'
        }
    ]

    // this controls which demo props we use
    var panels = [{ checked: true, index: 2 }]

    // class Demo extends React.PureComponent {}
    var Demo = createReactClass({
        /*
        constructor(props) {
            super(props)

            this.state = { demoProps, panels }
        }
        */
        getInitialState: function() {
            return {
                demoProps: demoProps,
                panels: panels
            }
        },

        /*
        onChange(state) {
            this.setState({
                panels: this.state.panels.map(panel => ({
                    ...panel,
                    checked: state.index === panel.index
                }))
            })
        }
        */
        onChange: function(state) {
            this.setState({
                panels: this.state.panels.map(function(panel) {
                    panel.checked = state.index === panel.index
                    return panel
                })
            })
        },

        /*
        onPanels(panels) {
            this.setState({ panels })
        }
        */
        onPanels: function(panels) {
            this.setState({ panels: panels })
        },

        render: function Demo() {
            return React.createElement(
                'article',
                {},
                React.createElement(
                    'header',
                    {},
                    React.createElement('p', {}, 'Choose display style and mode:'),
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
                React.createElement(
                    'section',
                    {},
                    React.createElement('p', {}, 'The component below remains the same, it just receives new props:'),
                    Tabbordion(
                        this.state.demoProps[this.state.panels.filter(function(panel) {
                            return panel.checked === true
                        })[0].index],
                        Panel(
                            null,
                            Label({}, 'Panel #1'),
                            Content(
                                null,
                                React.createElement('h2', {}, 'Content Be Here'),
                                React.createElement('p', {}, 'Unless we have nothing.')
                            )
                        ),
                        Panel(
                            null,
                            Label({}, 'Panel #2'),
                            Content(
                                null,
                                React.createElement('h2', {}, 'More Content Be Here'),
                                React.createElement('p', {}, 'But we have something.')
                            )
                        ),
                        Panel(null, Label({}, 'Panel #3 - No Content')),
                        // non-Panel elements are allowed to be here
                        React.createElement(
                            'div',
                            { className: 'demo' },
                            React.createElement('small', {}, 'This is just a normal div here together with the panels.'
                                + ' If you don\'t see what is awesome: doesn\'t break those nice border-radius styles!')
                        )
                    )
                )
            )
        }
    })

    ReactDOM.render(
        React.createElement(Demo),
        document.getElementById('app')
    )
})()
