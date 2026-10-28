// const dns = require("dns");

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// require("dotenv").config();
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

// const app = express();

// app.use(express.json());

// require("./schema/userSchema");
// const User = mongoose.model("users");

// const mongoURL = process.env.MONGO_URL;
// mongoose
//   .connect(mongoURL)
//   .then(() => console.log("Database connected successfully"))
//   .catch((e) => console.log(e));

// app.post("/register", async (req, res) => {
//   const { name, email, phone, password } = req.body;

//   const oldUser = await User.findOne({ email: email });
//   if (oldUser) {
//     return res.send({ data: "Email already exist" });
//   }
//   const encryptedPassword = await bcrypt.hash(password, 10);
//   try {
//     await User.create({
//       name,
//       email,
//       phone,
//       password: encryptedPassword,
//     });
//     res.send({ status: "ok", data: "Account created" });
//   } catch (error) {
//     res.send({ status: "error", data: error });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const oldUser = await User.findOne({ email: email });
//     if (!oldUser) {
//       return res.send({ data: "User doesn't exist!" });
//     }
//     if (await bcrypt.compare(password, oldUser.password)) {
//       const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
//       if (res.status(201)) {
//         return res.send({ status: "ok", data: token });
//       } else {
//         return res.send({ status: "error" });
//       }
//     } else {
//       return res.send({ data: "User doesn't exist!" });
//     }
//   } catch (error) {
//     return res.send({ status: "error", data: error });
//   }
// });

// app.post("/fetchUser", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const retrieveToken = jwt.verify(token, process.env.JWT_SECRET);
//     const userEmail = retrieveToken.email;

//     User.findOne({ email: userEmail })
//       .then((data) => res.send({ status: "ok", data: data }))
//       .catch((error) => res.send({ status: "error", data: error }));
//   } catch (error) {
//     res.send({ status: "error", data: error });
//   }
// });
// app.listen(3000, () => {
//   console.log("Server has started on port 3000");
// });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");

const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Water API is running",
  });
});

app.use("/api", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server: ", error.message);
    process.exit(1);
  }
};

startServer();
