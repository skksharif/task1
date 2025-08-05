const express = require("express");
const router = express.Router();
const { addUser, getUsers } = require("../controllers/userController");

router.post("/adduser", addUser);
router.get("/getusers/:type", getUsers);

module.exports = router;
