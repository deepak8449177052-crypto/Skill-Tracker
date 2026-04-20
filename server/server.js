const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const seedCourses = require("./utils/seedCourses");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/practice", require("./routes/practiceRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Skill Tracker API Running (Development)");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedCourses();
});