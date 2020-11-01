/**
 * kmp, leetcode 44
 * @param source 原字符串
 * @param pattern 匹配字符串
 * @return {Number} 有重复字符串返回出现的第一个位置, 否则返回-1
 */
function kmp(source, pattern) {
    // 1. 计算 PMT
    let table = new Array(pattern.length).fill(0)

    // 用局部作用域 防止暴露 i j
    {
        // 从第2位开始, 第1位肯定是不会有重复的
        let i = 1, j = 0;

        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++j, ++i;
                table[i] = j;
            } else {
                if (j > 0) {
                    j = table[j]
                } else {
                    ++i;
                }
            }
        }
    }

    // console.log(table)

    // 计算重复位置, 只有 pattern 的指针会回退
    {
        // i - source, j - pattern
        let i = 0, j = 0;

        while (i < source.length) {
            if (source[i] === pattern[j]) {
                ++j, ++i;
            } else {
                if (j > 0) {
                    j = table[j]
                } else {
                    ++i;
                }
            }
            if (j === pattern.length) {
                return i - pattern.length
            }
        }
        // 遍历了整个 source 都没有匹配上
        return -1
    }
}

console.log(kmp('ababcab', 'bca'))
