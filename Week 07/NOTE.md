学习笔记

## 运算符优先级

Member
- a.b
- a[b]
- foo`string`
- super.b
- super['b']
- new.target
- new Foo() -- 带括号的 new

New
- new Foo -- 不带括号的 new

Reference
加法或减法操作 reference 解引用, 当做普通变量去用
delete 和 assign 后边都必须跟引用类型

Call 函数调用
- fn()
- super()
- fn()['b']
- fn().b
- fn()`abc`

> 同样是点运算符, 前面有()的优先级就比没有的低两级. 所以单纯用优先级来解释运算符是不严谨的

Left Handside  & Right Handside
JS 中只定义了 Right Handside, 剩余的都是 Left Handside

---

以下都是 Right Handside
Update 自增自减

Unary 单目运算符
- delete a.b
- void fn()
- typeof a
- + a
- - a
- ~ a 按位非
- ! a 逻辑非 
- await a
                                                                                                                         
** 乘方, 右结合

Multiplicative * / %
Additive + -
Shift 移位 << >> >>>
Relationship < > <= >= instanceof in

Equality
- ==
- !=
- ===
- !==
Bitwise & ^ |

Logical 短路原则
- && 前半部分是 false,后半部分不会执行
- || 前半部分是 true, 后半部分不会执行
Conditional
- ?: 

---

## Unboxing
- ToPremitive
- toString vs valueOf
- Symbol.toPrimitive: 会忽略 toString 和 valueOf

加法优先调用 valueOf

---

## Statement 语句
Grammar
简单语句
- 表达式
- 空, debugger
- throw, continue, break, return

组合语句
- BlockStatement, 花括号中间的语句列表
- if, switch
- Iteration, 循环
- with
- Labelled
- try, try catch finally 三段结构

声明
- Function, Generator, async, asyncGenerator
- var
- class
- Lexical, const 和 let

预处理: 所有声明都有预处理, 只是
作用域: 函数作用域 和 块级作用域

Runtime
- Completion Record
> 一个描述语句执行结果的数据结构. 是否有返回值, 返回值是啥..

三个部分
- [[type]]: normal, break, continue, return, throw
- [[value]]: 基本类型
- [[target]]: label


- Lexical Environment

---

## 结构化
JS 执行粒度(运行时)
- 宏任务
- 微任务 (promise)
- 函数调用
- 语句 / 声明
- 表达式 (reference)
- 直接量 / 变量 / this


### 宏任务与微任务

### 函数调用

