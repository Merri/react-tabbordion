import { describe } from 'riteway'
import render from 'riteway/render-component'
import React from 'react'

import { TabPanelContext } from '../../components/Tabbordion'
import { defaultBemModifiers, defaultBemSeparator, defaultBlockElements } from '../../lib/bem'
import { Tabbordion, updatePanelsByToggle } from '../..'
import { createTestPanel } from '../utils.test'

const NOOP = () => {}

class MockPanel extends React.Component {
    static contextType = TabPanelContext
    render = () => null
}

describe('Tabbordion', async (assert) => {
    {
        const $ = render(<Tabbordion />) //
        Tabbordion.resetSSR()

        assert({
            given: 'nothing',
            should: 'render a ul with tablist role',
            actual: $('body').html(),
            expected: '<ul role="tablist"></ul>',
        })
    }

    {
        const $ = render(
            <Tabbordion component="div" role="presentation">
                Hello
            </Tabbordion>
        ) //
        Tabbordion.resetSSR()

        assert({
            given: 'component="div", role="presentation", and children',
            should: 'render a div with tablist role and children',
            actual: $('body').html(),
            expected: '<div role="tablist">Hello</div>',
        })
    }

    {
        const $ = render(
            <Tabbordion
                animateContent="height"
                bemModifiers={{}}
                bemSeparator="testseparator"
                blockElements={{}}
                initialPanels={[]}
                mode="multiple"
                name="testname"
                onChange={NOOP}
                onPanels={NOOP}
                panels={[]}
            />
        ) //
        Tabbordion.resetSSR()

        assert({
            given: 'supported custom props',
            should: 'not render them as HTML attributes',
            actual: $('body').html(),
            expected: '<ul role="tablist"></ul>',
        })
    }

    {
        const $ = render(
            <Tabbordion aria-hidden="true" className="tabbordion" id="id" style={{ backgroundColor: 'black' }} />
        ) //
        Tabbordion.resetSSR()

        assert({
            given: 'className, id, and other standard HTML attributes',
            should: 'render them as HTML attributes',
            actual: $('body').html(),
            expected:
                '<ul aria-hidden="true" class="tabbordion" id="id" style="background-color:black" role="tablist"></ul>',
        })
    }
})

