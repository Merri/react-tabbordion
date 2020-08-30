// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
const objectIs =
    Object.is ||
    function (x, y) {
        return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y
    }

const typed = new Set([
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
])

if (typeof BigInt64Array !== 'undefined') typed.add(BigInt64Array).add(BigUint64Array)

/**
 * Compares two variables for equality. Supports primitives, objects, Map, Set, Date, RegExp. Can process arrays and Maps deeply.
 * @param  {any} a Variable A
 * @param  {any} b Variable B
 * @param  {Number} maxIterableDepth How deep to process arrays and Maps. Defaults to one level deep. 0 to disable. Infinity to go as deep as possible.
 * @return {boolean}
 */
export function equal(a, b, maxIterableDepth = 1) {
    if (objectIs(a, b)) return true

    if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false

    const constructor = a.constructor
    if (constructor !== b.constructor) return false
    if (constructor === RegExp) return a.source === b.source && a.flags === b.flags

    if (constructor.BYTES_PER_ELEMENT && typed.has(constructor)) {
        let i = a.length
        if (i === b.length) while (i-- > 0 && a[i] === b[i]) {}
        return i === -1
    }

    if (Array.isArray(a)) {
        if (maxIterableDepth < 1) return false
        const nextDepth = maxIterableDepth - 1
        let i = a.length
        if (i === b.length) while (i-- > 0 && equal(a[i], b[i], nextDepth)) {}
        return i === -1
    }

    if (a instanceof Map) {
        if (maxIterableDepth < 1) return false
        const nextDepth = maxIterableDepth - 1
        if (a.size !== b.size) return false
        const keys = a.keys()
        return keys.every(b.has) && keys.every((key) => equal(a.get(key), b.get(key), nextDepth))
    }

    if (a instanceof Set) {
        if (a.size !== b.size) return false
        if (!a.keys().every(b.has)) return false
        return true
    }

    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf()
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString()

    const keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) return false
    if (!keys.every(Object.prototype.hasOwnProperty.bind(b))) return false

    // avoid traversing _owner in React elements as these have circular references
    const isReactElement = '$$typeof' in a
    return isReactElement
        ? keys.every((key) => key === '_owner' || equal(a[key], b[key], maxIterableDepth))
        : keys.every((key) => equal(a[key], b[key], maxIterableDepth))
}
