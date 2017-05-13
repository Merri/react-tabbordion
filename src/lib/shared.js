const sharedState = {
    index: 0,
}

export function tabbordionUuid() {
    return 'tabbordion-' + sharedState.index++
}