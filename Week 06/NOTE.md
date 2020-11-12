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
- 机器语言: 可读性差
- 汇编语言: 
- 高级语言

编程范式
- 面向对象语言
    C++, JAVA, Smalltalk
- 面向过程语言:
    C 
- 声明式语言: 
- 命令式语言: 

强类型和弱类型


           
![](https://img-blog.csdn.net/20180705132612202?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NvZGluZ19kb25n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)    


node test.js
sh test.sh
python test.python

解释器 执行 代码

java test.java -> test.class
javac test.class -> 执行

java 是一个解释型语言

为什么 java 有编译过程 和 解释执行过程 ?

java 解释执行时会收集函数调用次数等计算出热点代码, 针对热点代码做优化. (方法内联, 标量清除, 逃逸分析...)

逃逸分析: 如果对象在函数作用域内没有逃出去, 那么该对象是可以安全删除的. 也不用对其加锁, 浪费

0: 解释执行

1: C1 no p
2: C1 limited p 较为平衡, 兼顾了启动速度和优化效果
3: C1 full p 

4: C2 完全版优化, 执行会慢一点但优化效率最高

例: 一开始是 0 -> 方法 a 调用超过 1500 -> 2 要是超过1w -> 4
