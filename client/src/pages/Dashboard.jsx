import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [form, setForm] = useState({
    name: "",
    level: "Beginner",
    hoursPracticed: 0,
  });

  const predefinedSkills = [
    { name: "JavaScript", id: "javascript" },
    { name: "Python", id: "python" },
    { name: "React.js", id: "react" },
    { name: "Node.js", id: "node" },
    { name: "MongoDB", id: "mongodb" },
    { name: "Express.js", id: "express" },
    { name: "HTML & CSS", id: "htmlcss" }
  ];

  const loadDashboardData = async () => {
    try {
      // Load user's added skills
      const { data: userSkillsData } = await api.get("/skills");
      const userSkills = Array.isArray(userSkillsData) ? userSkillsData : userSkillsData.skills || [];
      setSkills(userSkills);

      // Load skills that have practice sets from the backend
      const { data: quizData } = await api.get("/quiz/skills");
      setAvailableSkills(quizData.skills || []);

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      alert("Please select a skill");
      return;
    }

    try {
      await api.post("/skills", {
        ...form,
        hoursPracticed: Number(form.hoursPracticed) || 0,
      });

      setForm({
        name: "",
        level: "Beginner",
        hoursPracticed: 0,
      });

      loadDashboardData();
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const deleteSkill = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      loadSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const safeSkills = Array.isArray(skills) ? skills : [];

  const stats = useMemo(() => {
    const totalSkills = safeSkills.length;
    const totalHours = safeSkills.reduce(
      (sum, skill) => sum + Number(skill.hoursPracticed || 0),
      0
    );

    return { totalSkills, totalHours };
  }, [safeSkills]);

  return (
    <div className="page-container animate-enter">
      <div className="hero-card delay-1">
        <h1>Welcome back, {user?.name || "User"}!</h1>
        <p>Track and improve your skills progress here.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Skills</h3>
          <p>{stats.totalSkills}</p>
        </div>

        <div className="stat-card">
          <h3>Total Practice Hours</h3>
          <p>{stats.totalHours}</p>
        </div>
      </div>

      <div className="content-grid">
        <div className="card">
          <h2>Add Skill</h2>

          <form className="skill-form" onSubmit={handleSubmit}>
            <select
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="skill-select"
            >
              <option value="">Select a Skill</option>
              {predefinedSkills.map((s) => {
                const isAvailable = availableSkills.includes(s.id);
                return (
                  <option key={s.id} value={s.id} disabled={!isAvailable}>
                    {s.name} {!isAvailable ? "(Upcoming)" : ""}
                  </option>
                );
              })}
            </select>

            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <input
              type="number"
              min="0"
              placeholder="Hours practiced"
              value={form.hoursPracticed}
              onChange={(e) =>
                setForm({ ...form, hoursPracticed: e.target.value })
              }
            />

            <button type="submit">Add Skill</button>
          </form>
        </div>

        <div className="card">
          <h2>Your Skills</h2>

          <div className="skill-list">
            {safeSkills.length === 0 ? (
              <p>No skills added yet.</p>
            ) : (
              safeSkills.map((skill) => (
                  <div className="skill-item" key={skill._id}>
                    <div>
                      <strong style={{ textTransform: 'capitalize' }}>{skill.name}</strong>
                      <p>
                        {skill.level} • {skill.hoursPracticed} hrs
                      </p>
                    </div>

                  <button
                    className="danger-btn"
                    onClick={() => deleteSkill(skill._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;