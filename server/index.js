const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");

const server = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));

server.use(cors());
server.use(bodyParser.json());
server.use("/", router);

server.use(express.static(path.join(__dirname, "../client/build")));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("../db.json");
// const middlewares = jsonServer.defaults({ static: "./build" });

// const PORT = process.env.PORT || 5000;

// server.use(middlewares);

// server.use(
//   jsonServer.rewriter({
//     "/api/*": "/$1",
//   })
// );

// server.use(router);

// server.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });
