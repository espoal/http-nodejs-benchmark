import { env } from 'node:process'
import { createServer } from 'node:net'

const socket_address = env.UNIX_SOCKET || `/tmp/channel.sock`


const server = createServer()

server
  .on('connection', (socket) => {
    socket.write('Hello world!!\n')
    socket.end()
  })




server.listen(socket_address)
