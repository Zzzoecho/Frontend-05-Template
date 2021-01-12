学习笔记

## 对象与组件
对象
- Properties
- Methods
- Inherit

组件
- Properties: 强调从属关系
- Methods
- Inherit
- Attribute: 强调描述性
- Config & State
- Event
- Lifecycle
- Children

### Attribute vs Property
Attribute: 强调描述性
Property: 强调从属关系


input 中的 attribute 更像是默认值, 只要设置了 property 就会优先用 property
```html
<input value = 'cute'/>

<script>
var input = document.getElementsByTagName('input')
input.value // cute
input.getAttribute('value') // cute

// 如果 value 已经设置, 则 attribute 不变, property 变化.
input.value = 'hello'
input.value // hello
input.getAttribute('value') // cute 

</script>
```


[](component.png)