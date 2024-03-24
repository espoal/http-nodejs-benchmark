// svcs/unix-socket/index.mts
import { env } from "node:process";
import { createServer } from "node:net";
var socket_address = env.UNIX_SOCKET || `/tmp/channel.sock`;
var server = createServer();
var handler = async (request, socket) => {
  socket.write("<h1>Hello world!!</h1>\n");
};
server.on("connection", (socket) => {
  socket.on("data", async (data) => {
    await handler({}, socket);
  });
});
server.listen(socket_address);
