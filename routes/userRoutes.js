const express = require("express");

const { createUser, loginUser } = require("../controllers/authController");
const {
  getUsers,
  getUserById,
  fetchUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/fetchUser", fetchUser);

router.post("/deleteUser", deleteUser);

router.get("/fetchUsers", getUsers);

router.get("/:id", getUserById);

module.exports = router;
