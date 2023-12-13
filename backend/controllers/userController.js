const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const sendOTP = require("../utils/sendOTP");

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "Email already exists." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "Registration successful." });
  } catch (error) {
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("req", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      "This i$ very very h@rd TOKEN_SECRET!!!",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful.",
      userId: user._id,
      token: token,
      expiresIn: 3600,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed. Please try again." });
  }
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const otpCache = new Map();

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const otp = generateOTP();
    otpCache.set(email, otp);

    console.log(otp);

    user.passwordResetOTP = otp;
    await user.save();

    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent to your email address." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Password reset request failed. Please try again." });
  }
};

const verifyPasswordResetOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const storedOTP = user.passwordResetOTP.toString();

    if (storedOTP !== otp) {
      return res.status(400).json({ error: "Invalid OTP. Please try again." });
    }

    res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "OTP verification failed. Please try again." });
  }
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const newPassword = await bcrypt.hash(password, 10);
    user.password = newPassword;
    user.passwordResetOTP = null;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Password update failed. Please try again." });
  }
};

module.exports = {
  register,
  login,
  requestPasswordReset,
  verifyPasswordResetOTP,
  updatePassword,
};
