const db = require("../db");
const mqttClient = require("../mqtt/mqttClient");

exports.addUser = async (req, res) => {
  const { name, age } = req.body;

  if (!name || age === undefined) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  try {
    // 1. Insert user into the processing table
    await db.query(
      'INSERT INTO processing (name, age) VALUES ($1, $2)',
      [name, age]
    );

    // 2. Publish a message to the MQTT topic to notify workers
    mqttClient.publish('user/new_task', 'new');

    res.json({ message: 'Task queued for processing' });
  } catch (err) {
    console.error('Error inserting to processing:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const userType = req.params.type;

    //Getting users from the database based on type
    const result = await db.query(`SELECT * FROM ${userType}`);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
