const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User fullname is required"],
      trim: true,
      minlength: [2, "Fullname must contain at least 2 characters"],
      maxlength: [100, "Fullname cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["director", "manager", "driver", "customer", "staff"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
