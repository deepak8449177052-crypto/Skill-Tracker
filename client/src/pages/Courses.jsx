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
    return <div className="center-screen"><div className="loader-bar"><span></span></div></div>;
  }

  return (
    <div className="page-container animate-enter">
      <div className="courses-hero delay-1">
        <h1>Courses</h1>
        <p>Explore courses to enhance your skills.</p>
      </div>

      <div className="course-grid">
        {courses.map((course, i) => (
          <div key={course._id} className={`card animate-enter delay-${(i % 5) + 1}`}>
            <h2>{course.title}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{course.subtitle}</p>

            <div className="course-meta">
              <span>{course.level}</span>
              <span>{course.duration}</span>
            </div>

            <Link to={`/courses/${course.slug}`} className="link-btn" style={{ width: '100%' }}>
              Explore Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;