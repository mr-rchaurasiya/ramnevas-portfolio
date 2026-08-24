export const portfolioData = {
  personalInfo: {
    name: "Ramnevas Chaurasiya",
    title: "Full Stack Developer",
    degreeShort: "B.Tech in CS & IT",
    email: "ramnevas@example.com", // standard placeholder
    location: "Maharajganj, Uttar Pradesh, India",
    linkedin: "linkedin.com/in/ramnevas-chaurasiya",
    github: "github.com/ramnevas",
    aboutSummary: "I am a Full Stack Developer specialized in building high-performance web applications. I focus on creating clean user interfaces backed by structured server architectures and optimized databases.",
    aboutDetails: "I hold a B.Tech in Computer Science & Information Technology from Mahatma Jyotiba Phule Rohilkhand University. I specialize in the React, Node.js, and Express.js ecosystem, with experience in database architectures like MongoDB and PHP development. I am passionate about core computer science concepts and mobile application engineering using Flutter."
  },
  
  skills: [
    { name: "C", icon: "bi-filetype-c", category: "Programming Languages" },
    { name: "C++", icon: "bi-code-slash", category: "Programming Languages" },
    { name: "JavaScript", icon: "bi-filetype-js", category: "Programming Languages" },
    { name: "Dart", icon: "bi-code-square", category: "Programming Languages" },
    
    { name: "HTML", icon: "bi-filetype-html", category: "Frontend" },
    { name: "CSS", icon: "bi-filetype-css", category: "Frontend" },
    { name: "Bootstrap", icon: "bi-bootstrap", category: "Frontend" },
    { name: "React.js", icon: "bi-cpu", category: "Frontend" },
    { name: "Flutter", icon: "bi-phone", category: "Frontend" },
    
    { name: "Node.js", icon: "bi-server", category: "Backend" },
    { name: "Express.js", icon: "bi-cpu", category: "Backend" },
    { name: "PHP", icon: "bi-filetype-php", category: "Backend" },
    { name: "REST APIs", icon: "bi-cloud-arrow-down", category: "Backend" },
    
    { name: "MongoDB", icon: "bi-database", category: "Databases" },
    { name: "Firebase", icon: "bi-fire", category: "Databases" },
    { name: "Cloud Firestore", icon: "bi-database-fill", category: "Databases" },
    
    { name: "Git", icon: "bi-git", category: "Tools" },
    { name: "GitHub", icon: "bi-github", category: "Tools" },
    { name: "Postman", icon: "bi-send", category: "Tools" },
    { name: "VS Code", icon: "bi-laptop", category: "Tools" },
    { name: "Android Studio", icon: "bi-phone-fill", category: "Tools" }
  ],
  
  coreConcepts: [
    { name: "DSA", icon: "bi-bounding-box" },
    { name: "OOP", icon: "bi-diagram-3" },
    { name: "DBMS", icon: "bi-database-fill-gear" },
    { name: "Operating Systems", icon: "bi-pc-display-horizontal" },
    { name: "Computer Networks", icon: "bi-diagram-2" }
  ],
  
  experience: [
    {
      role: "Web Development Trainee & Developer",
      company: "Internshala",
      duration: "June 2023 – August 2023",
      description: "Successfully completed Web Development Training with a 100% assessment score. Developed responsive web applications using HTML, CSS, Bootstrap, JavaScript, React.js, Node.js, Express.js and MongoDB. Built and integrated REST APIs, implemented CRUD operations and used Git/GitHub for version control.",
      technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git", "GitHub"]
    },
    {
      role: "Android App Development Intern",
      company: "CodSoft",
      duration: "July 2023 – August 2023",
      description: "Developed and designed responsive mobile application layouts and interfaces.",
      technologies: ["Flutter", "Dart", "Git", "GitHub"]
    }
  ],
  
  education: [
    {
      degree: "B.Tech in Computer Science & Information Technology",
      institution: "Institute of Engineering & Technology, University Campus, M.J.P. Rohilkhand University, Bareilly",
      duration: "2020 – 2024",
      dgpa: "7.36 / 10",
      percentage: "73.60%",
      division: "First"
    },
    {
      degree: "Class 12 (B-Science)",
      institution: "Uttar Pradesh Madhyamik Shiksha Parishad (UP Board)",
      duration: "2020",
      percentage: "77.6%",
      division: "First Division / Honours"
    },
    {
      degree: "Class 10",
      institution: "Uttar Pradesh Madhyamik Shiksha Parishad (UP Board)",
      duration: "2018",
      percentage: "84.67%"
    }
  ],
  
  projects: [
    {
      title: "CareerFlow — Job Tracker",
      category: "web",
      description: "A modern Job Application Tracker with JWT authentication, a responsive glassmorphic dashboard, search/filter capabilities, and a hybrid database adapter that falls back seamlessly to local JSON file storage if MongoDB is offline.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bootstrap 5"],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bootstrap 5"],
      github: "https://github.com/mr-rchaurasiya/CareerFlow",
      githubUrl: "https://github.com/mr-rchaurasiya/CareerFlow",
      live: "",
      liveUrl: ""
    },
    {
      title: "PulseMD Doctor Portal",
      category: "mobile",
      description: "A responsive clinical doctor portal featuring secure authentication, clinical dashboard stats, diagnostic session notes, and serverless WebRTC P2P video consultation.",
      tags: ["Flutter", "Dart", "WebRTC", "WebSocket", "ChangeNotifier"],
      technologies: ["Flutter", "Dart", "WebRTC", "WebSocket", "ChangeNotifier"],
      github: "https://github.com/mr-rchaurasiya/doctor_webrtc_app",
      githubUrl: "https://github.com/mr-rchaurasiya/doctor_webrtc_app",
      live: "",
      liveUrl: ""
    },
    {
      title: "Google Clone",
      category: "mobile",
      description: "Developed a Google Search clone using Flutter and Dart with Firebase, Cloud Firestore and REST APIs.",
      tags: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "REST APIs"],
      technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "REST APIs"],
      github: "https://github.com/mr-rchaurasiya/google-clone",
      githubUrl: "https://github.com/mr-rchaurasiya/google-clone",
      live: "",
      liveUrl: ""
    },
    {
      title: "Chat Application",
      category: "mobile",
      description: "Developed a real-time chat application using Flutter and Dart with Firebase Authentication and Cloud Firestore.",
      tags: ["Flutter", "Dart", "Firebase Authentication", "Cloud Firestore"],
      technologies: ["Flutter", "Dart", "Firebase Authentication", "Cloud Firestore"],
      github: "https://github.com/mr-rchaurasiya/chatting-Application",
      githubUrl: "https://github.com/mr-rchaurasiya/chatting-Application",
      live: "",
      liveUrl: ""
    }
  ],
  
  achievements: [
    {
      title: "Solved 400+ DSA Problems",
      award: "GeeksforGeeks, LeetCode & HackerRank",
      details: "Successfully resolved algorithmic coding queries spanning Arrays, Trees, Sorting, Graphs, and HashMaps.",
      icon: "bi-trophy"
    },
    {
      title: "5-Star Coding Badge",
      award: "C and C++ Proficiency",
      details: "Awarded top skill rank stars for structural programming and problem-solving in C and C++.",
      icon: "bi-award"
    }
  ]
};
