require('dotenv').config();
const mqtt = require('mqtt');
const pool = require('../db');

const client = mqtt.connect(process.env.MQTT_URL);


client.on('connect', () => {

  //3. Subscribe to the 'user/new_task' topic
  console.log(`Worker ${process.pid} connected to MQTT`);
  client.subscribe('user/new_task');
});

client.on('message', async () => {
  try {
    // 4. Fetch a task from the processing table
    const result = await pool.query(
      `DELETE FROM processing
       WHERE id = (
         SELECT id FROM processing
         ORDER BY created_at
         FOR UPDATE SKIP LOCKED
         LIMIT 1
       )
       RETURNING *`
    );

    const task = result.rows[0];
    if (!task) return;

    const { name, age } = task;
    
    // 5. Process the task and store it in the appropriate table
    if (age >= 18) {
      await pool.query('INSERT INTO adults (name, age) VALUES ($1, $2)', [name, age]);
      console.log(`[${process.pid}] Stored ${name} in adults`);
    } else {
      await pool.query('INSERT INTO children (name, age) VALUES ($1, $2)', [name, age]);
      console.log(`[${process.pid}] Stored ${name} in children`);
    }
  } catch (error) {
    console.error(`Worker ${process.pid} error:`, error.message);
  }
});
