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
    return <div className="center-screen"><div className="loader-bar"><span></span></div></div>;
  }

  if (!course) {
    return (
      <div className="page-container center-screen">
        <div className="card text-center" style={{ maxWidth: '500px' }}>
          <h2>Course Not Found</h2>
          <button className="link-btn" style={{ marginTop: '20px' }} onClick={() => navigate("/courses")}>
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-enter">
      <div className="course-detail-hero delay-1">
        <div>
          <span className="badge user" style={{ marginBottom: '16px' }}>Course Detail</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>{course.title}</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{course.subtitle}</p>
        </div>

        <div className="course-stats-grid">
          <div className="course-stat-box">
            <span>Level</span>
            <strong>{course.level}</strong>
          </div>
          <div className="course-stat-box">
            <span>Duration</span>
            <strong>{course.duration}</strong>
          </div>
          <div className="course-stat-box">
            <span>Students</span>
            <strong>{course.students}</strong>
          </div>
          <div className="course-stat-box">
            <span>Rating</span>
            <strong>{course.rating}</strong>
          </div>
        </div>
      </div>

      <div className="course-details-layout delay-2 animate-enter">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section className="card">
            <h2>About This Course</h2>
            <p>{course.description}</p>
          </section>

          <section className="card">
            <h2>Modules</h2>
            <div className="course-list-wrap">
              {course.modules?.map((item, index) => (
                <div key={index} className="course-list-item">
                  <span className="course-list-number">{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>Projects You Will Build</h2>
            <div className="course-tag-wrap">
              {course.projects?.map((item, index) => (
                <span key={index} className="course-tag project">
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section className="card">
            <h2>Skills You Will Learn</h2>
            <div className="course-tag-wrap">
              {course.skills?.map((skill, index) => (
                <span key={index} className="course-tag">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>Instructor</h2>
            <p>{course.instructor}</p>
          </section>

          <section className="card">
            {isEnrolled ? (
              <>
                <h2>Continue Learning</h2>
                <p>
                  You are successfully enrolled in this course. Review the modules on the left to see what happens in this course.
                </p>
                <div style={{ marginTop: '20px' }}>
                  <Link to="/my-enrollments" className="link-btn" style={{ width: '100%', justifyContent: 'center' }}>
                    Go to My Enrollments
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2>Start Learning</h2>
                <p>
                  Enroll in this course and improve your skills step by step.
                </p>

                {message && <div className="result-box success" style={{ fontSize: '14px', marginTop: '16px' }}>{message}</div>}

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                  <button
                    className="link-btn"
                    style={{ flex: 1, justifyContent: 'center', background: 'var(--primary-gradient)', color: '#000' }}
                    onClick={handleEnroll}
                    disabled={enrolling}
                  >
                    {enrolling ? "Enrolling..." : "Enroll Now"}
                  </button>

                  <Link to="/courses" className="link-btn" style={{ background: 'transparent' }}>
                    Back
                  </Link>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;