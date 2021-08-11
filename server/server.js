const express = require("express");
const http = require("http");
const port = 9001;

//SOCKETS : 2 way connection between client and server
/*how to refresh data? for example leaderboard updates in online multiplayer game.
We could ask users to refresh every few mins for new GET request with updated scores,
or use setIntervals, but those are hacky ways. We use sockets for realtime, constantly on the fly
updated data. */

const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);

server.listen(port, () => {
  console.log("server running on " + port);
});

const io = require("socket.io")(server);
//const io is entry point of all sockets connected to the server

//connection from the client
io.on("connection", (socket) => {
  console.log("someone connected");
});
