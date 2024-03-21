import { createServer } from 'node:http2'
import { env } from 'node:process'

const port = Number(env.HTTP_PORT) || 8080

const server = createServer()


server.on('error', (err) => console.error(err))

server.on('stream', async (stream, headers) => {
    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200,
    })
    stream.end('<h1>Hello world!!</h1>')
})

server.listen(port)
