// 唯一的终结符
const EOF = Symbol('EOF')
const parser = {}
let currentToken = null
let currentAttribute = null

function emit(token) {
    console.log(token)
}

function data(c) {
    if (c === '<') {
        return tagOpen
    } else if (c == EOF) {
        emit({
            type: 'EOF'
        })
        return;
    } else {
        emit({
            type: 'text',
            content: c
        })
        return data
    }
}


/**
 * 标签开始有3种状态
 * 1. 结束标签, < 后跟 /
 * 2. 正常标签, < 后跟 英文字母
 * 3. 自封闭标签
 */
function tagOpen(c) {
    if (c === '/') {
        return endTagOpen
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        return;
    }
}

/**
 * 结束标签开始
 * 1. 后跟英文字母, tagName
 * 2. 后跟 > 或 EOF 都要报错
 */
function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c === '>') {

    } else if (c === EOF) {

    } else {

    }
}

/**
 * 当 tagName 遇到空格时, 代表后跟属性了. <html data-xx="">
 * 1. tagName 以空白符结束, 有效的空白符有4种, tad, 换行符, 禁止符和空格
 * 2. 自封闭标签 <html/>
 * 3. 标签结束, 回到 data 解析下一个标签
 * @param c
 */
function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c === '/') {
        return selfClosingStartTag
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName
    } else if (c === '>') {
        emit(currentToken)
        return data
    } else {
        return tagName
    }
}

/**
 * 暂时不处理属性, 只等待 > 代表标签结束
 */
function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c)
    } else if (c === '=') {

    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c)
    } else if (c === '=') {
        return beforeAttributeValue
    } else if (c === '\u0000') {

    } else if (c === '\"' || c === "'" || c === '<') {

    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return beforeAttributeValue
    } else if (c === '\"') {
        return doubleQuotedAttributeValue
    } else if (c === '\'') {
        return singleQuotedAttributeValue
    } else if (c === '>') {

    } else {
        return UnquotedAttributeValue(c)
    }
}

function doubleQuotedAttributeValue(c) {
    if (c == '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c) {
    if (c == '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function afterQuotedAttributeValue(c) {

}

function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if (c =='/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if (c =='>'){
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c == '\u0000'){

    }
}

function afterAttributeName(c) {

}

/**
 * <html/ 后只能跟 >, 别的都会报错
 */
function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true
        return data
    } else if (c === 'EOF') {

    } else {

    }
}

parser.parseHTML = (html) => {
    let state = data
    for (const c of html) {
        state = state(c)
    }
    state = state(EOF)
}


module.exports = parser