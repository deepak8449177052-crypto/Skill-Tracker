const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getAllCourses,
  getCourseBySlug,
  enrollInCourse,
  getMyEnrollments,
  updateCourseProgress,
} = require("../controllers/courseController");

router.get("/", getAllCourses);
router.get("/my-enrollments", protect, getMyEnrollments);
router.get("/:slug", getCourseBySlug);
router.post("/enroll", protect, enrollInCourse);
router.put("/progress/:enrollmentId", protect, updateCourseProgress);

module.exports = router;