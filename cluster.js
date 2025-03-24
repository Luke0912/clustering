// cluster.mjs
import cluster from 'cluster';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the number of CPU cores
const numCPUs = os.cpus().length;
console.log('numCPUs: ', numCPUs);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers equal to the number of CPUs
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart workers if any worker dies
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new worker...`);
    cluster.fork();
  });
} else {
  // Import the worker server
  await import(path.join(__dirname, 'server.js'));
}
