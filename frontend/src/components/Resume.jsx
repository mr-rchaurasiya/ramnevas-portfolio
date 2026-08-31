import React, { useState } from 'react';
import AnimatedTitle from './AnimatedTitle';

const Resume = () => {
  const [isPrintTheme, setIsPrintTheme] = useState(false);

  const handlePrint = () => {
    // Force print theme during print dialog trigger
    const originalTheme = isPrintTheme;
    setIsPrintTheme(true);
    setTimeout(() => {
      window.print();
      setIsPrintTheme(originalTheme);
    }, 150);
  };

  return (
    <section id="resume" className="position-relative bg-dark-base py-5">
      {/* Decorative Background Blob - Hidden during printing */}
      <div className="bg-blob blob-purple d-print-none" style={{ top: '30%', left: '10%' }}></div>

      <div className="container">
        <div className="text-center mb-4 d-print-none">
          <AnimatedTitle text="Resume" />
          <p className="text-white-50 small mb-4">Explore my interactive resume preview or download a printer-friendly version.</p>
          
          {/* Controls */}
          <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
            <button 
              onClick={() => setIsPrintTheme(!isPrintTheme)} 
              className={`btn btn-sm ${isPrintTheme ? 'btn-outline-custom' : 'btn-primary-gradient'} px-4`}
              aria-label="Toggle light theme preview"
            >
              <i className={`bi ${isPrintTheme ? 'bi-moon-fill' : 'bi-sun-fill'} me-2`}></i>
              {isPrintTheme ? 'Dark Preview' : 'Light/Print Preview'}
            </button>
            <button 
              onClick={handlePrint} 
              className="btn btn-sm btn-primary-gradient px-4"
              aria-label="Print or Save Resume as PDF"
            >
              <i className="bi bi-printer me-2"></i> Print / Save PDF
            </button>
          </div>
        </div>

        {/* A4 Sheet Container */}
        <div className={`resume-paper ${isPrintTheme ? 'print-theme' : ''} shadow-lg`}>
          
          {/* Header */}
          <div className="resume-header text-center">
            <h1 className="h2 text-white fw-bold mb-1 tracking-tight">RAMNEVAS CHAURASIYA</h1>
            <p className="lead small text-gradient fw-semibold mb-3">Software Developer | Full-Stack Web & Mobile Developer</p>
            
            <div className="d-flex flex-wrap justify-content-center gap-3 text-white-50 small font-monospace">
              <span><i className="bi bi-telephone-fill me-1 text-gradient"></i> +91 8188948708</span>
              <span><i className="bi bi-envelope-fill me-1 text-gradient"></i> <a href="mailto:ramnevas8188@gmail.com" className="text-decoration-none text-white-50 hover-text-primary">ramnevas8188@gmail.com</a></span>
              <span><i className="bi bi-geo-alt-fill me-1 text-gradient"></i> Noida, India</span>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2 mt-2 text-white-50 small">
              <a href="https://www.linkedin.com/in/mr-rchaurasiya/" target="_blank" rel="noopener noreferrer" className="text-decoration-none hover-text-primary font-monospace">
                <i className="bi bi-linkedin me-1 text-gradient"></i>LinkedIn
              </a>
              <span>|</span>
              <a href="https://github.com/mr-rchaurasiya" target="_blank" rel="noopener noreferrer" className="text-decoration-none hover-text-primary font-monospace">
                <i className="bi bi-github me-1 text-gradient"></i>GitHub
              </a>
              <span>|</span>
              <a href="https://leetcode.com/u/ramnevas8188/" target="_blank" rel="noopener noreferrer" className="text-decoration-none hover-text-primary font-monospace">
                <i className="bi bi-code-slash me-1 text-gradient"></i>LeetCode
              </a>
              <span>|</span>
              <a href="https://www.hackerrank.com/profile/mr_rchaurasiya" target="_blank" rel="noopener noreferrer" className="text-decoration-none hover-text-primary font-monospace">
                <i className="bi bi-award-fill me-1 text-gradient"></i>HackerRank
              </a>
              <span>|</span>
              <a href="https://www.instagram.com/mr_rchaurasiya/" target="_blank" rel="noopener noreferrer" className="text-decoration-none hover-text-primary font-monospace">
                <i className="bi bi-instagram me-1 text-gradient"></i>Instagram
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="resume-section mb-4">
            <h2 className="resume-section-title">Professional Summary</h2>
            <p className="text-white-50 mb-0 text-justify" style={{ fontSize: '0.85rem', lineHeight: '1.45' }}>
              B.Tech. Computer Science & Information Technology graduate (2024) with hands-on experience in full-stack web and mobile application development using React.js, JavaScript, Node.js, Express.js, Flutter, Dart, Firebase, MongoDB, and REST APIs. Strong foundation in Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, and Computer Networks. Experienced in developing responsive applications, REST APIs, authentication systems, real-time communication, CRUD operations, and database-driven applications. Solved 400+ DSA problems across competitive programming platforms. Seeking an entry-level Software Developer / Software Engineer role.
            </p>
          </div>

          {/* Grid Content */}
          <div className="row g-4">
            
            {/* Left Column (Skills & Core CS) */}
            <div className="col-md-5 border-end-md">
              
              {/* Technical Skills */}
              <div className="resume-section mb-4">
                <h2 className="resume-section-title">Technical Skills</h2>
                <div className="d-flex flex-column gap-2" style={{ fontSize: '0.8rem' }}>
                  <div>
                    <strong className="text-white d-block">Programming:</strong>
                    <span className="text-white-50">C, C++, JavaScript, Dart, SQL</span>
                  </div>
                  <div>
                    <strong className="text-white d-block">Frontend:</strong>
                    <span className="text-white-50">HTML5, CSS3, Bootstrap, React.js, Flutter</span>
                  </div>
                  <div>
                    <strong className="text-white d-block">Backend:</strong>
                    <span className="text-white-50">Node.js, Express.js, PHP, REST APIs, Firebase</span>
                  </div>
                  <div>
                    <strong className="text-white d-block">Databases:</strong>
                    <span className="text-white-50">MongoDB, MySQL, Cloud Firestore</span>
                  </div>
                  <div>
                    <strong className="text-white d-block">Tools & Platforms:</strong>
                    <span className="text-white-50">Git, GitHub, VS Code, Android Studio, Postman</span>
                  </div>
                </div>
              </div>

              {/* Core Computer Science */}
              <div className="resume-section mb-4">
                <h2 className="resume-section-title">Core Computer Science</h2>
                <div className="d-flex flex-column gap-2" style={{ fontSize: '0.8rem' }}>
                  <div>
                    <strong className="text-white d-block">DSA:</strong>
                    <span className="text-white-50">Arrays, Lists, Stacks, Trees, BST, Graphs, Sorting/Searching, Recursion, DP, BFS/DFS</span>
                  </div>
                  <div>
                    <strong className="text-white d-block">OOP:</strong>
                    <span className="text-white-50">Encapsulation, Inheritance, Polymorphism, Virtual Functions, Overriding, Exception Handling</span>
                  </div>
                  <div>
                    <strong className="text-white d-block">DBMS:</strong>
                    <span className="text-white-50">ER Modeling, Keys, Normalization, ACID, Concurrency Control, Indexing, Joins, NoSQL vs SQL</span>
                  </div>
                  <div>
                    <strong className="text-white d-block">Operating Systems:</strong>
                    <span className="text-white-50">Processes, Threads, Scheduling, Mutex/Semaphores, Deadlocks, Paging, Virtual Memory</span>
                  </div>
                  <div>
                    <strong className="text-white d-block">Computer Networks:</strong>
                    <span className="text-white-50">OSI/TCP-IP models, TCP/UDP, HTTP/S, DNS, DHCP, Subnetting, Routing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Experience, Projects, Education) */}
            <div className="col-md-7">
              
              {/* Experience */}
              <div className="resume-section mb-4">
                <h2 className="resume-section-title">Experience</h2>
                
                <div className="resume-item mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h3 className="resume-item-title mb-0">Android App Development Intern</h3>
                    <span className="resume-item-duration">07/2023 – 08/2023</span>
                  </div>
                  <div className="resume-item-subtitle">CodSoft (4 Weeks)</div>
                  <ul className="text-white-50 pl-3 mb-0" style={{ fontSize: '0.8rem', paddingLeft: '1.2rem' }}>
                    <li>Developed responsive layouts and features during a 4-week internship.</li>
                    <li>Gained experience in state management, data handling, and debugging.</li>
                  </ul>
                </div>

                <div className="resume-item mb-0">
                  <div className="d-flex justify-content-between align-items-start">
                    <h3 className="resume-item-title mb-0">Web Development Trainee & Dev</h3>
                    <span className="resume-item-duration">06/2023 – 08/2023</span>
                  </div>
                  <div className="resume-item-subtitle">Internshala (8 Weeks)</div>
                  <ul className="text-white-50 pl-3 mb-0" style={{ fontSize: '0.8rem', paddingLeft: '1.2rem' }}>
                    <li>Completed training with a 100% score; built Node/Express responsive web apps.</li>
                    <li>Integrated REST APIs, CRUD operations, and version control via Git/GitHub.</li>
                  </ul>
                </div>
              </div>

              {/* Projects */}
              <div className="resume-section mb-4">
                <h2 className="resume-section-title">Projects</h2>

                <div className="resume-item mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h3 className="resume-item-title mb-0">Doctor Portal — Telehealth App</h3>
                    <span className="small text-muted font-monospace" style={{ fontSize: '0.75rem' }}>Flutter, WebRTC, WebSocket</span>
                  </div>
                  <ul className="text-white-50 pl-3 mb-0" style={{ fontSize: '0.8rem', paddingLeft: '1.2rem' }}>
                    <li>Real-time peer-to-peer video consultation via WebRTC with WebSocket signaling.</li>
                    <li>Clinical stats dashboard, appointment management, and patient details UI.</li>
                  </ul>
                </div>

                <div className="resume-item mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h3 className="resume-item-title mb-0">Chat Application</h3>
                    <span className="small text-muted font-monospace" style={{ fontSize: '0.75rem' }}>Flutter, Firebase, Firestore</span>
                  </div>
                  <ul className="text-white-50 pl-3 mb-0" style={{ fontSize: '0.8rem', paddingLeft: '1.2rem' }}>
                    <li>Developed Gmail authentication and real-time syncing using Cloud Firestore.</li>
                  </ul>
                </div>

                <div className="resume-item mb-0">
                  <div className="d-flex justify-content-between align-items-start">
                    <h3 className="resume-item-title mb-0">Google Clone Application</h3>
                    <span className="small text-muted font-monospace" style={{ fontSize: '0.75rem' }}>Flutter, REST APIs, Firebase</span>
                  </div>
                  <ul className="text-white-50 pl-3 mb-0" style={{ fontSize: '0.8rem', paddingLeft: '1.2rem' }}>
                    <li>Dynamic search layout with Firebase database and API integration.</li>
                  </ul>
                </div>
              </div>

              {/* Education & Achievements */}
              <div className="resume-section">
                <h2 className="resume-section-title">Education & Achievements</h2>
                <div className="resume-item mb-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <strong className="text-white" style={{ fontSize: '0.85rem' }}>B.Tech in CS & IT (MJPRU Bareilly)</strong>
                    <span className="resume-item-duration">2020 – 2024</span>
                  </div>
                  <div className="text-white-50" style={{ fontSize: '0.8rem' }}>Result: 73.6% (First Division)</div>
                </div>
                <div className="d-flex flex-column gap-1 text-white-50" style={{ fontSize: '0.8rem' }}>
                  <div><i className="bi bi-trophy text-gradient me-2"></i>Solved 400+ DSA problems across LeetCode, GFG & HackerRank.</div>
                  <div><i className="bi bi-award-fill text-gradient me-2"></i>Achieved 5-star programming badge in C and C++ on HackerRank.</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
