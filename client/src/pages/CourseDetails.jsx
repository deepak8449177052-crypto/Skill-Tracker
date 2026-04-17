import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkEnrollmentInfo = async (courseId) => {
      if (user) {
        try {
          const { data } = await API.get("/courses/my-enrollments");
          const enrolled = data.enrollments.some(
            (e) => e.course._id === courseId
          );
          setIsEnrolled(enrolled);
        } catch (error) {
          console.error("Check enrollment error:", error);
        }
      }
    };

    const fetchCourse = async () => {
      try {
        const { data } = await API.get(`/courses/${slug}`);
        setCourse(data.course);
        if (data.course) {
          checkEnrollmentInfo(data.course._id);
        }
      } catch (error) {
        console.error("Course detail fetch error:", error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug, user]);

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      setMessage("");

      const { data } = await API.post("/courses/enroll", {
        courseId: course._id,
      });

      setMessage(data.message || "Enrolled successfully");
      setIsEnrolled(true);
    } catch (error) {
      console.error("Enroll error:", error);
      setMessage(
        error.response?.data?.message || "Enrollment failed"
      );
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <h2 style={{ color: "white", padding: "30px" }}>Loading course...</h2>;
  }

  if (!course) {
    return (
      <div style={styles.page}>
        <div style={styles.notFoundCard}>
          <h1>Course Not Found</h1>
          <button style={styles.primaryBtn} onClick={() => navigate("/courses")}>
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.heroCard}>
          <div>
            <p style={styles.badge}>Course Detail</p>
            <h1 style={styles.title}>{course.title}</h1>
            <p style={styles.subtitle}>{course.subtitle}</p>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statBox}>
              <span style={styles.statLabel}>Level</span>
              <strong>{course.level}</strong>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statLabel}>Duration</span>
              <strong>{course.duration}</strong>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statLabel}>Students</span>
              <strong>{course.students}</strong>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statLabel}>Rating</span>
              <strong>{course.rating}</strong>
            </div>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.leftCol}>
            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>About This Course</h2>
              <p style={styles.paragraph}>{course.description}</p>
            </section>

            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>Modules</h2>
              <div style={styles.listWrap}>
                {course.modules?.map((item, index) => (
                  <div key={index} style={styles.listItem}>
                    <span style={styles.number}>{index + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>Projects You Will Build</h2>
              <div style={styles.tagWrap}>
                {course.projects?.map((item, index) => (
                  <span key={index} style={styles.projectTag}>
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div style={styles.rightCol}>
            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>Skills You Will Learn</h2>
              <div style={styles.tagWrap}>
                {course.skills?.map((skill, index) => (
                  <span key={index} style={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>Instructor</h2>
              <p style={styles.paragraph}>{course.instructor}</p>
            </section>

            <section style={styles.card}>
              {isEnrolled ? (
                <>
                  <h2 style={styles.sectionTitle}>Continue Learning</h2>
                  <p style={styles.paragraph}>
                    You are successfully enrolled in this course. Review the modules on the left to see what happens in this course.
                  </p>
                  <div style={styles.btnRow}>
                    <Link to="/my-enrollments" style={styles.primaryBtn}>
                      Go to My Enrollments
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h2 style={styles.sectionTitle}>Start Learning</h2>
                  <p style={styles.paragraph}>
                    Enroll in this course and improve your skills step by step.
                  </p>

                  {message && <p style={styles.message}>{message}</p>}

                  <div style={styles.btnRow}>
                    <button
                      style={styles.primaryBtn}
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? "Enrolling..." : "Enroll Now"}
                    </button>

                    <Link to="/courses" style={styles.secondaryBtn}>
                      Back
                    </Link>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1d4ed8, #2563eb)",
    padding: "30px 20px",
    color: "white",
  },
  container: {
    maxWidth: "1300px",
    margin: "0 auto",
  },
  heroCard: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "24px",
    padding: "28px",
    backdropFilter: "blur(14px)",
    marginBottom: "24px",
  },
  badge: {
    display: "inline-block",
    background: "#22c55e",
    color: "white",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    marginBottom: "16px",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#dbeafe",
    marginBottom: "22px",
    lineHeight: "1.7",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
  },
  statBox: {
    background: "rgba(255,255,255,0.12)",
    borderRadius: "18px",
    padding: "16px",
  },
  statLabel: {
    display: "block",
    color: "#cbd5e1",
    marginBottom: "6px",
    fontSize: "0.95rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "24px",
    padding: "24px",
    backdropFilter: "blur(12px)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "16px",
    fontWeight: "800",
  },
  paragraph: {
    color: "#e5eefc",
    lineHeight: "1.8",
  },
  listWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255,255,255,0.08)",
    padding: "14px",
    borderRadius: "14px",
  },
  number: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#22c55e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    flexShrink: 0,
  },
  tagWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  skillTag: {
    background: "#1e40af",
    color: "white",
    padding: "10px 14px",
    borderRadius: "999px",
    fontWeight: "600",
  },
  projectTag: {
    background: "#0f766e",
    color: "white",
    padding: "10px 14px",
    borderRadius: "999px",
    fontWeight: "600",
  },
  btnRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "16px",
  },
  primaryBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    fontWeight: "800",
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#1e3a8a",
    color: "white",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    fontWeight: "800",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: "12px",
    color: "#bbf7d0",
    fontWeight: "700",
  },
  notFoundCard: {
    maxWidth: "600px",
    margin: "80px auto",
    background: "rgba(255,255,255,0.12)",
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center",
  },
};

export default CourseDetails;