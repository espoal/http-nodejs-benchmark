import { env } from 'node:process'
import { createServer } from 'node:http'

const port = Number(env.HTTP_PORT) || 8080


const server = createServer()

server.on('request', (request, res) => {
    res.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
    })
    res.end('<h1>Hello world!!</h1>')
})

server.listen(port)
