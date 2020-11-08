学习笔记

## Proxy
可自定义基本操作的行为

```js
const p = new Proxy(target, handler)
```
- target: 要代理的对象
- handler: 对象, 通常以函数作为属性.

## Vue 双向绑定
双向绑定是在单向绑定的基础上给可输入元素添加了监听事件, 来动态修改 data

## CSSOM
> CSS Object Model, CSS 对象模型. 是树形形式的所有 CSS 选择器和每个选择器的相关属性的映射, 具有树的根节点, 同级, 后代, 子级和其他关系.
> 和 DOM 非常相似.

> 也是一组 API, 允许从 JS 操纵 CSS. 

字节 Bytes -> 字符 Characters -> 令牌 Tokens -> 节点 Nodes
 
[构建对象模型](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=zh-cn)

## Range 对象

> 一个包含节点与文本节点的一部分的文档片段
```js
var range = document.createRange()

range.setStart(startNode, startOffset)
range.setEnd(endNode, endOffset)
```