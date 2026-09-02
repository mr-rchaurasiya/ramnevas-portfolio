export const portfolioData = {
  personalInfo: {
    name: "Ramnevas Chaurasiya",
    title: "Software Developer",
    degreeShort: "B.Tech in CS & IT",
    email: "ramnevas8188@gmail.com",
    location: "Maharajganj, Uttar Pradesh, India",
    locationUrl: "https://maps.app.goo.gl/Znx5tn3AK6Go8kvH7",
    linkedin: "linkedin.com/in/mr-rchaurasiya",
    github: "github.com/ramnevas",
    instagram: "instagram.com/mr_rchaurasiya",
    phone: "+91 8188948708",
    whatsapp: "+91 7830911201",
    aboutSummary: "I am a Software Developer specialized in building high-performance web and mobile applications. I focus on creating clean user interfaces backed by structured server architectures and optimized databases.",
    aboutDetails: "I hold a B.Tech in Computer Science & Information Technology from Mahatma Jyotiba Phule Rohilkhand University. I specialize in the React, Node.js, and Express.js ecosystem, with experience in database architectures like MongoDB and PHP development. I am passionate about core computer science concepts and mobile application engineering using Flutter."
  },
  
  skills: [
    { name: "C", icon: "bi-filetype-c", category: "Programming Languages" },
    { name: "C++", icon: "bi-code-slash", category: "Programming Languages" },
    { name: "JavaScript", icon: "bi-filetype-js", category: "Programming Languages" },
    { name: "Dart", icon: "bi-code-square", category: "Programming Languages" },
    { name: "Java", icon: "bi-filetype-java", category: "Programming Languages" },
    { name: "C#", icon: "bi-hash", category: "Programming Languages" },
    { name: "R", icon: "bi-code-square", category: "Programming Languages" },
    
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
    { name: "Computer Networks", icon: "bi-diagram-2" },
    { name: "Software Engineering", icon: "bi-gear-wide" },
    { name: "Computer Architecture", icon: "bi-cpu" },
    { name: "Cyber Security", icon: "bi-shield-lock" },
    { name: "Cloud Computing", icon: "bi-cloud-fill" },
    { name: "AI & ML", icon: "bi-robot" },
    { name: "Theory of Computation", icon: "bi-journal-code" },
    { name: "Compiler Design", icon: "bi-braces" }
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
      degree: "Class 12 (Science Stream (Maths) )",
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
      title: "Astrologer — AI Vedic Astrology Platform",
      category: "web",
      description: "A production-grade AI-powered Vedic Astrology SaaS platform combining deterministic astronomical algorithms (VSOP87, Lahiri Ayanamsa, D1/D9/D10 Kundli, Vimshottari Dasha), personalized AI consultation, multi-decade life curve analytics, Razorpay subscriptions, and voice AI.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "AI / OpenAI", "Redis", "Docker", "Vite"],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "AI / OpenAI", "Redis", "Docker", "Vite"],
      github: "https://github.com/mr-rchaurasiya/Astrologer",
      githubUrl: "https://github.com/mr-rchaurasiya/Astrologer",
      live: "https://astrologer-client-1o5f.vercel.app/",
      liveUrl: "https://astrologer-client-1o5f.vercel.app/"
    },
    {
      title: "UPSC PrepPilot — AI Exam Prep Platform",
      category: "web",
      description: "A comprehensive, full-stack AI-powered UPSC Civil Services preparation platform featuring spaced-repetition revision scheduling, AI Mains answer evaluation, topic-wise syllabus tracking, dynamic MCQ practice, mistake book logging, and custom exam analytics.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "AI / Gemini", "JWT", "TailwindCSS", "Vite"],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "AI / Gemini", "JWT", "TailwindCSS", "Vite"],
      github: "https://github.com/mr-rchaurasiya/UPSC-PrepPilot",
      githubUrl: "https://github.com/mr-rchaurasiya/UPSC-PrepPilot",
      live: "https://upsc-prep-pilot.vercel.app/",
      liveUrl: "https://upsc-prep-pilot.vercel.app/"
    },
    {
      title: "CareerFlow — Job Tracker",
      category: "web",
      description: "A modern Job Application Tracker with JWT authentication, a responsive glassmorphic dashboard, search/filter capabilities, and a hybrid database adapter that falls back seamlessly to local JSON file storage if MongoDB is offline.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bootstrap 5"],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bootstrap 5"],
      github: "https://github.com/mr-rchaurasiya/CareerFlow",
      githubUrl: "https://github.com/mr-rchaurasiya/CareerFlow",
      live: "https://career-flow-virid.vercel.app/",
      liveUrl: "https://career-flow-virid.vercel.app/"
    },
    {
      title: "PulseMD Doctor Portal",
      category: "mobile",
      description: "A high-fidelity, responsive Doctor Portal built in Flutter featuring secure authentication, clinical dashboard stats, diagnostic session notes, and optimized serverless WebRTC P2P video consultation.",
      tags: ["Flutter", "Dart", "WebRTC", "WebSocket", "ChangeNotifier"],
      technologies: ["Flutter", "Dart", "WebRTC", "WebSocket", "ChangeNotifier"],
      github: "https://github.com/mr-rchaurasiya/doctor_webrtc_app",
      githubUrl: "https://github.com/mr-rchaurasiya/doctor_webrtc_app",
      live: "",
      liveUrl: ""
    },
    {
      title: "TeleHealth Application",
      category: "mobile",
      description: "A Flutter-based tele-health doctor application featuring a complete doctor workflow: local authentication, appointment details, peer-to-peer WebRTC video calling with a standalone Dart WebSocket signaling server.",
      tags: ["Flutter", "Dart", "WebRTC", "WebSocket", "Local Auth"],
      technologies: ["Flutter", "Dart", "WebRTC", "WebSocket", "Local Auth"],
      github: "https://github.com/mr-rchaurasiya/tele-health",
      githubUrl: "https://github.com/mr-rchaurasiya/tele-health",
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
    },
    {
      title: "OOP C++ Calculator",
      category: "other",
      description: "A high-performance calculator tool written in C++ showcasing object-oriented principles, modular calculations, and basic arithmetic.",
      tags: ["C++", "OOP", "Algorithms", "Command Line"],
      technologies: ["C++", "OOP", "Algorithms", "Command Line"],
      github: "https://github.com/mr-rchaurasiya/calculator",
      githubUrl: "https://github.com/mr-rchaurasiya/calculator",
      live: "",
      liveUrl: ""
    },
    {
      title: "Markdown Resume Generator",
      category: "web",
      description: "An amazing way to write your resume in markdown with complete customization through CSS stylesheets.",
      tags: ["HTML", "CSS", "Markdown", "Design"],
      technologies: ["HTML", "CSS", "Markdown", "Design"],
      github: "https://github.com/mr-rchaurasiya/resume",
      githubUrl: "https://github.com/mr-rchaurasiya/resume",
      live: "",
      liveUrl: ""
    },
    {
      title: "MERN Developer Portfolio",
      category: "web",
      description: "This MERN stack developer portfolio featuring interactive computer science core concept study guides, clean color contrasts, and automated SMTP Nodemailer contact form notifications.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Nodemailer", "Vercel"],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Nodemailer", "Vercel"],
      github: "https://github.com/mr-rchaurasiya/ramnevas-portfolio",
      githubUrl: "https://github.com/mr-rchaurasiya/ramnevas-portfolio",
      live: "https://ramnevas-portfolio.vercel.app/",
      liveUrl: "https://ramnevas-portfolio.vercel.app/"
    },
    {
      title: "Weather Dashboard",
      category: "web",
      description: "A responsive weather forecasting application that displays real-time weather conditions and 5-day forecasts using OpenWeatherMap API and browser geolocation services.",
      tags: ["React.js", "OpenWeatherMap API", "Bootstrap 5", "Geolocation API"],
      technologies: ["React.js", "OpenWeatherMap API", "Bootstrap 5", "Geolocation API"],
      github: "https://github.com/mr-rchaurasiya/weather-dashboard",
      githubUrl: "https://github.com/mr-rchaurasiya/weather-dashboard",
      live: "",
      liveUrl: ""
    },
    {
      title: "Task Management App",
      category: "mobile",
      description: "A clean and intuitive task management mobile app built with Flutter and Hive database for fast offline storage, status updates, and custom tags.",
      tags: ["Flutter", "Dart", "Hive DB", "Provider Pattern"],
      technologies: ["Flutter", "Dart", "Hive DB", "Provider Pattern"],
      github: "https://github.com/mr-rchaurasiya/todo-app",
      githubUrl: "https://github.com/mr-rchaurasiya/todo-app",
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
      icon: "bi-award",
      url: "https://www.hackerrank.com/profile/mr_rchaurasiya"
    }
  ],

  hobbies: {
    cricket: {
      title: "Cricket & Sports Analysis",
      subtitle: "Click on any section below to explore the tactical insights, rules, and lessons from cricket",
      icon: "bi-dribbble",
      subparts: [
        {
          id: "formats_strategy",
          title: "Formats & Strategy",
          icon: "bi-lightning-fill",
          badge: "T20 | IPL | ODI | Test",
          introduction: "Comparing limited-overs dynamics (T20 & ODI) against the traditional 5-day Test format, highlighting how batting pace and bowling tactics shift.",
          sections: [
            {
              title: "T20 & IPL Franchise",
              items: [
                { term: "T20 Dynamics", desc: "20 overs (120 balls). Focuses on powerplay aggression, death overs (16-20), bowling variations, and quick scoring." },
                { term: "IPL Franchise Competition", desc: "T20 league with city franchises, player auctions, and tactical rules like the Impact Player substitution." }
              ]
            },
            {
              title: "ODI & Test Match Tactics",
              items: [
                { term: "ODI (One Day)", desc: "50 overs (300 balls). Focuses on partnership building, strike rotation in middle overs, and pacing run-chases." },
                { term: "Test Cricket", desc: "Up to 5 days, 2 innings per team. Focuses on patience, defensive technique, session management, and declarations." }
              ]
            }
          ]
        },
        {
          id: "rules_dismissals",
          title: "Rules & Dismissals",
          icon: "bi-gear-fill",
          badge: "Laws, Extras & Wickets",
          introduction: "Exploring the fundamental rules of deliveries, extras, dismissal methods, and modern technology utilized in the game.",
          sections: [
            {
              title: "Extras & Deliveries",
              items: [
                { term: "Overs & Extras", desc: "An over consists of 6 legal balls. Extras include Wides, No-Balls (triggers Free Hit), Byes, and Leg Byes." },
                { term: "DRS Technology", desc: "Decision Review System using Ball Tracking (for LBW trajectory) and UltraEdge (for bat-ball audio spikes)." }
              ]
            },
            {
              title: "Dismissal Methods (Wickets)",
              items: [
                { term: "Top Dismissals", desc: "Bowled (hitting stumps), Caught (fielding catch), and LBW (Leg Before Wicket, blocking ball headed to stumps)." },
                { term: "Active Field Dismissals", desc: "Run Out (breaking wickets while running) and Stumped (keeper dislodging bails when batsman is out of crease)." }
              ]
            }
          ]
        },
        {
          id: "insights_teamwork",
          title: "Insights & Teamwork",
          icon: "bi-lightbulb-fill",
          badge: "Leadership & Tech Analogy",
          introduction: "How cricket strategies connect to leadership, teamwork, and key problem-solving traits useful in software engineering.",
          sections: [
            {
              title: "Leadership & Tactics",
              items: [
                { term: "Captaincy Duties", desc: "Responsible for field placement, bowling changes, selecting the Playing XI, and analyzing batsman weaknesses." },
                { term: "Adapting to Situations", desc: "Planning strategies according to pitch deterioration, weather conditions, and batsman partnerships." }
              ]
            },
            {
              title: "Software Engineering Analogy",
              items: [
                { term: "Patience & Debugging", desc: "Test cricket teaches us patience and session planning. This connects to resolving complex, deeply rooted software bugs." },
                { term: "Team Collaboration", desc: "Like batting partnerships, software development relies on collective collaboration and supporting teammates under pressure." }
              ]
            }
          ]
        }
      ]
    }
  }
};
