const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for migration");

    // Find users who have a 'username' but no 'name' or 'name' is empty
    const usersToMigrate = await User.find({
      $or: [
        { name: { $exists: false } },
        { name: "" },
        { name: null }
      ]
    });

    console.log(`Found ${usersToMigrate.length} users to migrate.`);

    for (const user of usersToMigrate) {
      // Access the username field directly from the document
      // (since it might not be in the Mongoose schema)
      const username = user.get("username");
      
      if (username) {
        user.name = username;
        await user.save();
        console.log(`Migrated user: ${username} -> name: ${user.name}`);
      } else {
          console.log(`User ${user._id} has neither name nor username.`);
      }
    }

    console.log("Migration complete.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
