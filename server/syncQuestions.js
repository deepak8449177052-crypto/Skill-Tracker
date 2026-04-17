const mongoose = require("mongoose");
const dotenv = require("dotenv");
const QuizQuestion = require("./models/QuizQuestion");
const { localQuestionBank } = require("./controllers/quizController");

dotenv.config();

const syncQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for question sync");

    let addedCount = 0;
    let existingCount = 0;

    for (const skill in localQuestionBank) {
      const bank = localQuestionBank[skill];
      console.log(`Processing skill: ${skill} (${bank.length} questions)`);

      for (const item of bank) {
        const query = {
          skill: skill.toLowerCase(),
          setNumber: item.setNumber,
          questionNumber: item.questionNumber
        };

        const existing = await QuizQuestion.findOne(query);

        if (!existing) {
          await QuizQuestion.create({
            ...query,
            type: "mcq",
            difficulty: item.difficulty,
            question: item.question,
            options: item.options,
            correctAnswer: item.correctAnswer,
            explanation: item.explanation || "",
            marks: 1
          });
          addedCount++;
        } else {
          // Optional: Update existing if needed, but for now we just add new ones
          existingCount++;
        }
      }
    }

    console.log(`Sync complete!`);
    console.log(`Added: ${addedCount} new questions`);
    console.log(`Existing: ${existingCount} questions remain unchanged`);
    
    process.exit(0);
  } catch (error) {
    console.error("Sync failed:", error);
    process.exit(1);
  }
};

syncQuestions();
