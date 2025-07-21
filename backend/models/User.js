const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type : String, required: true},
  email: {type: String, default: ""},
  phone: {type: String, default: ""},
  dob: {type: String, default: ""},
  avatar: {type: String, default: ""},
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);