学习笔记

## CSS 规则
大致可以分为两类
- At-rule
    @charset
    @import
    @media
    @page: 打印机常用
    @counter-style
    @keyframes
    @fontface
    @supports: 查询属性的支持性, 但它本身兼容性就不太好
    @namespace
- rule
    Selector 选择器
        - selector_group
        - selector
            - >, <sp>, +, ~
        - simple_selector
            - type
            - *
            - . class
            - # id
            - [] 属性
            - : 伪类
            - :: 伪元素
            - :not()
    Declaration 规则
        - Key
            - variables 变量
            - properties
        - Value
            - calc
            - number
            - length...
            
            
            
## 选择器

优先级的计算, <<CSS REFACTORING>>

A specificity is determined by plugging numbers into (a, b, c, d):

1. If the styles are applied via the style attribute, a=1; otherwise, a=0.
2. b is equal to the number of ID selectors present.
3. c is equal to the number of class selectors, attribute selectors, and pseudoclasses present.
4. d is equal to the number of type selectors and pseudoelements present.

优先级由 A,B,C,D 的值来决定, 它们的计算规则如下:
1. 如果存在内联样式, A = 1, 否则 A = 0
2. B 等于 ID 选择器的数量
3. C 等于 class 选择器, 属性选择器和伪类的总数
4. D 等于 标签选择器 和 伪元素 的总数

> 通配选择符（*）关系选择符（+, >, ~, ' ', ||）和 否定伪类（:not()）对优先级没有影响
> :is() 和 :not(): 在优先级计算中不会被看作是伪类, 但其中包含的选择器还是会被当做普通选择器进行计数

课上的例子, [0, 2, 1, 1]
```css
#id div.a#id {}
/* 无内联 a=0 */
/*2个 id 选择器, b=2*/
/*1个 class 选择器, c=1*/
/*1个标签选择器, d = 1*/
```

计算公式: S = a * N^3 + b * N^2 + c * N^1 + d
N - 尽量取大一些的数, 实际使用时为了节省内存通常取 65536. 256的整次幂


div#a.b .c[id=x] [0, 1, 3, 1]

#a:not(#b) [0, 2, 0, 0]

*.a [0, 0, 1, 0]

div.a [0, 0, 1, 1]

## 伪类
- 链接 / 行为
:any-link - 任何超链接
:link - 未访问过的超链接
:visited - 已经访问过的超链接
:hover
:active
:focus
:target

- 树结构
:empty
:nth-child()
:nth-last-child()
:first-child
:last-child
:only-child

- 逻辑型
:not
:where
:has

## 伪元素
::before
::after

下面两个伪元素只支持有限的属性
::first-line
::first-letter

两个都支持
font系列, color 系列, background 系列
word-spacing, letter-spacing
text-decoration, text-transform, line-height

仅 ::first-letter 支持
float, vertical-align
盒模型系列: margin, padding, border 