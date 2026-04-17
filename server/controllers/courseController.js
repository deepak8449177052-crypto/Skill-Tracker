const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get all courses error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching courses",
    });
  }
};

const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Get course by slug error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching course details",
    });
  }
};

const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
      progress: 0,
      status: "enrolled",
      completedModules: [],
    });

    await Course.findByIdAndUpdate(courseId, {
      $inc: { students: 1 },
    });

    res.status(201).json({
      success: true,
      message: "Course enrolled successfully",
      enrollment,
    });
  } catch (error) {
    console.error("Enroll in course error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while enrolling in course",
    });
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate("course")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    console.error("Get my enrollments error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching enrollments",
    });
  }
};

const updateCourseProgress = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { progress, status, completedModules } = req.body;

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      user: req.user._id,
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    if (progress !== undefined) enrollment.progress = progress;
    if (status) enrollment.status = status;
    if (completedModules) enrollment.completedModules = completedModules;

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: "Course progress updated successfully",
      enrollment,
    });
  } catch (error) {
    console.error("Update course progress error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating course progress",
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseBySlug,
  enrollInCourse,
  getMyEnrollments,
  updateCourseProgress,
};