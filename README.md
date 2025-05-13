# Nodjs-asssessment

 ### Application Overview

C-Talks is a real-time web chat application where multiple users can send and receive messages instantly without refreshing the page.


**Tech Stack**
* Node.js for the backend server

* Express.js for routing and serving static files

* Socket.IO for real-time WebSocket communication

* HTML/CSS/JavaScript for the frontend.

**Key Features**

Users can join the chat by visiting the page.

Any message sent is broadcast to all connected clients in real-time.

Messages appear instantly without page reloads.

Uses WebSockets under the hood via Socket.IO.

**Implementation**
1. initialize the project

```bash
mkdir real-time-chat-app
cd  real-time-chat-app
npm init -y
npm install express socket.io
```
2. create server.js: this is where you setup your data
3. Create a public folder this where you add all static file like index.html, style.css, and client.js file.
4. Run the App

```Bash
node server.js
```
5. Test the app by going to http://localhost:500 on your browser 
6. open multiple tab to test the concurrent connections and message broadcast.


### How this project showcases Node.js scalability
* Non-Blocking I/O: Node.js handles all websocket connections without creating a new thread for each client, all incoming messages and connections are handled asynchronously. even with 1000+ users, the server remains performant due to the event driven model.

* Efficient WebSocket Handling: Socket.IO uses a single persistent connection for each client. This persistent connections allow bi-directional communication. it is lightweight, efficient for high-throughput chat system

* Horizontal Scalability: The chat app can be scaled across multiple instances using a load balancer, also message brokers like redis can be added for scaling Socket.IO across servers.

* Use Case Performance: Node.js event loop and libuv handle thousands of concurrent connections smoothly.

### Advance improvement for the 
