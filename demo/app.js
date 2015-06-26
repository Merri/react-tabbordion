;(function() {
    var Demo = React.createClass({
        displayName: 'Demo',
        
        getInitialState: function() {
            var INITIAL = 0

            return {
                index: INITIAL,
                demoProps: [
                    {
                        demo: 'Tabs',
                        className: 'traditional-tabs',
                        classNames: {
                            content: 'traditional-tabs-content',
                            panel: 'traditional-tabs-panel',
                            title: 'traditional-tabs-title'
                        },
                        initialIndex: INITIAL
                    },
                    {
                        animateContent: 'height',
                        demo: 'Accordion',
                        className: 'accordion',
                        classNames: {
                            animator: 'accordion-animator',
                            content: 'accordion-content',
                            panel: 'accordion-panel',
                            title: 'accordion-title'
                        },
                        initialIndex: INITIAL,
                        mode: 'toggle'
                    },
                    {
                        animateContent: 'height',
                        demo: 'Multiselect accordion',
                        className: 'accordion',
                        classNames: {
                            animator: 'accordion-animator',
                            content: 'accordion-content',
                            panel: 'accordion-panel',
                            title: 'accordion-title'
                        },
                        initialIndex: INITIAL,
                        mode: 'multiple'
                    }
                ]
            }
        },

        render: function() {
            return React.DOM.article(
                {},
                React.DOM.header(
                    {},
                    React.DOM.p({}, 'Choose display style and mode:'),
                    React.createElement(
                        Tabbordion,
                        {
                            className: 'option-list',
                            classNames: {
                                panel: 'option-item option-item--horizontal',
                                title: 'option-label option-label--horizontal'
                            },
                            initialIndex: this.state.index,
                            onChange: this.setState.bind(this)
                        },
                        this.state.demoProps.map(function(props, index) {
                            return React.createElement(
                                Panel,
                                { key: 'demo-' + index, title: React.DOM.span({}, props.demo) }
                            )
                        })
                    )
                ),
                React.DOM.section(
                    {},
                    React.DOM.p({}, 'The component below remains the same, it just receives new props:'),
                    React.createElement(
                        Tabbordion,
                        this.state.demoProps[this.state.index],
                        React.createElement(
                            Panel,
                            { title: React.DOM.span({}, 'Panel #1') },
                            React.DOM.h2({}, 'Content Be Here'),
                            React.DOM.p({}, 'Unless we have nothing.')
                        ),
                        React.createElement(
                            Panel,
                            { title: React.DOM.span({}, 'Panel #2') },
                            React.DOM.h2({}, 'More Content Be Here'),
                            React.DOM.p({}, 'But we have something.')
                        ),
                        React.createElement(
                            Panel,
                            { title: React.DOM.span({}, 'Panel #3 - No Content') }
                        ),
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

    React.render(React.createElement(Demo), document.getElementById('app'))
})();