const mongoose = require("mongoose");

const MultipleChoiceSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  task: { type: Number, required: true },
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      image: String,
    }
  ],
  correctAnswer: String,
}, { timestamps: true });

module.exports = { schema: MultipleChoiceSchema};