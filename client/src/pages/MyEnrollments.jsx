import { useEffect, useState } from "react";
import API from "../api/axios";

const MyEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data } = await API.get("/courses/my-enrollments");
        setEnrollments(data.enrollments || []);
      } catch (error) {
        console.error("Enrollments fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return <h2 style={{ color: "white", padding: "30px" }}>Loading enrollments...</h2>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>My Enrollments</h1>

        {enrollments.length === 0 ? (
          <div style={styles.emptyCard}>
            <p>You have not enrolled in any course yet.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {enrollments.map((item) => (
              <div key={item._id} style={styles.card}>
                <h2>{item.course?.title}</h2>
                <p>{item.course?.subtitle}</p>
                <p>Status: {item.status}</p>
                <p>Progress: {item.progress}%</p>
                <p>Instructor: {item.course?.instructor}</p>
                
                <a 
                  href={`/courses/${item.course?.slug}`} 
                  style={styles.actionBtn}
                >
                  View Details & Learn
                </a>
              </div>
            ))}
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
    padding: "30px 20px",
    color: "white",
  },
  container: {
    maxWidth: "1300px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "24px",
    fontWeight: "800",
  },
  emptyCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "24px",
    borderRadius: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "rgba(255,255,255,0.10)",
    padding: "22px",
    borderRadius: "20px",
  },
  actionBtn: {
    display: "inline-block",
    marginTop: "16px",
    padding: "10px 16px",
    background: "#22c55e",
    color: "white",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    textAlign: "center"
  }
};

export default MyEnrollments;