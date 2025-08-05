const pool = require("../db");
const jobQueue = require("./queue");

// Count of parallel jobs to be processed
const CONCURRENCY = 5;

// Flag to check if the worker is already running
let isRunning = false;

async function processQueue() {

  // checking for already running or no jobs
  if (isRunning || jobQueue.length === 0) return;

  // marking as running
  isRunning = true;

  //Taking jobs from the queue
  const jobs = jobQueue.splice(0, CONCURRENCY);

  try {
    // Using Promise.all to process jobs in parallel
    await Promise.all(
      jobs.map(async (job) => {
        try {
          if (job.age < 18) {
            await pool.query("INSERT INTO children (name, age) VALUES ($1, $2)", [
              job.name,
              job.age,
            ]);
          } else {
            await pool.query("INSERT INTO adults (name, age) VALUES ($1, $2)", [
              job.name,
              job.age,
            ]);
          }
          console.log("Inserted:", job.name);
        } catch (err) {
          console.error("Error inserting job:", err.message);
          jobQueue.push(job);
        }
      })
    );
  } 
  catch (err) {
     console.error("Unexpected Promise.all failure:", err.message);
   }
  // Marking as not running
  isRunning = false;

  // immediately queues next round if there's more work
  setTimeout(processQueue, 50); 
}

// auto-start worker
setInterval(processQueue, 100); 