describe('Tabbordion.getDerivedStateFromProps', async (assert) => {
    const defaultNextState = {
        panels: [],
        animateContent: false,
        bemModifiers: defaultBemModifiers,
        bemSeparator: defaultBemSeparator,
        blockElements: defaultBlockElements,
        id: 'tabbordion',
        inputProps: { 'data-state': 'tabbordion' },
        name: 'tabbordion',
        type: 'radio',
    }

    {
        const props = Tabbordion.defaultProps
        const state = { fallback: 'test-id' }

        assert({
            given: 'default props and state without panels',
            should: 'initialize first state with no panels',
            actual: Tabbordion.getDerivedStateFromProps(props, state),
            expected: { ...defaultNextState, id: 'test-id', name: 'test-id' },
        })
    }

    {
        const panel = createTestPanel({ checked: true, id: 'test-id', index: 0, isFirst: true, isLast: true })
        const props = {
            ...Tabbordion.defaultProps,
            children: <MockPanel />,
            panels: [panel],
        }
        const state = {
            ...defaultNextState,
            fallback: 'test-id',
            id: 'test-id',
            name: 'test-id',
            panels: [panel],
        }

        assert({
            given: 'state which is not different from existing state',
            should: 'return null',
            actual: Tabbordion.getDerivedStateFromProps(props, state),
            expected: null,
        })
    }

    {
        const modeToggleProps = { ...Tabbordion.defaultProps, mode: 'toggle' }
        const modeMultipleProps = { ...Tabbordion.defaultProps, mode: 'multiple' }
        const state = { ...defaultNextState, fallback: 'tabbordion' }

        assert({
            given: 'mode="toggle"',
            should: 'keep type attribute as radio',
            actual: Tabbordion.getDerivedStateFromProps(modeToggleProps, state),
            expected: null,
        })

        assert({
            given: 'mode="multiple"',
            should: 'update type attribute to checkbox',
            actual: Tabbordion.getDerivedStateFromProps(modeMultipleProps, state),
            expected: { type: 'checkbox' },
        })
    }

    {
        const props = {
            ...Tabbordion.defaultProps,
            children: [<MockPanel key={0} />, <MockPanel key={1} />, <MockPanel key={2} />],
        }
        const state = { fallback: 'tabbordion' }

        assert({
            given: 'default props and state with empty panels',
            should: 'initialize valid state for panels',
            actual: Tabbordion.getDerivedStateFromProps(props, state),
            expected: {
                ...defaultNextState,
                panels: [
                    createTestPanel({ checked: true, index: 0, isFirst: true }),
                    createTestPanel({ checked: false, index: 1, isBetween: true }),
                    createTestPanel({ checked: false, index: 2, isLast: true }),
                ],
            },
        })
    }

    {
        const props = {
            ...Tabbordion.defaultProps,
            children: [<MockPanel key={0} />, <MockPanel key={1} />, <MockPanel key={2} />],
            initialPanels: [{ index: 1, checked: true }],
            panels: [{ index: 2, checked: true }],
        }
        const state = { fallback: 'tabbordion' }

        assert({
            given: 'both initialPanels and panels props before first render',
            should: 'initialize state based on initialPanels',
            actual: Tabbordion.getDerivedStateFromProps(props, state),
            expected: {
                ...defaultNextState,
                panels: [
                    createTestPanel({ checked: false, index: 0, isFirst: true }),
                    createTestPanel({ checked: true, index: 1, isBetween: true }),
                    createTestPanel({ checked: false, index: 2, isLast: true }),
                ],
            },
        })

        assert({
            given: 'both initialPanels and panels props after first render without onPanels',
            should: 'update state based on own state',
            actual: Tabbordion.getDerivedStateFromProps(props, {
                ...defaultNextState,
                ...state,
                panels: [{ index: 0, visible: false }],
            }),
            expected: {
                panels: [
                    createTestPanel({ checked: false, disabled: false, index: 0, visible: false }),
                    createTestPanel({ checked: true, disabled: false, index: 1, isFirst: true, visible: true }),
                    createTestPanel({ checked: false, disabled: false, index: 2, isLast: true, visible: true }),
                ],
            },
        })

        assert({
            given: 'both initialPanels and panels props after first render with onPanels',
            should: 'update state based on panels prop',
            actual: Tabbordion.getDerivedStateFromProps(
                { ...props, onPanels: NOOP },
                {
                    ...defaultNextState,
                    ...state,
                    panels: [{ index: 0, visible: false }],
                }
            ),
            expected: {
                panels: [
                    createTestPanel({ checked: false, disabled: false, index: 0, isFirst: true, visible: true }),
                    createTestPanel({ checked: false, disabled: false, index: 1, isBetween: true, visible: true }),
                    createTestPanel({ checked: true, disabled: false, index: 2, isLast: true, visible: true }),
                ],
            },
        })
    }

    {
        const children = [
            <MockPanel key={0} index={0} checked={false} />,
            <MockPanel key={1} index="0" checked />,
            <MockPanel key={2} index={0} checked={false} />,
            <MockPanel key={3} index="" />,
            <MockPanel key={4} checked />,
        ]

        const props = { ...Tabbordion.defaultProps, children }
        const state = { ...defaultNextState, fallback: 'tabbordion' }

        assert({
            given: 'conflicting panel indexes',
            should: 'fix indexes and maintain non-conflicting state',
            actual: Tabbordion.getDerivedStateFromProps(props, state),
            expected: {
                panels: [
                    createTestPanel({ checked: false, index: 0, isFirst: true }),
                    createTestPanel({ checked: true, index: 1, isBetween: true }),
                    createTestPanel({ checked: false, index: 2, isBetween: true }),
                    createTestPanel({ checked: false, index: 3, isBetween: true }),
                    createTestPanel({ checked: false, index: 4, isLast: true }),
                ],
            },
        })
    }

    {
        const children = [
            <MockPanel key={0} index={2} checked={false} />,
            <MockPanel key={1} index="1" checked />,
            <MockPanel key={2} index={1e9} checked={false} />,
            <MockPanel key={3} index={-1} />,
        ]

        const props = { ...Tabbordion.defaultProps, children }
        const state = { ...defaultNextState, fallback: 'tabbordion' }

        assert({
            given: 'panel indexes not in order',
            should: 'keep indexes in the given order',
            actual: Tabbordion.getDerivedStateFromProps(props, state),
            expected: {
                panels: [
                    createTestPanel({ checked: false, index: 2, isFirst: true }),
                    createTestPanel({ checked: true, index: 1, isBetween: true }),
                    createTestPanel({ checked: false, index: 1000000000, isBetween: true }),
                    createTestPanel({ checked: false, index: -1, isLast: true }),
                ],
            },
        })
    }

    {
        const children = [
            <MockPanel key={0} checked={false} />,
            <MockPanel key={1} checked />,
            <MockPanel key={2} checked={false} />,
            <MockPanel key={3} checked />,
        ]

        const props = { ...Tabbordion.defaultProps, children, mode: 'multiple' }
        const state = { ...defaultNextState, fallback: 'tabbordion' }

        assert({
            given: 'mode="multiple" with multiple checked panels',
            should: 'allow multiple checked panels',
            actual: Tabbordion.getDerivedStateFromProps(props, state),
            expected: {
                panels: [
                    createTestPanel({ checked: false, index: 0, isFirst: true }),
                    createTestPanel({ checked: true, index: 1, isBetween: true }),
                    createTestPanel({ checked: false, index: 2, isBetween: true }),
                    createTestPanel({ checked: true, index: 3, isLast: true }),
                ],
                type: 'checkbox',
            },
        })
    }

    {
        const children = [
            <MockPanel key={0} checked={false} />,
            <MockPanel key={1} checked disabled />,
            <MockPanel key={2} checked={false} />,
            <MockPanel key={3} checked />,
        ]

        const props = { ...Tabbordion.defaultProps, children, mode: 'multiple' }
        const state = { ...defaultNextState, fallback: 'tabbordion' }

        assert({
            given: 'disabled panel',
            should: 'only reflect the disabled state',
            actual: Tabbordion.getDerivedStateFromProps(props, state),
            expected: {
                panels: [
                    createTestPanel({ checked: false, index: 0, isFirst: true }),
                    createTestPanel({ checked: true, index: 1, isBetween: true, disabled: true }),
                    createTestPanel({ checked: false, index: 2, isBetween: true }),
                    createTestPanel({ checked: true, index: 3, isLast: true }),
                ],
                type: 'checkbox',
            },
        })
    }

    {
        const children = [
            <MockPanel key={0} checked={false} />,
            <MockPanel key={1} checked disabled visible={false} />,
            <MockPanel key={2} checked={false} />,
            <MockPanel key={3} checked />,
        ]

        const props = { ...Tabbordion.defaultProps, children, mode: 'multiple' }
        const state = { ...defaultNextState, fallback: 'tabbordion' }

        assert({
            given: 'panel is made invisible',
            should: 'only reflect the visible state',
            actual: Tabbordion.getDerivedStateFromProps(props, state),
            expected: {
                panels: [
                    createTestPanel({ checked: false, index: 0, isFirst: true }),
                    createTestPanel({ checked: true, index: 1, isBetween: true, disabled: true, visible: false }),
                    createTestPanel({ checked: false, index: 2, isBetween: true }),
                    createTestPanel({ checked: true, index: 3, isLast: true }),
                ],
                type: 'checkbox',
            },
        })
    }
})

