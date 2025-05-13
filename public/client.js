document.addEventListener('DOMContentLoaded', ()=>{

    const messages = document.querySelector(".messages");
const chatForm = document.querySelector("#chat-form");
const message = document.querySelector("#message-input");
const socket = io(); // connects to the backend using Socket.io
const userName = prompt("Enter your name");
socket.emit("set username", userName); //save new user

// ensure chat message are not duplicated
socket.off("chat history");
socket.off("chat message");
// handle submit
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (message.value) {
      socket.emit("chat message", message.value); // sends message to the server
      message.value = "";
    }
  });
// Chat history
socket.on("chat history", (history) => {
  history.forEach((data) => {
    const messageLi = document.createElement("li");
    messageLi.innerHTML = `${data.user}: ${data.msg}`;
    messages.appendChild(messageLi);
  });
});

// New messages
socket.on("chat message", (data) => {
  const messageLi = document.createElement("li");
  messageLi.innerHTML = `${data.user}: ${data.msg}`;
  messages.appendChild(messageLi);
  window.scrollTo(0, document.scrollHeight);
});

})