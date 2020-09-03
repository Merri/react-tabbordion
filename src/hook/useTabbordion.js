import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

function getNextIndex(elements, element, key) {
    if (key === 'Home') return 0
    if (key === 'End') return elements.length - 1
    const index = elements.indexOf(element)
    if (key === 'ArrowRight') return (index + 1) % elements.length
    return (elements.length + index - 1) % elements.length
}

function updateKeysFromIndex(index, keys, panelKey, setKey, accordion, multiple) {
    const nextKey = panelKey.get(index)
    if (keys.includes(nextKey) && accordion) {
        setKey(keys.filter((key) => key !== nextKey))
    } else if (nextKey != null) {
        if (!multiple) setKey([nextKey])
        else setKey(keys.concat(nextKey))
    }
}

export function useTabbordion({ focusClick = '', id, initial = null, multiple = false, toggle = false }) {
    if (!id) throw new Error('useTabbordion: must give ID!')
    const accordion = multiple || toggle
    const activeProps = useRef(null)
    const [keys, setKeys] = useState(() => (Array.isArray(initial) ? initial : initial != null ? [initial] : []))
    const [panelIndex] = useState(() => new Map())
    const [panelKey] = useState(() => new Map())
    const total = useRef(0)
    // make it possible to access contents of server side rendered HTML even when JS is disabled
    const [jsEnabled, setJsEnabled] = useState(false)
    useEffect(() => {
        if (!accordion && keys.length === 0 && panelKey.has(0)) setKeys([panelKey.get(0)])
        setJsEnabled(true)
        // eslint-disable-next-line
    }, [])

    const onChangeOrClick = useCallback(
        (event) => {
            if (event.defaultPrevented) return
            updateKeysFromIndex(~~event.target.value, keys, panelKey, setKeys, accordion, multiple)
        },
        [accordion, keys, multiple, panelKey, setKeys]
    )

    const onKeyDown = useCallback(
        (event) => {
            if (event.defaultPrevented) return
            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                case 'End':
                case 'Home':
                    event.preventDefault()
                    const selector =
                        event.target.tagName === 'INPUT'
                            ? `[name="${event.target.name.replace(/"/g, '\\"')}"]`
                            : `button[role="tab"][id^="${id.replace(/"/g, '\\"')}"]`
                    const elements = Array.from(document.getElementById(id).querySelectorAll(selector))
                    const nextIndex = getNextIndex(elements, event.target, event.key)
                    elements[nextIndex].focus()
                    if (!accordion) setKeys([panelKey.get(~~elements[nextIndex].value)])
                    break
                case 'Enter':
                case ' ':
                    event.preventDefault()
                    updateKeysFromIndex(~~event.target.value, keys, panelKey, setKeys, accordion, multiple)
                    break
                case 'Delete':
                case 'Escape':
                    if (accordion && keys.length) setKeys([])
                    break
                default:
            }
        },
        [accordion, id, keys, multiple, panelKey, setKeys]
    )

    const onToggleFocus = useCallback(
        (event) => {
            if (!focusClick || event.defaultPrevented) return
            let target = event.target
            while (target && target.value == null && event.target.htmlFor == null) target = target.parentElement
            if (!target) return
            const id = target.value != null ? target.id : target.htmlFor
            const closing =
                accordion &&
                (target.value != null ? target.getAttribute('tabindex') === '0' : document.getElementById(id).checked)
            // the code keeps active focus state out of tab element and within panel, except if panel is hidden
            if (!closing || event.type === 'mousedown') {
                if (focusClick === 'panel') {
                    const panel = document.getElementById(id + '-panel')
                    if (panel) requestAnimationFrame(() => panel.tabIndex === 0 && panel.focus())
                } else {
                    requestAnimationFrame(() => document.activeElement.blur())
                }
            } else if (closing && event.type === 'mouseup') {
                if (focusClick === 'panel') document.getElementById(id).focus()
                else document.activeElement.blur()
            }
        },
        [accordion, focusClick]
    )

    const setActive = useCallback(
        (nextKey) => {
            if (Array.isArray(nextKey)) {
                if (!accordion) return
                const keys = nextKey.filter(panelIndex.has)
                if (keys.length > 1 && !multiple) return
                setKeysState(keys)
                return
            } else if (panelIndex.has(nextKey)) setKeysState([nextKey])
            else if (nextKey == null && accordion) setKeysState([])
        },
        [accordion, multiple, panelIndex]
    )

    const [tabButton, tabItem, tabPanel, tabState] = useMemo(() => {
        return ['button', 'item', 'panel', 'state'].map((type) => (nextKey, disabled) => {
            if (nextKey == null) {
                throw new Error('useTabbordion.tab' + type[0].toUpperCase() + type.slice(1) + ': must give a key!')
            }
            if (!panelIndex.has(nextKey)) {
                const newIndex = total.current++
                panelIndex.set(nextKey, newIndex)
                panelKey.set(newIndex, nextKey)
            }
            const index = panelIndex.get(nextKey)
            const checked = keys.includes(nextKey) || (!accordion && keys.length === 0 && index === 0)
            const value = `${index}`
            const tabId = `${id}-${index}`
            const labelId = `${tabId}-label`
            const panelId = `${tabId}-panel`
            // override because tabPanel is for UI use case which only works with JavaScript
            const ariaHidden = ((type === 'panel' || jsEnabled) && !checked) || undefined
            const props = {
                button: {
                    'aria-controls': panelId,
                    'aria-selected': checked,
                    disabled,
                    id: tabId,
                    onClick: onChangeOrClick,
                    onKeyDown,
                    onMouseDown: onToggleFocus,
                    onMouseUp: onToggleFocus,
                    role: 'tab',
                    tabIndex: accordion && keys.length === 0 ? undefined : checked ? 0 : -1,
                    type: 'button',
                    value,
                },
                input: {
                    'aria-controls': panelId,
                    'aria-labelledby': labelId,
                    'aria-selected': checked,
                    checked,
                    disabled,
                    id: tabId,
                    onChange: onChangeOrClick,
                    onKeyDown,
                    name: id,
                    type: accordion ? 'checkbox' : 'radio',
                    role: 'tab',
                    value,
                },
                item: { 'aria-disabled': disabled, 'aria-expanded': checked },
                label: {
                    'aria-disabled': disabled,
                    id: labelId,
                    htmlFor: tabId,
                    onMouseDown: onToggleFocus,
                    onMouseUp: onToggleFocus,
                },
                panel: {
                    'aria-disabled': disabled,
                    'aria-hidden': ariaHidden,
                    'aria-labelledby': type === 'panel' ? tabId : labelId,
                    id: panelId,
                    role: 'tabpanel',
                    tabIndex: ariaHidden ? -1 : 0,
                },
                state: { checked, name: id, tab: nextKey, tabId, value },
            }
            activeProps.current = props
            return activeProps.current[type]
        })
    }, [accordion, id, jsEnabled, keys, onChangeOrClick, onKeyDown, onToggleFocus, panelIndex, panelKey])

    const getProps = useCallback((type) => {
        if (activeProps.current == null) throw new Error('useTabbordion.getProps: must call .tabItem first!')
        if (type in activeProps.current) return activeProps.current[type]
        throw new Error(
            'useTabbordion.getProps: must give one of "' +
                Object.keys(activeProps.current).join(', ') +
                '" but got: ' +
                type
        )
    }, [])

    return useMemo(
        () => ({
            active: multiple ? keys.slice(0) : keys[0] || null,
            getProps,
            setActive,
            tabButton,
            tabItem,
            tabList: { id, role: 'tablist' },
            tabPanel,
            tabState,
        }),
        [getProps, id, keys, multiple, setActive, tabButton, tabItem, tabPanel, tabState]
    )
}
