import { env } from 'node:process'
import { createServer, Socket } from 'node:net'

const socket_address = env.UNIX_SOCKET || `/tmp/channel.sock`


const server = createServer()

const handler = async (request: Object, socket: Socket) => {

  socket.write('<h1>Hello world!!</h1>\n')

}

server
  .on('connection', (socket: Socket) => {
    socket.on('data', async (data) => {

      await handler({}, socket)
      /*try {
        const request = JSON
          .parse(data.toString())

        await handler(request, socket)
      } catch (error) {
        console.log(`error while parsing request: ${error}`)
        socket.write('HTTP/1.1 500 Internal Server Error\n\n')
      }*/


    })
  })




server.listen(socket_address)