describe('Tabbordion.updatePanelsByToggle', async (assert) => {
    {
        const panels = [
            { checked: true, disabled: false, index: 0, visible: true },
            { checked: false, disabled: false, index: 1, visible: true },
            { checked: false, disabled: false, index: 2, visible: true },
            { checked: false, disabled: false, index: 3, visible: true },
        ]

        assert({
            given: 'invalid index is toggled',
            should: 'get the exact same state back',
            actual: {
                single: updatePanelsByToggle({ index: NaN, mode: 'single', panels }) === panels,
                toggle: updatePanelsByToggle({ index: -1, mode: 'toggle', panels }) === panels,
                multiple: updatePanelsByToggle({ mode: 'multiple', panels }) === panels,
            },
            expected: {
                single: true,
                toggle: true,
                multiple: true,
            },
        })

        assert({
            given: 'panel is toggled in mode="single" when it is already active',
            should: 'get the exact same state back',
            actual: updatePanelsByToggle({ index: 0, mode: 'single', panels }) === panels,
            expected: true,
        })

        assert({
            given: 'panel is toggled in mode="toggle" when it is already active',
            should: 'result in no panel being active',
            actual: updatePanelsByToggle({ index: 0, mode: 'toggle', panels }),
            expected: [
                { checked: false, disabled: false, index: 0, visible: true },
                { checked: false, disabled: false, index: 1, visible: true },
                { checked: false, disabled: false, index: 2, visible: true },
                { checked: false, disabled: false, index: 3, visible: true },
            ],
        })

        assert({
            given: 'panel is toggled in mode="multiple" when it is already active',
            should: 'result in no panel being active',
            actual: updatePanelsByToggle({ index: 0, mode: 'multiple', panels }),
            expected: [
                { checked: false, disabled: false, index: 0, visible: true },
                { checked: false, disabled: false, index: 1, visible: true },
                { checked: false, disabled: false, index: 2, visible: true },
                { checked: false, disabled: false, index: 3, visible: true },
            ],
        })

        assert({
            given: 'panel is toggled in mode="single" when another panel is active',
            should: 'activate panel and disactivate the other panel',
            actual: updatePanelsByToggle({ index: 1, mode: 'single', panels }),
            expected: [
                { checked: false, disabled: false, index: 0, visible: true },
                { checked: true, disabled: false, index: 1, visible: true },
                { checked: false, disabled: false, index: 2, visible: true },
                { checked: false, disabled: false, index: 3, visible: true },
            ],
        })

        assert({
            given: 'panel is toggled in mode="toggle" when another panel is active',
            should: 'activate panel and disactivate the other panel',
            actual: updatePanelsByToggle({ index: 1, mode: 'toggle', panels }),
            expected: [
                { checked: false, disabled: false, index: 0, visible: true },
                { checked: true, disabled: false, index: 1, visible: true },
                { checked: false, disabled: false, index: 2, visible: true },
                { checked: false, disabled: false, index: 3, visible: true },
            ],
        })

        assert({
            given: 'panel is toggled in mode="multiple" when another panel is active',
            should: 'have both panels activate',
            actual: updatePanelsByToggle({ index: 1, mode: 'multiple', panels }),
            expected: [
                { checked: true, disabled: false, index: 0, visible: true },
                { checked: true, disabled: false, index: 1, visible: true },
                { checked: false, disabled: false, index: 2, visible: true },
                { checked: false, disabled: false, index: 3, visible: true },
            ],
        })
    }

    {
        const panels = [
            { checked: true, disabled: false, index: 0, visible: true },
            { checked: true, disabled: false, index: 1, visible: true },
            { checked: true, disabled: false, index: 2, visible: true },
            { checked: true, disabled: false, index: 3, visible: true },
        ]

        assert({
            given: 'all panels are active and a panel is toggled in mode="single"',
            should: 'have only the activated panel remain active',
            actual: updatePanelsByToggle({ index: 0, mode: 'single', panels }),
            expected: [
                { checked: true, disabled: false, index: 0, visible: true },
                { checked: false, disabled: false, index: 1, visible: true },
                { checked: false, disabled: false, index: 2, visible: true },
                { checked: false, disabled: false, index: 3, visible: true },
            ],
        })

        assert({
            given: 'all panels are active and a panel is toggled in mode="toggle"',
            should: 'have no panel remain active',
            actual: updatePanelsByToggle({ index: 0, mode: 'toggle', panels }),
            expected: [
                { checked: false, disabled: false, index: 0, visible: true },
                { checked: false, disabled: false, index: 1, visible: true },
                { checked: false, disabled: false, index: 2, visible: true },
                { checked: false, disabled: false, index: 3, visible: true },
            ],
        })

        assert({
            given: 'all panels are active and a panel is toggled in mode="multiple"',
            should: 'inactivate the panel',
            actual: updatePanelsByToggle({ index: 0, mode: 'multiple', panels }),
            expected: [
                { checked: false, disabled: false, index: 0, visible: true },
                { checked: true, disabled: false, index: 1, visible: true },
                { checked: true, disabled: false, index: 2, visible: true },
                { checked: true, disabled: false, index: 3, visible: true },
            ],
        })
    }
})
