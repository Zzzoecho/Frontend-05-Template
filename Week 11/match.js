let selectList = []
let curToken = {
    type: 'type',
    name: ''
}
// EOF -> {

function match (selector, element) {
    let state = start
    for (const c of selector) {
        state = state(c)
    }
    console.log(curToken)
    end()
    return true
}

function start(c) {
    if (c === '#') {
        curToken = {
            type: 'id',
            name: '',
        }
    } else if (c.match(/^[a-zA-Z]$/)) {
        return typeName(c)
    } else if (c.match(/^[\t\n\f ]$/)) {
        return tagEnd
    } else {
        return end
    }
}

function typeName(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        curToken.name += c
        return typeName
    } else {
        return tagEnd(c)
    }
}

function tagEnd(c) {
    selectList.push(curToken)
    curToken = {
        type: '',
        name: ''
    }
    return start(c)
}

function end() {
    selectList.push(curToken)
    console.log('finish', selectList)
}





match('div span#id', document.getElementById('id'))