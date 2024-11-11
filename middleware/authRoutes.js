import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usersCollection } from "./connectToMongoDB.js";
import { mailService } from "./mailService.js";
import { tokenAuthenticator, checkRole } from "./routeAuthenticator.js";

const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// @desc route to create a new user
// @method POST
// /register
authRouter.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await usersCollection.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      role: "member",
      verification_code: verificationCode,
      verified: false,
    });

    await usersCollection.insertOne(user);

    const verificationLink = `http://localhost:2000/auth/verify/${username}`;

    await mailService("newUser", email, verificationLink, verificationCode);

    res
      .status(201)
      .json({ message: "User registered succesfully. Please check your email for verification " });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Service error" });
  }
});

// @desc Verification route
// @method POST
// /verify/:username
authRouter.post("/verify/:username", async (req, res) => {
  try {
    const { username, codeForVerification } = req.body;
    const user = await usersCollection.findOne({
      username: username,
      verification_code: Number(codeForVerification),
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (Number(codeForVerification) === user.verification_code) {
      try {
        await usersCollection.updateOne(
          { username: username },
          {
            $set: { verified: true },
            $unset: { verification_code: "" },
          }
        );
        return res.status(200).json({ message: "Account verified successfully" });
      } catch (error) {
        console.error("Error verifyig email", error);
        return res.status(500).json({ message: "Server error" });
      }
    }
  } catch (error) {
    console.error("Error verifyig email", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc Forgot Password
// @method POST
// /forgot-password
authRouter.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.email === email) {
      const passwordResetLink = `http://localhost:2000/auth/password-reset/${user.username}`;
      mailService("passwordReset", email, passwordResetLink);
      return res.status(200).json({ message: "Password reset requested, check your email." });
    }
  } catch (error) {
    console.error("Server error", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc Change password
// @method POST
// /change-password
authRouter.post("/change-password:username", async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    const user = await usersCollection.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (username === user.username) {
      const password = await bcrypt.hash(newPassword, 10);
      await usersCollection.updateOne({ username: username }, { $set: { password: password } });
      return res.status(200).json({ message: "Password has been reset. You can login now" });
    }
  } catch (error) {
    console.log("Server error", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc Login route
// @method POST
// /login/:username
authRouter.post("/login/:username", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are both required" });
    }

    const user = await usersCollection.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials (username)" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials (password)" });
    }

    if (username === user.username && isMatch) {
      const token = jwt.sign(
        { username: user.username, email: user.email, role: user.role },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res
        .status(200)
        .json({ message: "Login successful", token, username: username, role: user.role });
    }
  } catch (error) {
    console.log("Server error", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc Continue as guest route
// @method POST
// /login/guest
authRouter.post("/login-guest", async (req, res) => {
  try {
    const { username } = req.body;
    const token = jwt.sign({ username: username, role: "guest" }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ message: "Login successful as guest", token, username: username });
  } catch (error) {
    console.log("Server error", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc View Homepage *protected route
// @method POST
// /homepage
authRouter.post(
  "/dashboard",
  tokenAuthenticator,
  checkRole(["admin", "member"]),
  async (req, res) => {
    try {
      return res.status(200).json({
        message: "Welcome",
        username: req.user.username,
        role: req.user.role,
        mail: req.user.email,
      });
    } catch (error) {
      console.log("Server error", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// @desc View Statistics *protected route
// @method POST
// /statistics
authRouter.post(
  "/dashboard/statistics",
  tokenAuthenticator,
  checkRole(["admin", "member"]),
  async (req, res) => {
    try {
      return res.status(200).json({
        message: "Welcome",
        username: req.user.username,
        role: req.user.role,
        mail: req.user.email,
      });
    } catch (error) {
      console.log("Server error", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// @desc Admin-room *protected route
// @method POST
// /statistics
authRouter.post(
  "/dashboard/admin-room",
  tokenAuthenticator,
  checkRole(["admin"]),
  async (req, res) => {
    try {
      return res.status(200).json({
        message: "Welcome",
        username: req.user.username,
        role: req.user.role,
        mail: req.user.email,
      });
    } catch (error) {
      console.log("Server error", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

export default authRouter;
