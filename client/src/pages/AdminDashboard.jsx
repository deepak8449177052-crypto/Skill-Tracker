import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, attemptsRes] = await Promise.all([
        API.get("/admin/users"),
        API.get("/admin/attempts"),
      ]);

      if (usersRes.data.success) {
        setUsers(usersRes.data.users);
      }
      if (attemptsRes.data.success) {
        setAttempts(attemptsRes.data.attempts);
      }
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
      alert("Error loading admin data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.wrapper}>
          <h2 style={{ color: "white" }}>Loading Admin Data...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <div style={styles.tabs}>
            <button
              onClick={() => setActiveTab("users")}
              style={{
                ...styles.tabButton,
                background: activeTab === "users" ? "#3b82f6" : "rgba(255,255,255,0.1)",
              }}
            >
              Registered Users
            </button>
            <button
              onClick={() => setActiveTab("attempts")}
              style={{
                ...styles.tabButton,
                background: activeTab === "attempts" ? "#3b82f6" : "rgba(255,255,255,0.1)",
              }}
            >
              Practice Attempts
            </button>
          </div>
        </div>

        <div style={styles.card}>
          {activeTab === "users" ? (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Role</th>
                    <th style={styles.th}>Registered On</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} style={styles.tr}>
                      <td style={styles.td}>{user.name || user.username || "Unknown"}</td>
                      <td style={styles.td}>{user.email}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            background: user.role === "admin" ? "#8b5cf6" : "#64748b",
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="4" style={styles.empty}>
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Student Name</th>
                    <th style={styles.th}>Skill</th>
                    <th style={styles.th}>Set No.</th>
                    <th style={styles.th}>Score</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt) => (
                    <tr key={attempt._id} style={styles.tr}>
                      <td style={styles.td}>{attempt.user?.name || attempt.user?.username || "Unknown"}</td>
                      <td style={styles.td}>{attempt.skill.toUpperCase()}</td>
                      <td style={styles.td}>{attempt.setNumber}</td>
                      <td style={styles.td}>
                        {attempt.score} / {attempt.totalQuestions} ({attempt.percentage}%)
                      </td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            background: attempt.passed ? "#22c55e" : "#ef4444",
                          }}
                        >
                          {attempt.passed ? "Passed" : "Failed"}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {new Date(attempt.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {attempts.length === 0 && (
                    <tr>
                      <td colSpan="6" style={styles.empty}>
                        No practice attempts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
    padding: "40px 20px",
    color: "white",
  },
  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    margin: 0,
  },
  tabs: {
    display: "flex",
    gap: "10px",
  },
  tabButton: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "16px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    fontWeight: "700",
    color: "#cbd5e1",
    textTransform: "uppercase",
    fontSize: "0.85rem",
    letterSpacing: "0.05em",
  },
  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  td: {
    padding: "16px",
    fontSize: "0.95rem",
  },
  badge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  empty: {
    padding: "40px",
    textAlign: "center",
    color: "#94a3b8",
    fontStyle: "italic",
  },
};

export default AdminDashboard;
