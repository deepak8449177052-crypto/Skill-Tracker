const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const PracticeAttempt = require("./models/PracticeAttempt");

dotenv.config();

const debugAttempts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const attempts = await PracticeAttempt.find({})
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(10);

    attempts.forEach(att => {
      console.log(`Attempt ID: ${att._id}`);
      console.log(`User ID in attempt: ${att.user ? att.user._id : 'NULL'}`);
      console.log(`User object:`, att.user);
      if (att.user && !att.user.name) {
          console.log(`WARNING: User has no name! Username: ${att.user.username}`);
      }
    });

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

debugAttempts();
