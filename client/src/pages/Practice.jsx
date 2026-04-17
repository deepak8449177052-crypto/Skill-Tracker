import React from "react";
import { useNavigate } from "react-router-dom";

const Practice = () => {
  const navigate = useNavigate();

  const practiceItems = [
    "Start Practice",
  ];

  return (
    <div className="page-container">
      <div className="hero-card">
        <h1>Practice</h1>
        <p>Sharpen your skills with hands-on practice.</p>
      </div>

      <div className="practice-grid">
        {practiceItems.map((item, index) => (
          <div className="practice-card" key={index}>
            <h3>{item}</h3>
            <p>Daily challenges, MCQs, exercises, and coding tasks.</p>

            <button onClick={() => navigate("/practice/startPractice")}>
              Start Practice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;