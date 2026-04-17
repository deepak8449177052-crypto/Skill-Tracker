const mongoose = require("mongoose");
const dotenv = require("dotenv");
const QuizQuestion = require("./models/QuizQuestion");

dotenv.config();

const verifyCounts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for verification");

    const stats = await QuizQuestion.aggregate([
      {
        $group: {
          _id: { skill: "$skill", set: "$setNumber" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.skill": 1, "_id.set": 1 } }
    ]);

    console.log("Question counts per set:");
    stats.forEach(s => {
      console.log(`${s._id.skill.toUpperCase()} Set ${s._id.set}: ${s.count} questions`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Verification failed:", error);
    process.exit(1);
  }
};

verifyCounts();
