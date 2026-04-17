import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    name: "",
    level: "Beginner",
    hoursPracticed: 0,
  });

  const loadSkills = async () => {
    try {
      const { data } = await api.get("/skills");
      console.log("Skills API response:", data);

      const skillsData = Array.isArray(data)
        ? data
        : Array.isArray(data.skills)
        ? data.skills
        : [];

      setSkills(skillsData);
    } catch (error) {
      console.error("Error loading skills:", error);
      setSkills([]);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      loadSkills();
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
    <div className="page-container">
      <div className="hero-card">
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
            <input
              type="text"
              placeholder="Skill name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

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
                    <strong>{skill.name}</strong>
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