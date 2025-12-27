const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seedAdmin() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri || uri.includes('<password>')) {
      console.error("❌ Error: Update your MONGODB_URI in .env with your actual password!");
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log("📡 Connected to MongoDB Atlas...");

    // Check if admin already exists
    const adminExists = await mongoose.connection.db.collection('users').findOne({ email: "admin@example.com" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await mongoose.connection.db.collection('users').insertOne({
        name: "Main Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date()
      });
      console.log("✅ Admin user created successfully!");
      console.log("📧 Email: admin@example.com | 🔑 Password: admin123");
    } else {
      console.log("ℹ️ Admin already exists in the database.");
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    mongoose.disconnect();
    process.exit();
  }
}

seedAdmin();