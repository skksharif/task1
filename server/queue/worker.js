const pool = require("../db");
const jobQueue = require("./queue");

const CONCURRENCY = 5;
let isRunning = false;

async function processQueue() {
  if (isRunning || jobQueue.length === 0) return;
  isRunning = true;

  const jobs = jobQueue.splice(0, CONCURRENCY);

  try {
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
    console.log("Processed jobs:", jobs.length);
  } catch (err) {
    console.error("Unexpected Promise.all failure:", err.message);
  }

  isRunning = false;
  setTimeout(processQueue, 50); // poll again
}

setInterval(processQueue, 100); // auto-start worker
