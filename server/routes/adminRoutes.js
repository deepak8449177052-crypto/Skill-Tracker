const express = require("express");
const router = express.Router();

const { getAllUsers, getAllAttempts } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/users", protect, admin, getAllUsers);
router.get("/attempts", protect, admin, getAllAttempts);

module.exports = router;
