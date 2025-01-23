const mongoose = require("mongoose");
const { route } = require("../routes/labour");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["worker", "jobProvider"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
