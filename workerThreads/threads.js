const { isMainThread, workerData, Worker } = require("worker_threads");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

//Number of Cores In CPU
console.log(numCPUs); //4
/**
 * Here it returns 4, Therefore we have 4 cores
 * It advisable we limit our worker threads created to 4
 * Because a 5th one wold only have to wait still on of
 * the 4 above is available before it can execute it assigned tasks
 */

//Number Of Cluster In PC
console.log(cluster.getMaxListeners());

if (isMainThread) {
  console.log(`Main Thread Process ID: ${process.pid}`);
  new Worker(__filename, { workerData: [7, 6, 2, 3, 1] });
  new Worker(__filename, { workerData: [5, 9, 2, 8, 6] });
} else {
  console.log(`Worker Process ID:  ${process.pid}`);
  console.log(`${workerData} sorted is  ${workerData.sort()}`);
}

/**
 * Sorting is avery expensive operation
 * when it come to how much of your cpu it uses
 * by using workerthread we can multiply the effective of our cpu
 * by taking advantages of its multiple processors. Processors which can run each thread in parallel
 * and because we r using the worker thread module all of this happens inside one process,
 * in the most efficient way possible....
 */
