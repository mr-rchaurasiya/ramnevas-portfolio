import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('Error: MONGODB_URI is not set in .env file');
      process.exit(1);
    }

    console.log('Connecting to database...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Check if any admin exists
    const adminExists = await User.findOne({});
    if (adminExists) {
      console.log(`An admin user already exists: ${adminExists.email}`);
      console.log('Seed bypassed to avoid overwriting.');
      process.exit(0);
    }

    // Create default admin user
    const email = 'admin@example.com';
    const password = 'adminpassword123'; // The user can change this later
    
    console.log(`Seeding default admin: ${email}...`);
    await User.create({
      email,
      password,
    });

    console.log('Admin user successfully seeded!');
    console.log(`Credentials:\nEmail: ${email}\nPassword: ${password}`);
    console.log('IMPORTANT: Please change this default password as soon as you log in.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
