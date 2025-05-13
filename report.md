# Node js Assessment

## Event-driven , non-blocking I/O model in node.js:

The event driven and the non-blocking I/O model are the basic concepts of Node.js the accounts or enables it it's high performance and scalability.

### Event driven architecture

    Node.js works with an event-driven progrmming model where the flow of the program is determined by events or actions for example the user actions, sensor output or messages from other programs.

**Components:**

1. **Event loops**: This is the main mechanism that allows Node.js to perform non-blocking input / output operations regardless of javaScript been single threaded.
   The event loop continuously checks for unfinished task or pending events and executes the callbacks associated with them.
   The event loop is the heart of Node.js asynchronous nature it fuctions through several phases: timers, pending callbacks, idle, prepare, check, poll, close callback.

2. **Events emitters**: These are those objects the creates or emit named events which triggers fuctions(listeners) to be called. The Eventemitter class is an essential aspect or part of Node.js and provides method like .on(), .emit(), and .removeLuistener().

3. **Callbacks**: Functions passed as arguments to other functions, which are called when an asynchronous operation completes or an event occurs.

4. **Promises**: Objects representing the eventual completion or failure of an asynchronous operation, providing a cleaner alternative to callbacks.

5. **Async/Await**: Syntactic sugar built on top of Promises, making asynchronous code easier to write and understand.

## Non-Blocking I/O Model

Node.js uses a non-blocking I/O model that allows it to handle multiple operations concurrently without creating multiple threads.

### How It Works:

1. **Single-Threaded Processing**: Node.js runs on a single thread but can handle numerous concurrent connections by using non-blocking operations.

2. **Libuv**: The C library that provides the event loop and handles asynchronous I/O operations across different operating systems. It abstracts system-specific details and provides a consistent interface.

3. **Thread Pool**: For operations that cannot be executed asynchronously at the OS level (like some file system operations), libuv maintains a thread pool.

4. **Asynchronous APIs**: Most Node.js APIs are designed to be non-blocking and accept callback functions.

### Example of Non-Blocking I/O:

In traditional blocking I/O:

```javaScript
const data = fs.readFileSync('/path/to/file');
console.log(data);
console.log('Operation complete');
```

in the code above the code will have to wait for the system to read the file before printing out the Operation complete on the console.

while in the Non-blocking model:

```javaScript
// this reads a file
fs.readFileSync('/path/to/file', (err, data) =>{
  // check for errors if any throw a new error
  if (err) throw err
  console.log(data)
})

console.log('your file is loading')

/* output: your file is loading
          then the file is printed on the console.
*/
```

## Single threaded loop architecture

**Definition:** A single threaded loop architecture is a programming model where all operations are handled on a single thread using an event loop.
Node.js is built on this single threaded loop architecture that enables it to manage input / output operations, asynchronous tasks, and user events efficiently without multithreading.
**Components:**

1. Call stack is one of the component of the single threaded architecture where functions are added and executed one at time (synchronously). It operates in a LIFO (last in, first out) manner like a book shelf where the last book in is the first book out.
2. The event loop checks if the call stack is empty, it pushes the next callback from the task queue to the call stack.
3. Task qeues or callback qeues it qeues up callbacks like setTimeOut functions, fs.readFile, HTTP responses. when the call stack is clear, the event loop pushes a task into it.
4. libuv is a C++ library Node.js uses for non-blocking I/O operations.

**How it works:**
JS code runs in the main thread, if it encounters asychronous function, it sends it to the libuv / system api while Javascript continues excuting the rest of the codes. once the asynchronous task is complete; its callback is qeued in the task qeue the event loop then checks if the callstack is empty, if it is it moves the callback to the callstck fie execution.

```javaScript
console.log("start");

seTimeout(()=>{
 console.log("task completed");
}, 0)

console.log("end")
```

```Bash
start
end
task complete
```

This architecture help node.js handle multiple requests concurrently. make it fast and suitable for real time application.

## How Node.js handles concurrent connections

Despite the fact that node.js runs javascript in one thread (single threaded), it is capable of managing thousands of connnection using an underlying architecture that relies on: evemt loop, async-await/promises/callbacks, libuv thread pool, and asynchronous non blocking I/O

**How it works:**

1. A user visit a Node.js server e.g http://localhost:5000 this initiates a connection.
2. Node.js accepts the connection on the main thread where the event loop runs.

```javaScript
const http = require("http")
const fs = require("fs")
const server = http.createServer((req, res)=>{
  fs.readFile("bigFile.txt", (err, data)=>{
    res.end(data)
  })
  server.listen(5000)
  })
```

3. fs.readFile is non-blocking (asynchronous) and it is offloade to libuv thread pool.
4. Event loop continues accepting connections.
5. when bigFile.txt is read and the callback is queued
6. The Event loop picks it up and sends res.end(data).

### Role of npm (Node package manager)

The role of the node package manager(npm) is to manage javascript packages for Node.js. it is a tool that helps developers do the following:

1. install packages e.g express, mongoose, cors etc.

```Bash
npm install express
```

2. Manage project dependencies: it creates a node_module folder to store all installed packages, it records dependencies in package.json and package-lock.json for version control and reproducibility.

3. Running project scripts: npm lets us define and run scripts(commands) e.g:

```json
"scripts":{
  "start": "node server.js",
  "test":"jest"
}
```

then run with

```Bash
npm start
```

4. Publishing Packages: you can crate your own package and publish it to the npm registry so others can use it:

```Bash
npm publish

```

5. Version Management: you can install specific versions of packages e.g

```Bash
npm install express@4.8.2

```

## Comparison table highlighting the Node.js scalability vs the traditional server-side technology

