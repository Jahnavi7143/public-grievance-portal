const mongoose = require('mongoose');
require('dotenv').config();
const Officer = require('./models/Officer');

const updateOfficerStatus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    // Clean up any old unhashed attempts
    await Officer.deleteMany({ email: 'health2.guntur@example.com' });
    console.log("Cleared old manual records for health2.guntur@example.com.");
    
    // Create new Officer which automatically triggers the pre('save') hash hook
    const officer = await Officer.create({
      name: "2Test Health Officer",
      email: "health2.guntur@example.com",
      password: "password123",
      department: "Health",
      district: "Guntur",
      level: 2,
      role: "officer"
    });
    
    console.log("SUCCESS! Created properly hashed Level 2 Officer account! You can now log in.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating Admin:", error);
    process.exit(1);
  }
};

updateOfficerStatus();
