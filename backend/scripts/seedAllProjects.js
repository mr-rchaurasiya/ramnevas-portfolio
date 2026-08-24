import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

// Load environment variables
dotenv.config();

const seedProjects = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('Error: MONGODB_URI is not set in .env file');
      process.exit(1);
    }

    console.log('Connecting to database...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const newProjects = [
      {
        title: "CareerFlow — Job Tracker",
        description: "A modern Job Application Tracker with JWT authentication, a responsive glassmorphic dashboard, search/filter capabilities, and a hybrid database adapter that falls back seamlessly to local JSON file storage if MongoDB is offline.",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bootstrap 5"],
        githubUrl: "https://github.com/mr-rchaurasiya/CareerFlow",
        liveUrl: "",
        image: ""
      },
      {
        title: "PulseMD Doctor Portal",
        description: "A responsive clinical doctor portal featuring secure authentication, clinical dashboard stats, diagnostic session notes, and serverless WebRTC P2P video consultation.",
        technologies: ["Flutter", "Dart", "WebRTC", "WebSocket", "ChangeNotifier"],
        githubUrl: "https://github.com/mr-rchaurasiya/doctor_webrtc_app",
        liveUrl: "",
        image: ""
      }
    ];

    for (const proj of newProjects) {
      const projectExists = await Project.findOne({ title: proj.title });
      if (projectExists) {
        console.log(`Project "${proj.title}" already exists in the database.`);
      } else {
        await Project.create(proj);
        console.log(`Successfully seeded "${proj.title}" to database.`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error.message);
    process.exit(1);
  }
};

seedProjects();
