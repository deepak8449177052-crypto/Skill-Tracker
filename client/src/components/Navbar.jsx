import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="logo">Skill Tracker</div>

      <div className="nav-links">
        <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">
          Dashboard
        </Link>
        {user?.role === "admin" && (
          <Link className={location.pathname === "/admin" ? "active" : ""} to="/admin">
            Admin
          </Link>
        )}
        <Link className={location.pathname === "/practice" ? "active" : ""} to="/practice">
          Practice
        </Link>
        <Link className={location.pathname === "/courses" ? "active" : ""} to="/courses">
          Courses
        </Link>
        <Link className={location.pathname === "/account" ? "active" : ""} to="/account">
          Account
        </Link>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;