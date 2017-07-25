export function addSubscriber(subscribers) {
    return function(component) {
        if (!subscribers.includes(component)) {
            subscribers.push(component)
        }
    }
}

export function removeSubscriber(subscribers) {
    return function(component) {
        const index = subscribers.indexOf(component)

        if (~index) {
            subscribers.splice(index, 1)
        }
    }
}
