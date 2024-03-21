// svcs/http-express/index.mts
import express from "express";
import { env } from "node:process";
var port = Number(env.HTTP_PORT) || 8080;
var app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
