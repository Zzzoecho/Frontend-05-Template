学习笔记

## 状态机

> 有限状态自动机的简称, 现实事物运行规则抽象而成的一个数学模型

四大概念
- State, 状态. 一个状态机至少包含两个状态
- Event, 事件. 执行某个操作的触发条件
- Action, 动作. 一般对应一个函数
- Transition, 变换. 状态变化

特点
- 每个状态都是一个机器
    - 接受的输入一致
    - 每个机器本身没有状态, 纯函数
- 每个机器都知道下一个状态
    - 有确定是下一个状态 Moore
    - 根据输入决定下一个状态 Mealy

```javascript
// 每个函数是一个状态, 函数参数是输入
function state(input) {
  // 处理每个状态的逻辑...
// 返回值作为下一个状态
  return next
}

while (input) {
  // 获取输入
  state = state(input)
}
```

## HTTP

ISO-OSI 七层网络模型
```
应用
表示    ->    HTTP
会话
------------------------
传输          TCP
网络          Internet
数据链路   
       ->    4G/5G/Wifi
物理层
```

TCP 与 IP 的基础知识
流
端口: 网卡根据端口分配数据包给不同应用, 对应 node 的 require('net')
libnet: 构造 IP 包并发送
libpcap: 从网卡抓取所有 IP 包

HTTP
一个 request 一定对应着一个 Response


### 请求报文
```
POST /HTTP/1.1 // 请求行
Host:127.0.0.1 // 请求头部, Headers, 空行结尾, kv 结构, 冒号分隔
Content-Type:application/x-www-form-urlencoded
// 空行 blank line
field1=aaa&code=x%3D1 // body
```
![](https://pic002.cnblogs.com/images/2012/426620/2012072810301161.png)

### 响应报文
```
HTTP/1.1 200 OK // 状态行
Content-Type: text/html // 消息报文
Date: Wed, 02 Dec 2020 15:17:50 GMT
Connection: keep-alive
Transfer-Encoding: chunked

c // 十六进制字符代表body开始
Hello world

0 // 0 代表 body 结束

```

#### 常见的 content-type
- application/x-www-form-urlencoded
body 格式: k1=v1&k2=v2, key 和 val 都进行了 url 转码.

- multipart/form-data
表单提交, 格式如下. 会生成一个 boundary 用来分割不同的字段, 一般用于上传文件
```
------WebKitFormBoundarygZYTaSAyu2u4BgQe
Content-Disposition: form-data; name="token"

<token>
------WebKitFormBoundarygZYTaSAyu2u4BgQe
Content-Disposition: form-data; name="id"

<id>
------WebKitFormBoundarygZYTaSAyu2u4BgQe
Content-Disposition: form-data; name="key"

<key>
------WebKitFormBoundarygZYTaSAyu2u4BgQe--
```

- application/json
格式是 JSON.stringify() 后的字符串

-text/xml
```xml
<?xml version="1.0"?>
<methodCall>
    <methodName>examples.getStateName</methodName>
    <params>
        <param>
            <value><i4>41</i4></value>
        </param>
    </params>
</methodCall>
```