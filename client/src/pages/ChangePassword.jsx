
import { useState } from "react";
import API from "../api/axios";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return alert("New password and confirm password do not match");
    }

    try {
      await API.put("/user/password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });

      alert("Password updated successfully");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      alert(error.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div className="page">
      <div className="card form-card">
        <h1>Change Password</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={(e) =>
              setForm({ ...form, currentPassword: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          <button type="submit">Save Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
