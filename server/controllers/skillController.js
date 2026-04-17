const Skill = require("../models/Skill");

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: skills.length,
      skills,
    });
  } catch (error) {
    console.error("Get skills error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching skills",
    });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, level, hoursPracticed } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    const normalizedName = name.trim().toLowerCase();

    const existingSkill = await Skill.findOne({
      user: req.user._id,
      name: normalizedName,
    });

    if (existingSkill) {
      return res.status(400).json({
        success: false,
        message: "This skill already exists",
      });
    }

    const skill = await Skill.create({
      user: req.user._id,
      name: normalizedName,
      level: level || "Beginner",
      hoursPracticed:
        hoursPracticed !== undefined ? Number(hoursPracticed) : 0,
    });

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    console.error("Create skill error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating skill",
    });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    if (req.body.name && req.body.name.trim()) {
      skill.name = req.body.name.trim().toLowerCase();
    }

    if (req.body.level) {
      skill.level = req.body.level;
    }

    if (req.body.hoursPracticed !== undefined) {
      skill.hoursPracticed = Number(req.body.hoursPracticed);
    }

    const updatedSkill = await skill.save();

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill: updatedSkill,
    });
  } catch (error) {
    console.error("Update skill error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating skill",
    });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Delete skill error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting skill",
    });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};