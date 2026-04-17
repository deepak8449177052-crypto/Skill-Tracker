const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Beginner to Advanced", "Intermediate to Advanced"],
      default: "Beginner",
    },
    duration: {
      type: String,
      default: "4 Weeks",
    },
    instructor: {
      type: String,
      default: "Skill Tracker Team",
    },
    students: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    modules: {
      type: [String],
      default: [],
    },
    projects: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);