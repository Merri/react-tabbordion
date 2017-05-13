/*
 * Generates BEM convention style class names and decorates with given modifiers.
 * @param {string} blockElement Space separated list of classes representing block and element level items of BEM.
 *                              May also include classes beginning with a separator which will be extended.
 * @param {array} modifiers List of modifiers to use.
 * @param {string} separator Separator to use between block-element and a modifier.
 * @return {string} className where the first item in space separated list is extended with given modifiers.
 */
export function bemClassName(blockElement, modifiers, separator = '--') {
    // we prefer strings here
    if (blockElement == null) {
        return null
    } else if (typeof blockElement !== 'string') {
        blockElement = String(blockElement)
    }

    let otherClasses = ''
    let i = blockElement.indexOf(' ')

    // separate main block-element from other block-elements and separator-modifiers
    if (i >= 0) {
        otherClasses = blockElement.slice(i)
        blockElement = blockElement.slice(0, i)
    }

    // we need this often enough
    const modifierPrefix = ' ' + blockElement + separator

    // prefix separator-modifiers with the block-element
    if (otherClasses && separator) {
        const spaceAndSeparator = ' ' + separator

        // a case where for loop seems a nicer choice than generating a "replace all" RegExp
        for (
            i = otherClasses.indexOf(spaceAndSeparator);
            i >= 0;
            i = otherClasses.indexOf(spaceAndSeparator, i + blockElement.length)
        ) {
            otherClasses = otherClasses.replace(spaceAndSeparator, modifierPrefix)
        }
    }

    if (!Array.isArray(modifiers)) {
        return blockElement + otherClasses
    }

    // generates the final className and includes given modifiers from the array
    return modifiers.reduce((className, modifier) => {
        if (modifier != null) {
            return className + modifierPrefix + modifier
        } else {
            return className
        }
    }, blockElement) + otherClasses
}
