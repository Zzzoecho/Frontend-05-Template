/**
 * 通配符匹配, leetcode 44
 * @param source
 * @param pattern
 * @return {boolean} 是否匹配成功
 */
function wildcard (source, pattern) {
    let starCount = 0

    // 寻找星号
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === '*') {
            starCount++;
        }
    }
    // 没有 * 号的情况
    if (starCount === 0) {
        // ? 只能匹配一个字符, 所以 source 和 pattern 长度相等
        if (source.length !== pattern.length) return false
        // 直接遍历字符串如果不一一相等则不匹配
        for (let i = 0; i < pattern.length; i++) {
            if (source[i] !== pattern[i] && pattern[i] !== '?') {
                return false
            }
        }
        return true
    }

    // 以 * 号为分隔符, 重点关注前后两个字符串, 中间的字符串可以当做 KMP
    let i = 0
    let lastIndex = 0

    // 第一个 * 号前的字符串
    for (i = 0; pattern[i] !== '*'; i++) {
        if (source[i] !== pattern[i] && pattern[i] !== '?') {
            return false
        }
    }

    lastIndex = i

    // 中间以 * 号分隔的多个字符串
    for (let j = 0; j < starCount - 1; j++) {
        // 略过 *
        i++;
        let subPattern = ''
        while (pattern[i] !== '*') {
            subPattern += pattern[i];
            i++;
        }
        // 将 subPatter 中的 ? 替换成 正则中的任意符
        // 全局匹配会匹配到结尾出问题, 只匹配到
        let reg = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g')
        reg.lastIndex = lastIndex

        let str = source.substring(0, source.length - 1)
        // 说明首尾都是空
        if (subPattern.length + starCount === pattern.length) {
            str = source
        }
        let exec = reg.exec(str)

        if (!exec) {
            return false
        }

        lastIndex = reg.lastIndex
    }

    // 尾部, 从后往前匹配, 直到 * 号为止
    for (let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j++) {
        if (source[source.length - j] !== pattern[pattern.length - j] && pattern[pattern.length - j] !== '?') {
            return false
        }
    }

    return true
}

// console.log(wildcard('abcabczzzde', '*abc???de*')) // true
// console.log(wildcard('mississippi', 'm??*ss*?ipi')) // false
// console.log(wildcard('b', '?*?')) // false
console.log(wildcard('', '*****')) // true
