const db = require("../db");
const jobQueue = require("../queue/queue");

exports.addUser = async (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) return res.status(400).json({ error: "Name and age required" });

  jobQueue.push({ name, age });
  res.status(202).json({ message: "User Added Successfully...!" });
};

exports.getUsers = async (req, res) => {
  try {
    const userType = req.params.type;
    const result = await db.query(`SELECT * FROM ${userType}`);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
