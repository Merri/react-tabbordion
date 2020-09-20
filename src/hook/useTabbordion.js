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

export function useTabbordion(options) {
    if (!options || typeof options !== 'object') throw new Error('useTabbordion: must give options object!')
    const { hydrated, id, initial = null, multiple = false, toggle = false } = options
    if (!id) throw new Error('useTabbordion: must give ID!')
    const accordion = multiple || toggle
    const activeProps = useRef(null)
    const [keysRaw, setKeys] = useState(() => (Array.isArray(initial) ? initial : initial != null ? [initial] : []))
    const [panelIndex] = useState(() => new Map())
    const [panelKey] = useState(() => new Map())
    const total = useRef(0)

    // protection against invalid states when doing edge cases (changing to/from toggle or multiple mode)
    const keys = useMemo(() =>
        (!accordion && keysRaw.length === 0 && panelKey.has(0) && [panelKey.get(0)]) ||
        (!multiple && keysRaw.length > 1 && keysRaw.slice(0, 1)) ||
        keysRaw
    , [accordion, keysRaw, multiple])

    useEffect(() => {
        if (keys !== keysRaw) setKeys(keys)
    }, [keys, keysRaw])

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // allow telling hydration state outside of component to allow for more efficient renders when in SPA mode
    const isHydrated = hydrated != null ? hydrated : isMounted

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
                    if (accordion && keys.length) {
                        event.preventDefault()
                        setKeys([])
                    }
                    break
                default:
            }
        },
        [accordion, id, keys, multiple, panelKey, setKeys]
    )

    const setActive = useCallback(
        (nextKey) => {
            if (Array.isArray(nextKey)) {
                if (!accordion) return
                const keys = nextKey.filter(key => panelIndex.has(key))
                if (keys.length > 1 && !multiple) return
                setKeys(keys)
            } else if (panelIndex.has(nextKey)) {
                setKeys([nextKey])
            } else if (nextKey == null && accordion) {
                setKeys([])
            }
        },
        [accordion, multiple, panelIndex]
    )

    const [tabButton, tabItem, tabPanel, tabState] = useMemo(() => {
        return ['button', 'item', 'panel', 'state'].map((type) => (nextKey) => {
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
            // in SSR serve the HTML in format that allows CSS-only usage when JavaScript is disabled
            const ariaHidden = (isHydrated && !checked) || undefined
            const props = {
                button: {
                    'aria-controls': panelId,
                    'aria-selected': checked,
                    id: tabId,
                    onClick: onChangeOrClick,
                    onKeyDown,
                    role: 'tab',
                    tabIndex: accordion && keys.length === 0 ? undefined : checked ? 0 : -1,
                    type: 'button',
                    value,
                },
                input: {
                    checked,
                    id: tabId,
                    onChange: onChangeOrClick,
                    onKeyDown,
                    name: id,
                    type: accordion ? 'checkbox' : 'radio',
                    value,
                },
                item: {
                    'aria-controls': panelId,
                    'aria-labelledby': labelId,
                    'aria-selected': checked,
                    role: 'tab',
                },
                label: {
                    id: labelId,
                    htmlFor: tabId,
                },
                panel: {
                    'aria-expanded': checked,
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
    }, [accordion, id, isHydrated, keys, onChangeOrClick, onKeyDown, panelIndex, panelKey])

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
