const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  type: {
    type: String,
    enum: ["mcq", "coding"],
    default: "coding"
  },
  options: [String],
  answer: String,
  hint: String,
  starterCode: String
});

const practiceSetSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true
    },
    title: String,
    setNumber: Number,
    questions: [questionSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("PracticeSet", practiceSetSchema);