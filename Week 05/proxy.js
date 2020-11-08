let callbacks = new Map()
let reactivities = new Map()
let usedReactivities = []

export function effect(callback) {
    usedReactivities = []
    callback()

    for (const reactivity of usedReactivities) {
        if (!callbacks.has(reactivity[0])) {
            callbacks.set(reactivity[0], new Map())
        }
        // 第二层的 Map
        if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
            callbacks.get(reactivity[0]).set(reactivity[1], [])
        }
        callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
    }
}

export function reactive(object) {
    // 如果已经创建过 Proxy 直接拿
    if (reactivities.has(object)) {
        return reactivities.get(object)
    }
    let proxy = new Proxy(object, {
        set(target, p, value) {
            target[p] = value
            // 当 set 时 调用 callback
            if (callbacks.get(target)) {
                if (callbacks.get(target).get(p)) {
                    for (const callback of callbacks.get(target).get(p)) {
                        callback()
                    }
                }
            }

            return target[p]
        },
        get(target, p) {
            // get 时, 把他推入依赖收集中
            usedReactivities.push([target, p])

            // 获取的元素是对象时
            if (typeof target[p] === 'object') {
                return reactive(target[p])
            }
            return target[p]
        }
    })

    reactivities.set(object, proxy)
    return proxy
}