const { log } = require("console");
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

//convert the express app to a raw HTTP server needed for socket.io

const server = http.createServer(app);

//initializes Socket.ioand binds it to the HTTP server so it can listen to WebSocket connections.
const io = socketIo(server);

// middleware
app.use(express.static("./public"));

const chatHistory = [];
// checks for new connection
io.on("connection", (socket) => {
  console.log("A user has connected");
  // check for new user
  socket.on("set username", (name) => {
    socket.username = name;
    // send previous chat to new users
    io.emit("chat history", chatHistory);
  });

  // checks for a new message
  socket.on("chat message", (msg) => {
    const messages = { user: socket.username, msg };
    chatHistory.push(messages)
    io.emit("chat message", messages); // broadcast the message to all users.
  });
  socket.on("disconnect", () => {
    console.log("User has disconnected");
  });
});

server.listen(5000, () => {
  console.log("server has started running");
});
