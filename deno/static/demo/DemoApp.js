/* global React, h */

const { Tabbordion, TabContent, TabLabel, TabPanel } = window.ReactTabbordion

const demoName = ['Tabs', 'Accordion', 'Multiselect Accordion']

// you can individually control checked, disabled, index, and visible of each panel
const sharedInitialPanels = [
    { checked: false, index: 0 },
    { checked: true, index: 1 },
    { checked: true, index: 2 },
]

// these are the props passed to Tabbordion
const demoProps = [
    {
        className: 'traditional-tabs',
        blockElements: {
            content: 'traditional-tabs-content',
            panel: 'traditional-tabs-panel',
            label: 'traditional-tabs-title',
        },
        initialPanels: sharedInitialPanels,
        name: 'demo',
    },
    {
        animateContent: 'height',
        className: 'accordion',
        blockElements: {
            animator: 'accordion-animator',
            content: 'accordion-content',
            panel: 'accordion-panel',
            label: 'accordion-title',
        },
        initialPanels: sharedInitialPanels,
        mode: 'toggle',
        name: 'demo',
    },
    {
        animateContent: 'marginTop',
        className: 'accordion',
        blockElements: {
            animator: 'accordion-animator',
            content: 'accordion-content',
            panel: 'accordion-panel',
            label: 'accordion-title',
        },
        initialPanels: sharedInitialPanels,
        mode: 'multiple',
        name: 'demo',
    },
]

const initialPanels = [
    { checked: false, index: 0 },
    { checked: false, index: 1 },
    { checked: true, index: 2 },
]

const optionList = { panel: 'option-item --horizontal', label: 'option-label --horizontal' }

function noop() {}

export function DemoApp() {
    const [panels, setPanels] = React.useState(initialPanels)
    const onChange = React.useCallback(
        ({ index }) =>
            setPanels(
                panels.map((panel, panelIndex) => ({
                    ...panel,
                    checked: index === panelIndex,
                }))
            ),
        [panels]
    )
    const onPanels = React.useCallback((panels) => setPanels(panels), [])
    const activeDemoIndex = panels.findIndex((panel) => panel.checked)
    const activeDemoProps = demoProps[activeDemoIndex]

    const optionProps = {
        className: 'option-list',
        blockElements: optionList,
        id: 'style',
        name: 'display-style',
        onChange,
        onPanels,
        panels,
    }

    return h`
        <article>
            <header>
                <p>Choose display style and mode:</p>
                <${Tabbordion} ...${optionProps}>
                    <${TabPanel} index=${0}>
                        <${TabLabel}>Tabs<//>
                    <//>
                    <${TabPanel} index=${1}>
                        <${TabLabel}>Accordion<//>
                    <//>
                    <${TabPanel} index=${2}>
                        <${TabLabel}>Multiselect Accordion<//>
                    <//>
                <//>
                <section>
                    <p>The component below remains the same, it just receives new props:</p>
                    <${Tabbordion} ...${activeDemoProps}>
                        <${TabPanel}>
                            <${TabLabel}>Panel #1<//>
                            <${TabContent}>
                                <h2>Content Be Here</h2>
                                <p>Unless we have nothing.</p>
                            <//>
                        <//>
                        <${TabPanel}>
                            <${TabLabel} id="paras">Panel #2<//>
                            <${TabContent}>
                                <h2>More Content Be Here</h2>
                                <p>But we have something.</p>
                            <//>
                        <//>
                        <${TabPanel}>
                            <${TabLabel}>Panel #3 - No Content<//>
                        <//>
                        <div className="demo">
                            This is just a normal div here together with the panels. <code>border-radius</code> on last
                            panel doesn't get confused :)
                        </div>
                    <//>
                </section>
            </header>
        </article>
    `
}
