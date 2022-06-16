const express = require("express");
// const cluster = require("cluster");
// const os = require("os");
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
console.log("Worker has started");
app.listen(3000, () => {
  delay(4000);
  console.log("Beep Beep beep" + process.pid);
});

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
