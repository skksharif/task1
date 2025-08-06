require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const userRoutes = require('./routes/userRoutes');
const db = require('./db');

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on - http://localhost:${PORT}`);
});
