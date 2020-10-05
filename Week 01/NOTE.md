学习笔记

## TicTacToe

AI 实现原理: 递归, 对方最好的选择, 是我方最坏的选择

胜负剪枝: 一旦找到能赢的点, 就不找了. 能保证赢, 但不保证赢得多

使用 `{}` 创建局部作用域

深拷贝:
- `JSON.parse(JSON.stringify())`
- `Object.create()`: 节省内存空间

## 异步
异步生成器 async gentorate
- 有3个方法, next, throw return
异步迭代语句 for-await-of: 只能用在 async 内部
AsyncIterator 接口: next 方法返回 {value, done} 的 promise

```
var asyncIterable = {
  [Symbol.asyncIterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 3) {
          return Promise.resolve({ value: this.i++, done: false })
        }
        return Promise.resolve({done: true})
      }
    }
  }
}

(async function() {
  for await (num of asyncIterable) {
    console.log(num)
  }
})()
```
