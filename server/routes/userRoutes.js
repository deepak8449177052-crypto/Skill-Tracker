const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  updateNotifications,
  uploadAvatar,
} = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.put("/password", protect, changePassword);
router.put("/notifications", protect, updateNotifications);
router.post("/upload-avatar", protect, upload.single("avatar"), uploadAvatar);

module.exports = router;