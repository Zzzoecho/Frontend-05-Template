const net = require('net');


class Request {
    constructor(options) {
        this.method = options.method || 'GET'
        this.host = options.host
        this.port = options.port || 80
        this.path = options.path || '/'
        this.body = options.body || {}
        this.headers = options.headers || {}

        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }

        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body)
        } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
        }

        this.headers['Content-Length'] = this.bodyText.length
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            // connection = net.createConnection({
            //     port: this.port,
            // }, () => {
            //     connection.write(this.toString())
            // })

            connection = net.createConnection({port: this.port}, () => {
                console.log('---已连接到服务器---');
                console.log(this.toString())
                console.log('------------------')
                connection.write(this.toString());
            });
            connection.on('data', (data) => {
                console.log('on data...', data.toString());
                connection.end();
            });
            connection.on('end', () => {
                console.log('已从服务器断开');
            });
        })
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }
}

void async function () {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8124',
        path: '/',
        headers: {
            ['X-Foo2']: 'customed'
        },
        body: {
            name: 'zoe'
        }
    })
    let response = await request.send()
    console.log('response', response)
}()