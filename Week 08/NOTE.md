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

#### Transfer-Encoding

HTTP运行在 TCP 连接之上, 有着跟 TCP 一样的三次握手, 慢启动等特性, 为了提高 HTTP 的性能, HTTP 引入了持久连接机制
HTTP/1.0中, 通过 `Connection: keep-alive` 来实现
HTTP/1.1中规定所有连接都是持久的, 除非显式地在头部加上 `Connection: close`. 
由于历史原因很多浏览器还是保留着给 HTTP/1.1 发送 `Connection: keep-alive` 的习惯

如何判断数据发送完毕 ?
1. 非持久连接, 通过连接是否关闭来确定请求 or 响应报文的边界
2. 持久连接

    a. Content-Length, 必须保证实体长度和 Content-Length 一致, 过短 - 内容被阶段; 过长 - pending.
    
    但实际应用中, 实体来自于网络文件 or 动态生成, 要想准确获取长度, 只能开一个足够大的 buffer 等内容全部生成好后再计算长度.
    一方面需要更大的内存开销, 另一方面也让客户端等的更久.
    
    TTFB (Time To First Byte), 代表从客户端发出请求到收到响应的第一个字节所花费的时间. 越短意味着用户可以更早看到页面内容, 体验up.
    
    服务端为了计算实体长度而缓存所有内容, 跟更短的 TTFB 理念背道而驰.所以需要一个新的机制, 不依赖长度信息
    
    b. Transfer-Encoding: chunked, 分块编码. 每个分块包含 十六进制的长度值 和 数据.
    
```
// 第一块
c
Hello world
// 最后一块
0
// 0 对应的分块数据
```
    