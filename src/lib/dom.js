/** Takes DOM element and returns height of given element in pixels. */
export function getElementHeight(element) {
    const bounds = element.getBoundingClientRect()
    return Math.ceil(bounds.bottom - bounds.top)
}
