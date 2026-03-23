const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./models/Admin');

const updateAdminStatus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    // Clean up any old unhashed attempts to avoid unique email conflicts
    await Admin.deleteMany({ email: 'admin.guntur@example.com' });
    console.log("Cleared old admin records for admin.guntur@example.com.");
    
    // Create new Admin which automatically triggers the pre('save') hash hook
    const admin = await Admin.create({
      name: "Chief Admin Guntur",
      email: "admin.guntur@example.com",
      password: "password123",
      district: "Guntur",
      role: "admin"
    });
    
    console.log("Created properly hashed Admin account! You can now log in.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating Admin:", error);
    process.exit(1);
  }
};

updateAdminStatus();
