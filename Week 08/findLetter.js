/**
 * 在目标字符串中寻找给定字符
 * @param str 目标字符串
 * @param letter 字母
 */
function findLetter(str, letter) {
  return str.indexOf(letter)
}

findLetter('Hello World', 'r')


// function findWord(str) {
//   if (str === 'ab') return true
//   if (str.length < 'ab'.length) return false
//
//   let hasA = false
//   for (const s of str) {
//     if (s === 'a') {
//       hasA = true
//     } else if (hasA && s === 'b') {
//       return true
//     } else {
//       hasA = false
//     }
//   }
//
//   return false
// }


// 找到字符 abcdef
function findWord(str) {
  if (str === 'abcdef') return true
  if (str.length < 'abcdef'.length) return false

  let hasA = false
  let hasB = false
  let hasC = false
  let hasD = false
  let hasE = false
  for (const s of str) {
    if (s === 'a') {
      hasA = true
    } else if (hasA && s === 'b') {
      hasA = false
      hasB = true
    } else if (hasB && s === 'c') {
      hasB = false
      hasC = true
    } else if (hasC && s === 'd') {
      hasC = false
      hasD = true
    } else if (hasD && s === 'e') {
      hasD = false
      hasE = true
    } else if (hasE && s === 'f') {
      return true
    } else {
      hasA = false
      hasB = false
      hasC = false
      hasD = false
      hasE = false
    }
  }

  return false
}

console.log(findWord('aabbcdeff'))

