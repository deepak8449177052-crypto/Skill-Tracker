import { useEffect, useState } from "react";
import API from "../api/axios";

const Notifications = () => {
  const [settings, setSettings] = useState({
    emailUpdates: true,
    dailyPractice: true,
    challengeNotifications: true,
    weeklySummary: false
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await API.get("/user/profile");
        if (data.notifications) {
          setSettings(data.notifications);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const save = async () => {
    try {
      await API.put("/user/notifications", settings);
      alert("Settings saved successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="page">
      <div className="card form-card">
        <h1>Manage Notifications</h1>

        <div className="toggle-row">
          <span>Email Updates</span>
          <input
            type="checkbox"
            checked={settings.emailUpdates}
            onChange={() => handleToggle("emailUpdates")}
          />
        </div>

        <div className="toggle-row">
          <span>Daily Practice Reminders</span>
          <input
            type="checkbox"
            checked={settings.dailyPractice}
            onChange={() => handleToggle("dailyPractice")}
          />
        </div>

        <div className="toggle-row">
          <span>Challenge Notifications</span>
          <input
            type="checkbox"
            checked={settings.challengeNotifications}
            onChange={() => handleToggle("challengeNotifications")}
          />
        </div>

        <div className="toggle-row">
          <span>Weekly Progress Summary</span>
          <input
            type="checkbox"
            checked={settings.weeklySummary}
            onChange={() => handleToggle("weeklySummary")}
          />
        </div>

        <button onClick={save}>Save Changes</button>
      </div>
    </div>
  );
};

export default Notifications;