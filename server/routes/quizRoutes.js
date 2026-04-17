const express = require("express");
const router = express.Router();

const {
  getAvailableSkills,
  getQuizQuestions,
  checkAnswer,
  getQuizProgress,
  saveAttempt,
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

router.get("/skills", getAvailableSkills);
router.get("/progress", getQuizProgress);
router.get("/", getQuizQuestions);
router.post("/check-answer", checkAnswer);
router.post("/save-attempt", protect, saveAttempt);

module.exports = router;