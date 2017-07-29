/** Using lodash/throttle would increase UMD size by over 4 kB over this inline addition */
function throttle(func, wait, options = {}) {
    let context, args, result, previous, timeout

    function later() {
        previous = options.leading === false ? 0 : Date.now()
        timeout = null
        result = func.apply(context, args)

        if (!timeout) {
            context = args = null
        }
    }

    return function() {
        const now = Date.now()

        if (!previous && options.leading === false) {
            previous = now
        }

        const remaining = wait - (now - previous)

        context = this
        args = arguments

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }

            previous = now
            result = func.apply(context, args)

            if (!timeout) {
                context = args = null
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining)
        }

        return result
    }
}

const resizeCallbacks = []

/** optimized only to be called on panels that actively can do transitions */
function triggerResize(callback) {
    const { animateContent, checked } = callback.getState()
    if ((animateContent === 'height' && checked) || (animateContent === 'marginTop' && !checked)) {
        callback()
    }
}

/** execute only five times per second: this ought to be a pretty good balance between performance vs. humanity */
const onResize = throttle(function onResize() {
    resizeCallbacks.forEach(triggerResize)
}, 200, { leading: false })

export function addResizeListener(callback) {
    if (resizeCallbacks.length === 0) {
        window.addEventListener('resize', onResize, false)
    }

    if (!resizeCallbacks.includes(callback)) {
        resizeCallbacks.push(callback)
    }
}

export function removeResizeListener(callback) {
    const index = resizeCallbacks.indexOf(callback)

    if (~index) {
        resizeCallbacks.splice(index, 1)
    }

    if (resizeCallbacks.length === 0) {
        window.removeEventListener('resize', onResize, false)
    }
}
