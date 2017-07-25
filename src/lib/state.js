const EMPTY_ARRAY = []

/** Micro optimization: always use the same reference to empty arrays */
export function getArray(array) {
    return Array.isArray(array) && array.length > 0 ? array : EMPTY_ARRAY
}

export function getChecked({ checked }) {
    return checked
}

export function getDisabled({ disabled }) {
    return disabled
}

export function getIndex({ index }) {
    return index
}

export function isShallowlyDifferent(obj1, obj2) {
    if (obj1 === obj2) {
        return false
    }

    const keys1 = Object.keys(obj1 || {}).sort()
    const keys2 = Object.keys(obj2 || {}).sort()

    if (keys1.length !== keys2.length) {
        return true
    }

    return keys1.some(
        (key, index) => key !== keys2[index] || (
            Array.isArray(obj1[key]) ? isShallowlyDifferentArray(obj1[key], obj2[key]) : obj1[key] !== obj2[key]
        )
    )
}

export function isShallowlyDifferentArray(arr1 = [], arr2 = []) {
    if (arr1.length !== arr2.length) {
        return true
    }

    return arr1.some((item, index) => isShallowlyDifferent(item, arr2[index]))
}
