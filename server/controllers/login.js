const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Find user by email
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
};

const signup = async (req, res, next) => {
  try {
    const { name, phone, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      phone,
      password: passwordHash,
      role,
    });

    // Pass the userId to the next middleware
    req.body.userId = newUser._id;
    req.newUser = newUser; // Store newUser in the request object
    next();
  } catch (error) {
    console.error("Error during signup:", error); // Log the error
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const getuserbyid = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json(user);
  }
  catch (error) {
    return res.status(500).json({
      message: "Error getting user",
      error: error.message,
    });
  }
}

module.exports = { login, signup,getuserbyid };