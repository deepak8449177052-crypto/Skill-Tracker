
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Account = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="hero-card">
        <h1>Account Section</h1>
        <p>Manage your profile, settings and progress.</p>
      </div>

      <div className="account-grid">
        <div className="card profile-card">
          <div className="avatar-circle">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h2>{user?.name}</h2>
          <p>{user?.email}</p>

          <div className="stack-btns">
            <Link className="link-btn" to="/account/edit">
              Edit Profile
            </Link>

            <Link className="link-btn" to="/account/password">
              Change Password
            </Link>

            <Link className="link-btn" to="/account/notifications">
              Manage Notifications
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>Profile Information</h2>
          <p>Personal details & bio</p>
        </div>

        <div className="card">
          <h2>Learning Progress</h2>
          <p>Courses Completed: 5</p>
          <p>Skills Practiced: 12</p>
        </div>

        <div className="card">
          <h2>Saved Resources</h2>
          <p>Bookmarks & favorites</p>
        </div>

        <div className="card">
          <h2>Subscription Plan</h2>
          <p>Pro Membership</p>
          <p>Next Billing: 25 Jan 2026</p>
        </div>

        <div className="card">
          <h2>Account Settings</h2>
          <p>Privacy & Security</p>
          <p>Linked Accounts</p>
        </div>
      </div>
    </div>
  );
};

export default Account;