const http = require('http')

http.createServer((request, response) => {
    let body = []
    request.on('error', err => {
        console.error(err)
    }).on('data', chunk => {
        body.push(chunk.toString())
    }).on('end', () => {
        body = body.join('')
        console.log("body", body)
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('Hello world\n')
    })
}).listen(8124)

console.log('Server running at http://127.0.0.1:8124/')