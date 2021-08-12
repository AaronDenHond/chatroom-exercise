console.log("hello world!");

let socket = io.connect();

let buttonAll = document.getElementById("sendToAll");
let buttonMe = document.getElementById("sendToMe");

//on click of a button, do an emit to the server
buttonAll.addEventListener("click", function () {
  message = document.getElementById("message").value;
  socket.emit("sendToAll", message);
});

buttonMe.addEventListener("click", function () {
  message = document.getElementById("message").value;
  socket.emit("sendToMe", message);
});

socket.on("displayMessage", (message) => {
  target = document.getElementById("displayMessage");
  target.innerText += message;
  target.innerHTML += "<br>";
});
