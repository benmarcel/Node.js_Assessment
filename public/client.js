const socket = io(); // connects to the backend using Socket.io
const messages = document.querySelector(".messages");
const chatForm = document.querySelector("#chat-form");
const message = document.querySelector("#message-input");

function getUser() {
  const joinBtn = document.querySelector(".join-btn");
  const userModal = document.querySelector(".usermodal");
  const chatSection = document.querySelector(".chat-section");
  const userInput = document.querySelector(".username");
  let userName = "";
  joinBtn.addEventListener("click", () => {
    if (userInput.value) {
      userName = userInput.value.trim();
      socket.emit("set username", userName);
      userModal.style.display = "none";
      chatSection.style.display = "block";
      userInput.value = "";
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  getUser();
  // ensure chat message are not duplicated
  socket.off("chat history");
  socket.off("chat message");
  // Chat history
  socket.on("chat history", (history) => {
    messages.innerHTML = "";
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

  // handle submit
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (message.value) {
      socket.emit("chat message", message.value); // sends message to the server
      message.value = "";
    }
  });
});
