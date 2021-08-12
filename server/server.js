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
 * A server is a process that has to run on a port. We have to tell it what part to run on, to 'listen' to if a request happens.
 *
 */

const io = require("socket.io")(server);
/*const io is entry point of all sockets connected to the server. Here we are importing socket.io, which is a function that
takes our server as an argument */
//io is de library socket.io but he also knows about server, ports etc.. server is our node server.

//connection from the client on the frontend to the server
io.on("connection", (socket) => {
  let name = socket.id;
  console.log(counter + "someone connected");
  //after this code runs we increment so we can more easily see howmany peeps join.
  counter += 1;
  //server has to react to the emit from the client side

  //on initial pageload shows this message to the user. if we'd do io.emit it shows to everyone.
  socket.emit("displayMessage", "Welcome to the chat :)");

  socket.on("sendToAll", (message) => {
    io.emit("displayMessage", message);
  });

  socket.on("sendToMe", (message) => {
    socket.emit("displayMessage", message);
  });

  socket.broadcast.emit("displayMessage", `user ${name} has connected`);
  //first arg is where, second arg is what to display.

  //message to all on disconnect of a user.

  socket.on("disconnect", function () {
    io.emit("displayMessage", `user ${name} has disconnected :/`);
  });
});

//sockets zijn kanalen op 1 poort. We luisteren op 1 poort, en creeeren meerdere sockets op 1 poort.
//Send to me is maar over 1 socket, dus alleen die gebruiker krijgt de message.

//connect,disconnect and message are built-in reserved socket.io events.
