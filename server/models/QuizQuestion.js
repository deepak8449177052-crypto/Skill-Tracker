const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    setNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    questionNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      enum: ["mcq"],
      default: "mcq",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length >= 2;
        },
        message: "At least 2 options are required",
      },
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      default: "",
    },
    marks: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

quizQuestionSchema.index({ skill: 1, setNumber: 1, questionNumber: 1 });

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);