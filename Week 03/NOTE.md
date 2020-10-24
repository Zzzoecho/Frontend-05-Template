学习笔记

## 四则运算的分析

输入项:
- TokenNumber: 0 - 9 的数字, 小数点
- Operator: +, -, *, / 之一
- Whitespace: <SP>
- LineTerminator: <LF> <CR>

表达式
<Expression>::=
  <AdditiveExpression><EOF>

加法表达式
<AdditiveExpression>::=
  <MultiplicativeExpression>
  <AdditiveExpression> <+> <MultiplicativeExpression>
  <AdditiveExpression> <-> <MultiplicativeExpression>

乘法表达式
<MultiplicativeExpression>::=
  <Number>
  <MultiplicativeExpression> <*> <Number>
  <MultiplicativeExpression> </> <Number>

在四则运算中, 乘除的优先级比加减要高, 所以定义加法表达式中的 <MultiplicativeExpression> ≈ <Number>

## AST
> 抽象语法树 (Abstract Syntax Tree), 以树状形式表现编程语言的语法结构

应用:
- 编辑器的错误提示, 代码格式化, 代码高亮, 代码自动补全
- eslint, prettier 的代码检查
- webpack 通过 babel 转译 javascript 语法

