// svcs/http-deno/index.mts
var port = 8060;
var handler = (request) => {
  const body = `<h1>Hello, World!</h1>`;
  return new Response(body, { status: 200 });
};
console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
Deno.serve({ port }, handler);
