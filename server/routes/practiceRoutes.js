const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getPracticeSets,
  generatePracticeSet,
  checkPracticeAnswer,
  getPracticeHistory,
} = require("../controllers/practiceController");

router.get("/sets", protect, getPracticeSets);
router.post("/generate-set", protect, generatePracticeSet);
router.post("/check-answer", protect, checkPracticeAnswer);
router.get("/history", protect, getPracticeHistory);

module.exports = router;