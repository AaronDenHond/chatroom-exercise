const express = require("express");
const http = require("http");
const port = 9001;

const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);

server.listen(port, () => {
  console.log("server running on " + port);
});
