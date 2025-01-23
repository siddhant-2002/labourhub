const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }

    let user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const payload = {
      id: user._id,
      role: user.role,
      mobile: user.phone,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user = user.toObject();
    user.password = undefined;
    user.token = token;

    const options = {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    };

    res.cookie("token", token, { options });

    return res.json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;
    // console.log(name, phone,email, password, role);

    // const userExists = await User.findOne({ phone });
    // if (userExists) {
    //   return res.status(400).json({
    //     message: "User already exists",
    //   });
    // }
    console.log("hello");
    // Hash the password
    let passwordHash;
    try {
      passwordHash = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        message: "error hashing password",
      });
    }

    // Create a new user
    const newUser = await User.create({
      name,
      phone,
      email,
      password: passwordHash,
      role,
    });

    // console.log(newUser)

    return res.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error creating user",
    });
  }
};

module.exports = { login, signup };
