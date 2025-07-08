const mongoose = require("mongoose");

const ListeningSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  task: { type: Number, required: true },
  question: { type: String, required: true },
  image: String,
  correctAnswer: String,
  options: { type: [String], required: true }
}, { timestamps: true });
module.exports = { schema: ListeningSchema};