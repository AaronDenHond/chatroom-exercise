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

//is this the msg back from server?
socket.on("displayMessage", (message) => {
  target = document.getElementById("displayMessage");
  messageTarget = document.createElement("div");
  messageTarget.classList.add("message");
  messageTarget.innerText += message;
  target.appendChild(messageTarget);

  /*  target.innerText += message;
  target.innerHTML += "<br>"; */
});
