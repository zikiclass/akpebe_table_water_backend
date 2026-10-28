const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//READ: GET /api/users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

//READ ONE: GET /api/users/:id
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const fetchUser = async (req, res, next) => {
  try {
    const { token } = req.body;
    try {
      const retrieveToken = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = retrieveToken.email;

      User.findOne({ email: userEmail })
        .then((data) => res.send({ status: "ok", data: data }))
        .catch((error) => res.send({ status: "error", data: error }));
    } catch (error) {
      res.send({ status: "error", data: error });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserById, fetchUser };
