import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const StartPractice = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("javascript");
  const [selectedSet, setSelectedSet] = useState(1);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answerMessage, setAnswerMessage] = useState("");
  const [lockedSets, setLockedSets] = useState([2, 3, 4, 5]);

  const currentQuestion = useMemo(() => {
    return questions[currentIndex] || null;
  }, [questions, currentIndex]);

  const totalQuestions = questions.length;
  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    fetchQuestions(selectedSkill, selectedSet);
  }, [selectedSkill, selectedSet]);

  const fetchSkills = async () => {
    try {
      const { data } = await API.get("/quiz/skills");
      if (data?.success && Array.isArray(data.skills) && data.skills.length) {
        setSkills(data.skills);
        if (!data.skills.includes(selectedSkill)) {
          setSelectedSkill(data.skills[0]);
        }
      } else {
        setSkills(["javascript", "python"]);
      }
    } catch (error) {
      console.error("Skills fetch error:", error);
      setSkills(["javascript", "python"]);
    }
  };

  const fetchQuestions = async (skill, setNo) => {
    try {
      setLoading(true);
      setQuizFinished(false);
      setCurrentIndex(0);
      setSelectedOption("");
      setShowResult(false);
      setIsCorrect(false);
      setScore(0);
      setAnswerMessage("");

      const res = await API.get(`/quiz?skill=${skill}&set=${setNo}`);
      const questionsData = Array.isArray(res.data?.questions)
        ? res.data.questions
        : [];

      setQuestions(questionsData);
    } catch (error) {
      console.error("Fetch error:", error);
      setQuestions([]);
      alert("Questions load nahi huye");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = async (option) => {
    if (showResult || !currentQuestion) return;

    setSelectedOption(option);

    try {
      const { data } = await API.post("/quiz/check-answer", {
        questionId: currentQuestion._id,
        selectedAnswer: option,
      });

      setIsCorrect(data.correct);
      setShowResult(true);

      if (data.correct) {
        setScore((prev) => prev + (data.marksAwarded || 1));
        setAnswerMessage(`✔ Correct! ${data.explanation || ""}`);
      } else {
        setAnswerMessage(
          `✘ Wrong! Correct answer is ${data.correctAnswer}. ${data.explanation || ""}`
        );
      }
    } catch (error) {
      console.error(error);
      alert("Answer check nahi ho paya");
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption("");
      setShowResult(false);
      setIsCorrect(false);
      setAnswerMessage("");
    } else {
      setQuizFinished(true);

      const finalPercentage = Math.round(((score) / questions.length) * 100);
      const passed = finalPercentage >= 75;

      if (passed && selectedSet < 5) {
        setLockedSets((prev) => prev.filter((item) => item !== selectedSet + 1));
      }

      // Save attempt to DB
      API.post("/quiz/save-attempt", {
        skill: selectedSkill,
        setNumber: selectedSet,
        score: score,
        totalQuestions: questions.length,
        percentage: finalPercentage,
        passed: passed,
      }).catch((err) => console.error("Could not save attempt:", err));
    }
  };

  const handleChangeSkill = (e) => {
    setSelectedSkill(e.target.value);
    setSelectedSet(1);
    setLockedSets([2, 3, 4, 5]);
  };

  const handleSetChange = (setNo) => {
    if (lockedSets.includes(setNo)) {
      alert("Pehle previous set me 75% ya usse zyada score lao.");
      return;
    }
    setSelectedSet(setNo);
  };

  const getOptionClass = (option) => {
    if (!showResult) return "quiz-option";

    if (option === selectedOption && option === currentQuestion?.correctAnswer) {
      return "quiz-option correct";
    }

    if (option === selectedOption && option !== currentQuestion?.correctAnswer) {
      return "quiz-option wrong";
    }

    if (option === currentQuestion?.correctAnswer) {
      return "quiz-option correct";
    }

    return "quiz-option";
  };

  if (loading) {
    return (
      <div className="quiz-page">
        <div className="quiz-wrapper">
          <h1>Loading Practice...</h1>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="quiz-page">
        <div className="quiz-wrapper">
          <h1>No Questions Found</h1>
          <p>Backend se question data nahi aaya.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page" style={styles.page}>
      <div className="quiz-wrapper" style={styles.wrapper}>
        

        <div style={styles.topControls}>
          <div>
            <label style={styles.label}>Select Skill</label>
            <select
              value={selectedSkill}
              onChange={handleChangeSkill}
              style={styles.select}
            >
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label}>Choose Set</label>
            <div style={styles.setContainer}>
              {[1, 2, 3, 4, 5].map((setNo) => (
                <button
                  key={setNo}
                  onClick={() => handleSetChange(setNo)}
                  style={{
                    ...styles.setButton,
                    background:
                      selectedSet === setNo ? "#2563eb" : lockedSets.includes(setNo) ? "#94a3b8" : "#0f172a",
                    cursor: lockedSets.includes(setNo) ? "not-allowed" : "pointer",
                  }}
                >
                  Set {setNo}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!quizFinished ? (
          <div style={styles.card}>
            <div style={styles.infoRow}>
              <span>Skill: {selectedSkill.toUpperCase()}</span>
              <span>Set: {selectedSet}</span>
              <span>
                Question {currentIndex + 1}/{totalQuestions}
              </span>
              <span>Score: {score}</span>
            </div>

            <h2 style={styles.question}>{currentQuestion.question}</h2>

            <div style={styles.optionsWrap}>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  disabled={showResult}
                  style={{
                    ...styles.optionBtn,
                    ...(getOptionClass(option) === "quiz-option correct"
                      ? styles.correct
                      : getOptionClass(option) === "quiz-option wrong"
                      ? styles.wrong
                      : {}),
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div
                style={{
                  ...styles.resultBox,
                  background: isCorrect ? "#dcfce7" : "#fee2e2",
                  color: "#111827",
                }}
              >
                {answerMessage}
              </div>
            )}

            <div style={styles.actionRow}>
              <button
                onClick={handleNextQuestion}
                disabled={!showResult}
                style={{
                  ...styles.nextBtn,
                  opacity: !showResult ? 0.5 : 1,
                }}
              >
                {currentIndex === questions.length - 1 ? "Finish Set" : "Next Question"}
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.resultCard}>
            <h2>Set Completed 🎉</h2>
            <p>Skill: {selectedSkill.toUpperCase()}</p>
            <p>Set Number: {selectedSet}</p>
            <p>Total Questions: {totalQuestions}</p>
            <p>Your Score: {score}</p>
            <p>Percentage: {percentage}%</p>

            {percentage >= 75 ? (
              <div style={styles.passBox}>
                ✅ Congrats! You unlocked{" "}
                {selectedSet < 5 ? `Set ${selectedSet + 1}` : "all sets"}.
              </div>
            ) : (
              <div style={styles.failBox}>
                ❌ 75% se kam score hai. Is set ko dubara karo.
              </div>
            )}

            <div style={styles.resultActions}>
              <button
                style={styles.retryBtn}
                onClick={() => fetchQuestions(selectedSkill, selectedSet)}
              >
                Retry Set
              </button>

              {percentage >= 75 && selectedSet < 5 && (
                <button
                  style={styles.nextBtn}
                  onClick={() => setSelectedSet((prev) => prev + 1)}
                >
                  Go To Next Set
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
    padding: "30px",
    color: "white",
  },
  wrapper: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "14px",
  },
  logo: {
    fontSize: "2rem",
    fontWeight: "800",
  },
  navLinks: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "700",
  },
  topControls: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "24px",
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "18px",
    backdropFilter: "blur(10px)",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "700",
  },
  select: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    minWidth: "220px",
  },
  setContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  setButton: {
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    fontWeight: "700",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(14px)",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
    fontWeight: "700",
  },
  question: {
    fontSize: "1.8rem",
    marginBottom: "22px",
    lineHeight: 1.4,
  },
  optionsWrap: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  optionBtn: {
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
  },
  correct: {
    background: "#22c55e",
    color: "white",
  },
  wrong: {
    background: "#ef4444",
    color: "white",
  },
  resultBox: {
    marginTop: "18px",
    padding: "16px",
    borderRadius: "14px",
    fontWeight: "700",
  },
  actionRow: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "flex-end",
  },
  nextBtn: {
    background: "#f97316",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "12px 20px",
    fontWeight: "800",
    cursor: "pointer",
  },
  resultCard: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(14px)",
    borderRadius: "24px",
    padding: "30px",
    textAlign: "center",
  },
  passBox: {
    background: "#dcfce7",
    color: "#166534",
    padding: "14px",
    borderRadius: "12px",
    marginTop: "16px",
    fontWeight: "700",
  },
  failBox: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "14px",
    borderRadius: "12px",
    marginTop: "16px",
    fontWeight: "700",
  },
  resultActions: {
    marginTop: "22px",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  retryBtn: {
    background: "#334155",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "12px 20px",
    fontWeight: "800",
    cursor: "pointer",
  },
};

export default StartPractice;