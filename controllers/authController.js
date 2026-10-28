const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone and password are required",
      });
    }
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.send({ data: "Email already exist" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
      await User.create({
        name,
        email,
        phone,
        password: encryptedPassword,
      });
      res.send({ status: "ok", data: "Account created" });
    } catch (error) {
      res.send({ status: "error", data: error });
    }
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    try {
      const oldUser = await User.findOne({ email: email });
      if (!oldUser) {
        return res.send({ success: false, data: "User doesn't exist!" });
      }
      if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
        if (res.status(201)) {
          return res.send({ status: "ok", data: token });
        } else {
          return res.send({ status: "error" });
        }
      } else {
        return res.send({ data: "User doesn't exist!" });
      }
    } catch (error) {
      return res.send({ status: "error", data: error });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, loginUser };
