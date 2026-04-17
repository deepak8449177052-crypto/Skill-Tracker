import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await API.get("/courses");
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Courses fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <h2 style={{ color: "white", padding: "30px" }}>Loading courses...</h2>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Courses</h1>
          <p style={styles.heroText}>Explore courses to enhance your skills.</p>
        </div>

        <div style={styles.grid}>
          {courses.map((course) => (
            <div key={course._id} style={styles.card}>
              <h2 style={styles.cardTitle}>{course.title}</h2>
              <p style={styles.cardText}>{course.subtitle}</p>

              <div style={styles.meta}>
                <span>{course.level}</span>
                <span>{course.duration}</span>
              </div>

              <Link to={`/courses/${course.slug}`} style={styles.button}>
                Explore Course
              </Link>
            </div>
          ))}
        </div>
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
    maxWidth: "1400px",
    margin: "0 auto",
  },
  hero: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "28px",
    padding: "28px",
    marginBottom: "24px",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "8px",
  },
  heroText: {
    fontSize: "1.1rem",
    color: "#dbeafe",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "800",
    marginBottom: "10px",
  },
  cardText: {
    color: "#e2e8f0",
    lineHeight: "1.6",
    marginBottom: "14px",
  },
  meta: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "18px",
    color: "#bfdbfe",
    fontWeight: "600",
  },
  button: {
    display: "inline-block",
    background: "#22c55e",
    color: "white",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    fontWeight: "800",
  },
};

export default Courses;