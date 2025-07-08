const mongoose = require("mongoose");

const WritingSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  task: { type: Number, required: true },
  question: { type: String, required: true },
  textspeech: String,
  correctAnswer: String
}, { timestamps: true });

module.exports = { schema: WritingSchema };