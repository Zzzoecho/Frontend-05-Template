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
        response.end(
            '<html lang="en">\n' +
            '<head>\n' +
            '    <title>Document</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <h4>Hello World</h4>\n' +
            '    <p>hi~</p>\n' +
            '    <img />\n' +
            '</body>\n' +
            '</html>')
    })
}).listen(8124)

console.log('Server running at http://127.0.0.1:8124/')