学习笔记

## 字符串分析算法
- 字典树: 大量高重复字符串的存储与分析
- KMP: 部分匹配, 在长字符串中匹配一个短字符串, 时间复杂度: O(m+n)
- Wildcard: 在 KMP 的基础上加了通配符, ? - 匹配任意字符, * - 匹配任意数量的字符. 时间复杂度: O(n)
- 正则: 字符串通用模式匹配
- 状态机: 通用的字符串分析
- LLLR: 字符串多层级结构分析, LL 更通用, LR 更理论. LR(1) ≈ LL(n)


## Object.create(null) vs {}

### 定义
> Object.create(proto, [propertiesObject])
- proto: 新创建对象的原型对象
- propertiesObject: 可选, 要添加到新对象的可枚举属性

`Object.create(null)` -- 不带原型链, 没有继承 Object 的任何东西. 第一个参数将 null 设置成了新创建对象的原型
`Object.create({})` -- 会多一层 `__proto__` 嵌套
`Object.create(Object.prototype)` -- 和 `{}` 一样
`{}` -- 带原型链

使用`Object.create(null)` 创建的对象非常纯净, 没有任何属性和方法. 
可以自定义 hasOwnProperty, toString 等方法而不用担心将原型链上的同名方法给覆盖掉.

Vue 和 Vuex 的源码中, 都使用了 `Object.create(null)` 来初始化新对象.

使用场景: 
1. 需要一个非常干净且可自由定制的对象作为数据字典时
2. 想节省一点点性能损失时

## str.charCodeAt()

> str.charCodeAt(index)
- index: 整数, 0 ≤ index ≤ str.length

返回0-65535之间的整数, 表示给定索引处的 UTF-16 代码单元

## String.fromCharCode()

> String.fromCharCode(num1[, ...[, numN]])

返回长度为 N 的字符串, 由 N 个指定的 UTF-16 代码单元组成