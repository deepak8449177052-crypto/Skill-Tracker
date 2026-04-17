const getPracticeSets = async (req, res) => {
  try {
    const { skill = "javascript" } = req.query;

    const sets = [
      {
        setNumber: 1,
        skill,
        totalQuestions: 5,
        unlocked: true,
      },
      {
        setNumber: 2,
        skill,
        totalQuestions: 5,
        unlocked: false,
      },
      {
        setNumber: 3,
        skill,
        totalQuestions: 5,
        unlocked: false,
      },
      {
        setNumber: 4,
        skill,
        totalQuestions: 5,
        unlocked: false,
      },
      {
        setNumber: 5,
        skill,
        totalQuestions: 5,
        unlocked: false,
      },
    ];

    res.status(200).json({
      success: true,
      sets,
    });
  } catch (error) {
    console.error("Get practice sets error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching practice sets",
    });
  }
};

const generatePracticeSet = async (req, res) => {
  try {
    const { skill = "javascript", setNumber = 1 } = req.body;

    const questions = [
      {
        _id: "q1",
        question: `${skill} me variable declare karne ke liye kaunsa keyword use hota hai?`,
        options: ["var", "print", "table", "loop"],
        correctAnswer: "var",
      },
      {
        _id: "q2",
        question: `${skill} me array ke end me item add karne ka method kya hai?`,
        options: ["push()", "pop()", "map()", "slice()"],
        correctAnswer: "push()",
      },
      {
        _id: "q3",
        question: `${skill} me strict equality operator kaunsa hai?`,
        options: ["===", "==", "=", "!="],
        correctAnswer: "===",
      },
      {
        _id: "q4",
        question: `${skill} me function delay se chalane ke liye kya use hota hai?`,
        options: ["setTimeout()", "delay()", "sleep()", "pause()"],
        correctAnswer: "setTimeout()",
      },
      {
        _id: "q5",
        question: `${skill} me JSON string ko object me convert karne ka method kya hai?`,
        options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.make()"],
        correctAnswer: "JSON.parse()",
      },
    ];

    res.status(200).json({
      success: true,
      skill,
      setNumber,
      questions,
    });
  } catch (error) {
    console.error("Generate practice set error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while generating practice set",
    });
  }
};

const checkPracticeAnswer = async (req, res) => {
  try {
    const { correctAnswer, selectedAnswer } = req.body;

    if (!correctAnswer || !selectedAnswer) {
      return res.status(400).json({
        success: false,
        message: "correctAnswer and selectedAnswer are required",
      });
    }

    const isCorrect =
      String(correctAnswer).trim().toLowerCase() ===
      String(selectedAnswer).trim().toLowerCase();

    res.status(200).json({
      success: true,
      correct: isCorrect,
      marksAwarded: isCorrect ? 1 : 0,
    });
  } catch (error) {
    console.error("Check practice answer error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while checking answer",
    });
  }
};

const getPracticeHistory = async (req, res) => {
  try {
    const history = [
      {
        skill: "javascript",
        setNumber: 1,
        score: 4,
        total: 5,
        percentage: 80,
        date: new Date(),
      },
    ];

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Get practice history error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching practice history",
    });
  }
};

module.exports = {
  getPracticeSets,
  generatePracticeSet,
  checkPracticeAnswer,
  getPracticeHistory,
};