| Features                       | Node.js (Event-driven)                                 | Traditional server-side technology                                        |
| ------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------- |
| Threading model                | single threaded, event loop (non-blocking I/O)         | Multi-threaded (each task request is handled by separate thread/ process) |
| Concurrency Handling           | Handles many connections using async callbacks         | Spawns threads or processes per request (limited scalability)             |
| Memory Efficiency              | High – lightweight, no per-request thread overhead     | Lower – each thread consumes memory and CPU                               |
| I/O Operations                 | Non-blocking, asynchronous                             | Usually blocking or semi-blocking                                         |
| Scalability for Real-Time Apps | Excellent (built-in support via WebSocket, etc.)       | Requires extra tools or services                                          |
| Performance Under Load         | Maintains fast response with many connections          | Slows down as thread pool maxes out                                       |
| Resource Usage                 | Efficient (few threads, low CPU/memory per connection) | Resource-intensive (more threads = more RAM/CPU usage)                    |
| Response Time                  | Low latency for I/O-heavy tasks                        | Higher latency with synchronous I/O                                       |
| Use Cases                      | Ideal for APIs, microservices, real-time apps          | Better for CPU-heavy apps or traditional MVC servers                      |
| Horizontal Scalability         | Easy with clustering or load balancers                 | Also possible, but heavier setup (load balancers, etc.)                   |

## Pros

1. Performance benefits

- Non-blocking I/O & Event Loop: Node.js makes use of a songle-threaded event-driven architecture, which allows it to manage thousands of concurrent connections efficiently without blocking the thread for input/output tasks like reading files, querying databases, or making API calls.
- Built on V8 Engine: Node.js runs on the Google V8 engine which compiles javaScript to machine codes which makes extremely fast for server-side exccution.
- Lightweight and Scalable: Node.js is single threaded so it does not need to spawn a new thread per request, making it memory-efficient and suitable for high-throughput applications.

2. Vast Ecosystem of Packages
   The node.js npm(node package maneger) is one of the largest ecosystem for open-sources libraries/ packages.You can install over a million packages ranging from utility libraries (like lodash), frameworks (express, nest.js), to database drivers(mongoose, mysql2), authentication modules(jwt), testing tools, and more. Saves time and speeds up development by avoiding the need to "reinvent the wheel."
3. JavaScript on Both Frontend and Backend

- Full-Stack JavaScript: Node.js has made it possible for developers to develop fullstack app using only javascript, With Node.js on the backend and frameworks like React, Vue, or Angular on the frontend.
- Code Sharing & Reuse: Share validation logic, utility functions, and data models across frontend and backend reducing bugs and improving consistency.
- Developer Productivity: Teams don't need to switch languages like php on the backend and javaScript on the frontend making onboarding easier and collaboration smoother.

4. Real-Time Capabilities

WebSockets and Socket.io support out-of-the-box, allowing real-time communication between the server and clients.

Ideal for:

- Chat applications

- Online games

- Live notifications

- Collaborative tools (e.g., Google Docs-like apps)

5. Corporate Adoption
   Big companies use Node.js at scale, which proves its reliability and maturity.

- Netflix: Uses Node.js to handle massive traffic globally.

- PayPal: Reported faster performance and reduced development time after switching.

- LinkedIn: Rebuilt mobile backend in Node.js, seeing a 10x speed improvement.

Uber, Walmart, eBay, and many others also make use of node.js. 6. Strong Community Support

Massive open-source community constantly contributes tools, documentation, and support.

Rich ecosystem of blogs, YouTube tutorials, GitHub repos, and forums (StackOverflow, Reddit).

Rapid updates and plugin development for emerging technologies (like AI, Web3, etc.).

## Cons

1. Poor at CPU-Intensive Tasks:
   Node.js runs on a single thread, which means CPU-intensive operations (like complex math, image processing, or encryption) can block the event loop, preventing it from handling other requests and this can lead to slower response time, unresponsive server during heavy computation.
   **Solutions:**
   Use worker threads (worker_threads module) to offload CPU-bound tasks.
   Delegate heavy computation to microservices built with more suitable languages (e.g., Python, Go, Rust).

2. Callback Hell (Pyramid of Doom): Node.js relies heavily on asynchronous callbacks. Deeply nested callbacks make code Hard to read, Difficult to debug, Prone to bugs. e.g:

```javaScript
getUser(id, (err, user) => {
  getPosts(user.id, (err, posts) => {
    getComments(posts, (err, comments) => {
      // more nesting...
    });
  });
});
```

**Solutions:**
_use promises_

```javaScript
  getUser(id)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts))
  .catch(err => handleError(err));

//Async/Await:

async function loadData() {
  try {
    const user = await getUser(id);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts);
  } catch (err) {
    console.error(err);
  }
}
```

3. Error Handling
   In async code, especially with callbacks or Promises, errors may go unhandled, leading to app crashes or memory leaks. e.g:

```javaScript
  fs.readFile('file.txt', (err, data) => {
if (err) throw err;  // can crash server if not handled properly
});
```

**Solutions:**
* Always use try/catch with async/await

* Use middleware for centralized error handling (e.g., in Express)

* Use process.on('uncaughtException') and process.on('unhandledRejection') as a last resort.

4. Challenges with Complex Database Queries
  Node.js is not inherently designed for heavy relational queries (like complex joins or nested subqueries), which are common in SQL databases. And this can lead to slower DB performance, higher chance of bugs, and inconsistencies in complex query logic.

  **Solutions:**
  * For complex SQL tasks: use raw queries with parameterized input.

  * For better compatibility: consider NoSQL databases like MongoDB with Mongoose.

  * Delegate data-heavy logic to dedicated microservices with optimized DB drivers.