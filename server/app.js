const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");
app.use(cors());

// start the worker
require("./queue/worker"); 

app.use(express.json());
app.use("/api/users", userRoutes);


const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
