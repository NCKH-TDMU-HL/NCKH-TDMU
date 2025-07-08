const mongoose = require("mongoose");

const MatchingSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  task: { type: Number, required: true },
  question: { type: String, required: true },
  pairs: [{
    id: Number,
    vi: String,
    en: String
  }]
}, { timestamps: true });
module.exports = { schema: MatchingSchema};
