const express = require("express");
const http = require("http");
const port = 9001;
let counter = 0;

//SOCKETS : 2 way connection between client and server
/*how to refresh data? for example leaderboard updates in online multiplayer game.
We could ask users to refresh every few mins for new GET request with updated scores,
or use setIntervals, but those are hacky ways. We use sockets for realtime, constantly on the fly
updated data. */

const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

//we need to create an http server, this createServer is built in into Node.js.
const server = http.createServer(app);

server.listen(port, () => {
  console.log("server running on " + port);
});

/**
 * TODO : What is listening to a port exactly?
 * TODO : What is the .on exactly?
 *
 */

const io = require("socket.io")(server);
/*const io is entry point of all sockets connected to the server. Here we are importing socket.io, which is a function that
takes our server as an argument */

//connection from the client on the frontend to the server
io.on("connection", (socket) => {
  console.log(counter + "someone connected");
  //after this code runs we increment so we can more easily see howmany peeps join.
  counter += 1;
  //server has to react to the emit from the client side
  socket.on("sendToAll", (message) => {
    io.emit("displayMessage", message);
  });

  socket.on("sendToMe", (message) => {
    socket.emit("displayMessage", message);
  });
});
