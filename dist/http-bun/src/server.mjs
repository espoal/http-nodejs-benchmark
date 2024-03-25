// svcs/http-bun/server.mts
Bun.serve({
  port: 8070,
  fetch(req) {
    return new Response("<h1>Hello, World!</h1>");
  }
});
