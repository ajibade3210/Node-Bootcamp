/**
 * On Node Js Event Blocking
 * Focusing on how to optimize he node application.
 * Most of the js code runs on a single loop in a single thread
 *sending back the response to the browser
 *
 * Node and event loop can joggle
 *
 * Things that can increase response time in nodejs
 * JSON.stringify({})="{}"
 * JSON.parse("{}")={}
 * [5,3,1,2].sort()
 *
 *
 Worker Cluster Work in Round Robin Approach
 used for load balancing

 In node we can use the cluster module to do load balancing of request
 as they come in to the node module

 And those cluster module uses Round Robin approach to determine which process would handle the requests

 Using PM2


 Using PM2 for Zero Down Time Runni ng
 */

const express = require("express");
const cluster = require("cluster");
const os = require("os");
const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //
  }
}

app.get("/", (req, res) => {
  res.send(`Performance run on: ${process.pid}`);
});

app.get("/timer", (req, res) => {
  res.send(`Ding ding ding ${process.pid}`);
});

console.log("Running Server.js");
if (cluster.isMaster) {
  console.log("Master has started");
  const NUM_WORKERS = os.cpus().length;
  console.log(NUM_WORKERS);
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log("Worker has started");
  app.listen(3000, () => {
    console.log("Listening");
  });
}

// console.log("Running Server.js");
// if (cluster.isMaster) {
//   console.log("Master has started");
//   const NUM_WORKERS = os.cpus().length;
//   console.log(NUM_WORKERS);
//   for (let i = 0; i < NUM_WORKERS; i++) {
//     cluster.fork();
//   }
// } else {
//   console.log("Worker has started");
//   app.listen(3000, () => {
//     console.log("Listening");
//   });
// }
