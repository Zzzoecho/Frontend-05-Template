学习笔记

## 语言分类方法
- 非形式语言: 日常口语, 中文, 英文
- 形式语言 (乔姆斯基谱系)
  - 0型 无限制文法, 包括所有文法 `?::=?`
  - 1型 上下文相关文法 `?<A>?::=?<B>?`
  - 2型 上下文无关文法 `<A>::=?`
  - 3型 正则文法 `<A>::=<A>?`

有上下包含关系, 1 一定也是 0, 但 0 不一定是 1.

## 产生式(BNF)
- 语法结构名: 用尖括号括起来的名称
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
    - 基础结构, 终结符 (Terminal Symbol)
    - 复合结构, 非终结符 (Nonterminal Symbol). 有点像叶子节点的意思, 不是指代码终止
- 引号和中间的字符来表示终结符, 就是字符串
- 可以用括号
- * 表示重复多次  
- | 表示或
- + 表示至少一次

产生式并不能完全精确的描述现代语言, 大部分语言都是上下文无关文法.

## 形式语言不同的分类方式

用途
- 数据描述语言: JSON, HTML, XAML, SQL, CSS
- 编程语言: C, C++, JAVA, C#, Python, Ruby, Perl, JS

表达方式
- 声明式语言: 大部分数据描述语言, Lisp, Haskell, Clojure 函数式语言的代表
- 命令型语言: C, C++, JAVA, C#, Python, Ruby, Perl, 脚本语言...

是否需要编译
- 编译型语言: 通过编译器编译成二进制文件, 运行时不需要依赖其他软件, 执行效率高
    C, C++, JAVA, swift
- 解释型语言: 无需编译, 直接运行于自己的解释器之上, 效率低但功能灵活.
    Python, JavaScript, Ruby, Perl, PHP
    
与硬件的距离
- 机器语言: 可读性差, 效率高
- 汇编语言: 介于两者中间
- 高级语言: 开发效率高, 执行效率低

编程范式
- 面向对象语言: 万物皆对象
    C++, JAVA, Smalltalk
- 面向过程语言: 流程图
    C 
- 声明式语言
- 命令式语言

- 强类型: C#, Java, Python, Ruby
- 弱类型: JavaScript, PHP

           
![语言分类](https://img-blog.csdn.net/20180705132612202?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NvZGluZ19kb25n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)    


## 编程语言的性质

图灵完备性: 可计算的问题都可用来描述的
- 命令式 -- 图灵机
    goto
    if 和 while
-声明式 -- lambda
    递归

动态与静态
- 动态
    在用户设备/在线服务器上
    产品实际运行时
    Runtime 运行时
- 静态
    程序员设备上
    产品开发时
    Compiletime 编译时

类型系统
动态类型系统: JS
静态动态系统: C++


强类型与弱类型: 根据类型转化来判断
强类型: 有隐式转换
弱类型: 无隐式转换

复合类型
- 结构体
- 函数签名

子类型: C++

泛型
逆变/协变


## 一般命令式编程语言的设计方式

> Atom: 原子级, 语言的最小组成单位.
- Identifier
- Literial

> Expression: 表达式, 原子级结构通过运算符和辅助符号相连接
- Atom
- Operator
- Punctuator

> Statement
- Expression
- Keyword
- Punctuator

> Structure: 结构化, 帮助开发去组织代码
- Function
- Class
- Process
- Namespace

> Program: 管理语言的模块和安装, npm
- Program
- Module
- Package
- Library

## JS 类型

Atom
Grammer
- Literal: 字面值
- Variable
- Keywords
- Whitspace
- Line Terminator

Runtime
- Types
- Execution Context

### Number
IEEE 754 Double Float: 双精度浮点数
- Sign (1) 符号位
- Exponent (11) 指数位
- Fraction (52) 精度位


### String
- Character 字符
- Code Point 码点
- Encoding 编码方式

ASCII 码: 只能表示127个字符, 英文大小写, 数字0-9, 制表符, 特殊符号, 控制符
Unicode: 万国码, 联合编码集, 全世界的字符. 早期认为两个字节就够了
UCS: Unicode 和另一个合并产生的
GB 国标 GB2312 -> GBK -> GB18030 (大全)
ISO-8859

#### Unicode 的问题
Unicode只是一个符号集, 只规定了符号的二进制代码, 却没有规定这个二进制代码如何存储

如汉字 "严" 的 Unicode 是 4E25, 转换成二进制数有足足15位. 至少需要2个字节, 其他更大的符号，可能需要3个字节或者4个字节，甚至更多。

第一个问题是: 如何区别 Unicode 和 ASCII ? 计算机怎么知道三个字节表示一个符号, 而不是分别表示三个符号呢 ?

第二个问题是: 如果统一规定每个符号用3 或 4个字节来表示, 那么每个英文字母前都必然有 2 或 3个字节全是0 , 存储浪费

#### UTF-8
> Unicode 的实现方式之一, 可以用1-4个字节来表示一个符号, 根据不同符号而变化字节长度

编码规则:
1. 单字节, 第一位设为0, 后面7位是这个符号的 Unicode 码
2. 多字节(n), 第一个字节的前 n 位都设为 1, 第 n + 1 位设为 0, 后面字节的前两位一律设为 10. 剩余的是这个符号的 Unicode 码


|Unicode 符号范围 | UTF-8 编码方式|字节数|
|---------------|------|
| 十六进制 | 二进制||
|0x0000 - 0x007F |0xxxxxxx|1|
|0x0080 - 0x07FF | 110xxxxx 10xxxxxx|2|
|0x0800 - 0xFFFF | 1110xxxx 10xxxxxx 10xxxxxx|3|
|0x010000 - 0x10FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx|4|

[byte为什么要&上0xff](https://blog.csdn.net/xiaozhouchou/article/details/79086604)

### Object
任何一个对象都是唯一的, 与对象本身的状态无关
即使状态完全一致的两个对象, 也并不相等
用状态来描述对象
状态的改变即是行为

对象三要素
- 核心标识
- 状态
- 行为 

类是一种常见的描述对象的方式

#### Class
主要流派
归类: 从单个对象中提取共性, 归为一类. 多继承, 例: 鱼是动物, 是水生生物, 也是脊椎动物. C++
分类: 世间万物都是一个 object, 再往下细分. 单继承, 并且会有一个基类 Object. C#, JAVA 

#### Prototype
原型, 更接近人类原始认知的描述对象的方法.
并不做严谨的分类, 而是用"相似"这样的方式去描述对象
任何对象仅仅需要描述它自己与原型的区别即可

