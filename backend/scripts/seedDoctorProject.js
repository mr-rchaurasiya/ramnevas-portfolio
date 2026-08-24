import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

// Load environment variables
dotenv.config();

const seedProject = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('Error: MONGODB_URI is not set in .env file');
      process.exit(1);
    }

    console.log('Connecting to database...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Check if project already exists
    const projectExists = await Project.findOne({ title: "PulseMD Doctor Portal" });
    if (projectExists) {
      console.log('Project "PulseMD Doctor Portal" already exists in the database.');
      process.exit(0);
    }

    // Insert project
    await Project.create({
      title: "PulseMD Doctor Portal",
      description: "A responsive clinical doctor portal featuring secure authentication, clinical dashboard stats, diagnostic session notes, and serverless WebRTC P2P video consultation.",
      technologies: ["Flutter", "Dart", "WebRTC", "WebSocket", "ChangeNotifier"],
      githubUrl: "https://github.com/mr-rchaurasiya/doctor_webrtc_app",
      liveUrl: "",
      image: ""
    });

    console.log('Successfully seeded PulseMD Doctor Portal project to database!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding project:', error.message);
    process.exit(1);
  }
};

seedProject();
