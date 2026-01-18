const express = require("express");
const http = require("http");
const cors = require("cors");
const initSocket = require("./socket"); // path

const app = express();
app.use(cors());

const server = http.createServer(app);

// 🔥 initialize socket HERE
initSocket(server);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
