// 用状态机处理 'abababx' 的字符串
// TODO: 用状态机处理未知的 pattern (参考 KMP)
function match(string) {
    let state = start
    for (const c of string) {
        console.log(c, state.name)
        state = state(c)
    }
    return state === end
}

function start (c) {
    if (c === 'a') {
        return foundA
    } else {
        return start
    }
}

function foundA(c) {
    if (c === 'b') {
        return foundB
    } else {
        return start(c)
    }
}

function foundB(c) {
    if (c === 'a') {
        return foundA2
    } else {
        return start(c)
    }
}

function foundA2(c) {
    if (c === 'b') {
        return foundB2
    } else {
        return start(c)
    }
}

function foundB2(c) {
    if (c === 'a') {
        return foundA3
    } else {
        return start(c)
    }
}

function foundA3(c) {
    if (c === 'b') {
        return foundB3
    } else {
        return start(c)
    }
}

// 关键在 最后一个匹配字母如果没有匹配成功, 需要进入哪个状态
// 直接回到 start 不对的, 应该回到上一个状态看看对不对
function foundB3(c) {
    if (c === 'x') {
        return end
    } else {
        return foundB2(c)
    }
}

function end(c) {
    return end
}

console.log(
    match('ababababxababxx')
)
