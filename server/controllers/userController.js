const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user profile",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (req.body.name && req.body.name.trim()) {
      user.name = req.body.name.trim();
    }

    if (req.body.email && req.body.email.trim()) {
      user.email = req.body.email.trim().toLowerCase();
    }

    if (req.body.bio !== undefined) user.bio = req.body.bio;
    if (req.body.avatar !== undefined) user.avatar = req.body.avatar;
    
    // Safety check for date formatting to prevent "Update failed" errors
    if (req.body.dateOfBirth && req.body.dateOfBirth.trim() !== "") {
      user.dateOfBirth = req.body.dateOfBirth;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
        dateOfBirth: updatedUser.dateOfBirth,
        notifications: updatedUser.notifications,
      },
    });
  } catch (error) {
    console.error("Update user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while changing password",
    });
  }
};

const updateNotifications = async (req, res) => {
  try {
    const { email, push, reminders } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.notifications = {
      email: typeof email === "boolean" ? email : user.notifications?.email ?? true,
      push: typeof push === "boolean" ? push : user.notifications?.push ?? true,
      reminders:
        typeof reminders === "boolean"
          ? reminders
          : user.notifications?.reminders ?? true,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Notification settings updated successfully",
      notifications: user.notifications,
    });
  } catch (error) {
    console.error("Update notifications error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating notifications",
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Save the relative path
    user.avatar = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Upload avatar error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during file upload",
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
  updateNotifications,
  uploadAvatar,
};