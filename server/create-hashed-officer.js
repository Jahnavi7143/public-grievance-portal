const mongoose = require('mongoose');
require('dotenv').config();
const Officer = require('./models/Officer');

const updateOfficerStatus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    // Find the manually created officer and delete it so we can re-create it properly through Mongoose
    await Officer.deleteMany({ email: 'health.guntur@example.com' });
    console.log("Deleted old unhashed officer.");
    
    // Create new officer which automatically triggers the pre('save') hash hook
    const officer = await Officer.create({
      name: "Test Health Officer",
      department: "Health",
      level: 1,
      email: "health.guntur@example.com",
      password: "password123",
      district: "Guntur",
      role: "officer"
    });
    
    console.log("Created properly hashed officer! You can now log in.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating officer:", error);
    process.exit(1);
  }
};

updateOfficerStatus();
