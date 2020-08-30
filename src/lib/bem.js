export const defaultBemModifiers = {
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
}

export const defaultBemSeparator = '--'

export const defaultBlockElements = {
    animator: 'panel__animator',
    content: 'panel__content',
    label: 'panel__label',
    panel: 'panel',
}

/**
 * Generates BEM convention style class names and decorates with given modifiers.
 * @param {object} blockElements Key value pairs where value represents string to expand with modifiers.
 * @param {string} key Item to pick from blockElements.
 * @param {array} modifiers List of active modifiers.
 * @param {string} separator Separator to use between block-element and a modifier.
 * @return {null|string} className where the first item in space separated list is extended with given modifiers.
 */
export function bemClassName(blockElements, key, modifiers, separator = '--') {
    let blockElement = blockElements && blockElements[key]

    if (blockElement == null || typeof blockElement !== 'string') {
        return null
    }

    let names = ''
    let i = blockElement.indexOf(' ')

    if (i >= 0) {
        names = blockElement.slice(i)
        blockElement = blockElement.slice(0, i)
    }

    const prefix = ' ' + blockElement + separator

    if (names && separator) {
        const missingPrefix = ' ' + separator
        for (i = names.indexOf(missingPrefix); i >= 0; i = names.indexOf(missingPrefix, i + blockElement.length)) {
            names = names.replace(missingPrefix, prefix)
        }
    }

    return Array.isArray(modifiers)
        ? modifiers.reduce(
              (className, modifier) => (typeof modifier !== 'string' ? className : className + prefix + modifier),
              blockElement
          ) + names
        : blockElement + names
}
