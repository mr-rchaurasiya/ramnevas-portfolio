import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('Error: MONGODB_URI is not set in .env file');
      process.exit(1);
    }

    console.log('Connecting to database...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // 1. Seed Projects
    console.log('Clearing existing projects...');
    await Project.deleteMany({});

    const newProjects = [
      {
        title: "CareerFlow — Job Tracker",
        category: "web",
        description: "A modern Job Application Tracker with JWT authentication, a responsive glassmorphic dashboard, search/filter capabilities, and a hybrid database adapter that falls back seamlessly to local JSON file storage if MongoDB is offline.",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bootstrap 5"],
        githubUrl: "https://github.com/mr-rchaurasiya/CareerFlow",
        liveUrl: "",
        image: ""
      },
      {
        title: "PulseMD Doctor Portal",
        category: "mobile",
        description: "A high-fidelity, responsive Doctor Portal built in Flutter featuring secure authentication, clinical dashboard stats, diagnostic session notes, and optimized serverless WebRTC P2P video consultation.",
        technologies: ["Flutter", "Dart", "WebRTC", "WebSocket", "ChangeNotifier"],
        githubUrl: "https://github.com/mr-rchaurasiya/doctor_webrtc_app",
        liveUrl: "",
        image: ""
      },
      {
        title: "TeleHealth Application",
        category: "mobile",
        description: "A Flutter-based tele-health doctor application featuring a complete doctor workflow: local authentication, appointment details, peer-to-peer WebRTC video calling with a standalone Dart WebSocket signaling server.",
        technologies: ["Flutter", "Dart", "WebRTC", "WebSocket", "Local Auth"],
        githubUrl: "https://github.com/mr-rchaurasiya/tele-health",
        liveUrl: "",
        image: ""
      },
      {
        title: "Google Clone",
        category: "mobile",
        description: "Developed a Google Search clone using Flutter and Dart with Firebase, Cloud Firestore and REST APIs.",
        technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "REST APIs"],
        githubUrl: "https://github.com/mr-rchaurasiya/google-clone",
        liveUrl: "",
        image: ""
      },
      {
        title: "Chat Application",
        category: "mobile",
        description: "Developed a real-time chat application using Flutter and Dart with Firebase Authentication and Cloud Firestore.",
        technologies: ["Flutter", "Dart", "Firebase Authentication", "Cloud Firestore"],
        githubUrl: "https://github.com/mr-rchaurasiya/chatting-Application",
        liveUrl: "",
        image: ""
      },
      {
        title: "OOP C++ Calculator",
        category: "other",
        description: "A high-performance calculator tool written in C++ showcasing object-oriented principles, modular calculations, and basic arithmetic.",
        technologies: ["C++", "OOP", "Algorithms", "Command Line"],
        githubUrl: "https://github.com/mr-rchaurasiya/calculator",
        liveUrl: "",
        image: ""
      },
      {
        title: "Markdown Resume Generator",
        category: "web",
        description: "An amazing way to write your resume in markdown with complete customization through CSS stylesheets.",
        technologies: ["HTML", "CSS", "Markdown", "Design"],
        githubUrl: "https://github.com/mr-rchaurasiya/resume",
        liveUrl: "",
        image: ""
      },
      {
        title: "MERN Developer Portfolio",
        category: "web",
        description: "This MERN stack developer portfolio featuring interactive computer science core concept study guides, clean color contrasts, and automated SMTP Nodemailer contact form notifications.",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Nodemailer", "Vercel"],
        githubUrl: "https://github.com/mr-rchaurasiya/ramnevas-portfolio",
        liveUrl: "https://ramnevas-portfolio.vercel.app/",
        image: ""
      },
      {
        title: "Weather Dashboard",
        category: "web",
        description: "A responsive weather forecasting application that displays real-time weather conditions and 5-day forecasts using OpenWeatherMap API and browser geolocation services.",
        technologies: ["React.js", "OpenWeatherMap API", "Bootstrap 5", "Geolocation API"],
        githubUrl: "https://github.com/mr-rchaurasiya/weather-dashboard",
        liveUrl: "",
        image: ""
      },
      {
        title: "Task Management App",
        category: "mobile",
        description: "A clean and intuitive task management mobile app built with Flutter and Hive database for fast offline storage, status updates, and custom tags.",
        technologies: ["Flutter", "Dart", "Hive DB", "Provider Pattern"],
        githubUrl: "https://github.com/mr-rchaurasiya/todo-app",
        liveUrl: "",
        image: ""
      }
    ];

    await Project.insertMany(newProjects);
    console.log(`Successfully seeded ${newProjects.length} projects.`);

    // 2. Seed Experience
    console.log('Clearing existing experience...');
    await Experience.deleteMany({});

    const newExperiences = [
      {
        company: "Internshala",
        role: "Web Development Trainee & Developer",
        startDate: "June 2023",
        endDate: "August 2023",
        description: "Successfully completed Web Development Training with a 100% assessment score. Developed responsive web applications using HTML, CSS, Bootstrap, JavaScript, React.js, Node.js, Express.js and MongoDB. Built and integrated REST APIs, implemented CRUD operations and used Git/GitHub for version control.",
        technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git", "GitHub"]
      },
      {
        company: "CodSoft",
        role: "Android App Development Intern",
        startDate: "July 2023",
        endDate: "August 2023",
        description: "Developed and designed responsive mobile application layouts and interfaces.",
        technologies: ["Flutter", "Dart", "Git", "GitHub"]
      }
    ];

    await Experience.insertMany(newExperiences);
    console.log(`Successfully seeded ${newExperiences.length} experiences.`);

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
