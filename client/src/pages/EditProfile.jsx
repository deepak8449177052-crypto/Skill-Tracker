import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const EditProfile = () => {
  const { setUser } = useAuth();
  const [form, setForm] = useState({
    name: "",
    bio: "",
    avatar: "",
    dateOfBirth: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await API.get("/user/profile");
        // Supporting both old data structure if any and new one
        const userData = data.user || data;
        setForm({
          name: userData.name || "",
          bio: userData.bio || "",
          avatar: userData.avatar || "",
          dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : ""
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const { data } = await API.post("/user/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, avatar: data.avatar });
      const updatedUser = { ...JSON.parse(localStorage.getItem("user")), avatar: data.avatar };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Avatar uploaded successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.put("/user/profile", form);
      const updatedUser = data.user || data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="page">
      <div className="card form-card">
        <h1>Edit Profile</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <div className="avatar-upload-section" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <div 
              className="preview-container" 
              style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                margin: '0 auto 1rem',
                border: '2px dashed rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.1)'
              }}
            >
              {(preview || form.avatar) ? (
                <img 
                  src={preview || (form.avatar.startsWith('http') ? form.avatar : `${import.meta.env.PROD ? "" : "http://localhost:5000"}${form.avatar}`)} 
                  alt="Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>No Image</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="avatar-input"
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="avatar-input" 
              className="link-btn" 
              style={{ fontSize: '0.8rem', padding: '8px 15px', cursor: 'pointer' }}
            >
              Choose Photo
            </label>
            {selectedFile && (
              <button 
                type="button" 
                onClick={handleUpload} 
                disabled={uploading}
                style={{ marginLeft: '10px', fontSize: '0.8rem', padding: '8px 15px' }}
              >
                {uploading ? "Uploading..." : "Upload Now"}
              </button>
            )}
          </div>

          <input
            type="date"
            placeholder="Date of Birth"
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
          />

          <textarea
            rows="6"
            placeholder="Tell us about yourself..."
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />

          <div className="action-row">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;