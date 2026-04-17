const User = require("../models/User");
const PracticeAttempt = require("../models/PracticeAttempt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
};

const getAllAttempts = async (req, res) => {
  try {
    const attempts = await PracticeAttempt.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      attempts,
    });
  } catch (error) {
    console.error("Get all attempts error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching attempts",
    });
  }
};

module.exports = {
  getAllUsers,
  getAllAttempts,
};
