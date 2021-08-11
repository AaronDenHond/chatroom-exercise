console.log("hello world!");

let socket = io.connect();

let buttonAll = document.getElementById("sendToAll");

//on click of a button, do an emit to the server
buttonAll.addEventListener("click", function () {
  message = document.getElementById("message").value;
  socket.emit("sendToAll", message);
});

socket.on("displayMessage", (message) => {
  target = document.getElementById("displayMessage");
  target.innerText += message;
  target.innerHTML += "<br>";
});
