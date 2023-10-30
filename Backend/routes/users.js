const express = require("express");
const { registerUser, loginUser, ChangePassword } = require("../controllers/userCtrl");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/change-password/:userId", ChangePassword);

module.exports = router;
