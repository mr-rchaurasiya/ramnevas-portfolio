import React, { useState } from 'react';
import { portfolioData } from '../utils/portfolioData';
import { useFetchData } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';

const conceptDetails = {
  'DSA': {
    title: 'Data Structures & Algorithms',
    subsections: [
      {
        title: 'Data Structures',
        items: ['Arrays', 'Linked List', 'Stack', 'Queue', 'Circular Queue', 'Trees (Binary, BST)', 'Heap', 'Hashing', 'Graphs']
      },
      {
        title: 'Algorithms',
        items: ['Searching (Linear, Binary)', 'Sorting (Bubble, Selection, Insertion, Merge, Quick, Heap)', 'Recursion', 'Divide & Conquer', 'Greedy Algorithms', 'Dynamic Programming', 'Graph Algorithms (BFS, DFS, Shortest Path, MST)']
      },
      {
        title: 'Complexity',
        items: ['Time Complexity', 'Space Complexity', 'Big-O Notation', 'Big-Ω (Omega)', 'Big-Θ (Theta)']
      }
    ]
  },
  'OOP': {
    title: 'Object-Oriented Programming',
    subsections: [
      {
        title: '4 Pillars of OOP',
        items: [
          'Encapsulation (Access modifiers: public, private, protected)',
          'Abstraction (Abstract classes, Interfaces)',
          'Inheritance (Single, Multilevel, Hierarchical, Multiple)',
          'Polymorphism (Method Overloading, Method Overriding)'
        ]
      },
      {
        title: 'Important Concepts',
        items: ['Classes & Objects', 'Constructors & Destructors', 'this pointer/reference', 'static keyword', 'Access modifiers', 'Association, Aggregation & Composition', 'Virtual Functions', 'Exception Handling']
      }
    ]
  },
  'DBMS': {
    title: 'Database Management System',
    subsections: [
      {
        title: 'Core Fundamentals',
        items: ['DBMS vs File System', 'Database Architecture & Abstraction', 'Data Independence', 'ER Modeling (Entities, Attributes, Relationships, Keys)', 'Relational Model']
      },
      {
        title: 'SQL Commands & Concepts',
        items: [
          'DDL / DML / DCL (SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP)',
          'Filtering & Grouping (WHERE, ORDER BY, GROUP BY, HAVING, DISTINCT)',
          'Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)',
          'Joins (INNER, LEFT, RIGHT, FULL OUTER)'
        ]
      },
      {
        title: 'Advanced Database Topics',
        items: ['Normalization (1NF, 2NF, 3NF, BCNF)', 'Transactions & ACID Properties', 'Concurrency Control', 'Indexing, Views, Stored Procedures & Triggers', 'SQL vs NoSQL (MongoDB/Firebase)']
      }
    ]
  },
  'Operating Systems': {
    title: 'Operating Systems',
    subsections: [
      {
        title: 'OS Fundamentals & Scheduling',
        items: ['Kernel, System Calls & Modes (User vs Kernel)', 'Process Management (Process States, PCB, Context Switching)', 'CPU Scheduling (FCFS, SJF, SRTF, Priority, Round Robin)']
      },
      {
        title: 'Threads & Synchronization',
        items: ['Process vs Thread, Multithreading', 'Critical Section, Race Condition', 'Mutex & Semaphores, Monitors', 'Deadlock (Conditions, Prevention, Avoidance, Banker\'s Algorithm, Detection & Recovery)']
      },
      {
        title: 'Memory & File Systems',
        items: ['RAM, Virtual Memory, Paging, Segmentation', 'Page Faults & Page Replacement Algorithms (FIFO, LRU, Optimal)', 'File Allocation & Disk Scheduling']
      }
    ]
  },
  'Computer Networks': {
    title: 'Computer Networks',
    subsections: [
      {
        title: 'Networking Basics',
        items: ['Types (LAN, MAN, WAN, PAN)', 'Topologies (Bus, Star, Ring, Mesh, Hybrid)', 'OSI Model (7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application)']
      },
      {
        title: 'Protocols & Addressing',
        items: ['TCP/IP Model (4 Layers)', 'Application Layer: HTTP, HTTPS, FTP, SMTP, DNS, DHCP', 'Transport Layer: TCP vs UDP (Reliable vs Connectionless)', 'Network Layer: IPv4, IPv6, Subnetting, MAC address, ARP, Routing']
      }
    ]
  }
};

const Skills = () => {
  const { data: skills, loading } = useFetchData('skills', portfolioData.skills);
  const { coreConcepts } = portfolioData;
  const [selectedConcept, setSelectedConcept] = useState(null);

  if (loading) {
    return (
      <section id="skills" className="position-relative bg-dark-base">
        <div className="container text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  const hasSkills = skills && skills.length > 0;
  const categories = hasSkills ? [...new Set(skills.map(s => s.category))] : [];

  return (
    <section id="skills" className="position-relative bg-dark-base">
      <div className="container">
        <h2 className="section-title text-white">Skills & Core Concepts</h2>
        
        {/* Technical Skills Sub-Section */}
        <h3 className="h4 text-white-50 fw-bold mb-4 border-bottom pb-2 border-white-10">Technical Skills</h3>
        
        {!hasSkills ? (
          <div className="text-center py-4 card-glass mb-5">
            <p className="text-muted mb-0">No technical skills loaded.</p>
          </div>
        ) : (
          <div className="row g-4 mb-5">
            {categories.map((category, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="card-glass p-4 h-100">
                  <h4 className="h5 text-white mb-3 fw-bold">{category}</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {skills
                      .filter(s => s.category === category)
                      .map((skill, sIdx) => (
                        <span className="skill-badge" key={sIdx}>
                          <i className={`bi ${skill.icon || 'bi-patch-check-fill'} text-gradient`}></i>
                          {skill.name}
                        </span>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Core CS Concepts Sub-Section */}
        <h3 className="h4 text-white-50 fw-bold mb-4 border-bottom pb-2 border-white-10">Core Computer Science Concepts</h3>
        <div className="row g-3 justify-content-center">
          {coreConcepts.map((concept, index) => {
            const hasDetails = conceptDetails[concept.name] !== undefined;
            return (
              <div className="col-6 col-sm-4 col-md-2" key={index}>
                <div 
                  className={`card-glass p-3 text-center h-100 d-flex flex-column align-items-center justify-content-center ${hasDetails ? 'cursor-pointer hover-lift' : ''}`}
                  onClick={() => hasDetails && setSelectedConcept(concept.name)}
                  style={{ cursor: hasDetails ? 'pointer' : 'default' }}
                >
                  <i className={`bi ${concept.icon} fs-3 text-gradient mb-2`}></i>
                  <span className="small text-white fw-semibold">{concept.name}</span>
                  {hasDetails && (
                    <span className="badge bg-info-subtle text-info small mt-2" style={{ fontSize: '0.65rem' }}>
                      Click to View
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CS Concepts Modal */}
      <AnimatePresence>
        {selectedConcept && (
          <div className="custom-modal-backdrop" onClick={() => setSelectedConcept(null)}>
            <motion.div 
              className="custom-modal-content card-glass"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h4 text-white fw-bold m-0 text-gradient">
                  {conceptDetails[selectedConcept].title}
                </h3>
                <button 
                  className="btn btn-sm btn-outline-light rounded-circle"
                  onClick={() => setSelectedConcept(null)}
                  style={{ width: '30px', height: '30px', padding: 0 }}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>

              <div className="modal-scroll-area">
                {conceptDetails[selectedConcept].subsections.map((sub, idx) => (
                  <div key={idx} className="mb-4">
                    <h4 className="h6 text-info fw-bold mb-3 border-bottom pb-1 border-white-10">
                      {sub.title}
                    </h4>
                    <ul className="list-unstyled">
                      {sub.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-white-50 small mb-2 d-flex align-items-start text-start">
                          <i className="bi bi-check2-circle text-gradient me-2 mt-1 flex-shrink-0"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
          padding: 20px;
        }
        .custom-modal-content {
          width: 100%;
          max-width: 600px;
          max-height: 85vh;
          background: rgba(18, 18, 22, 0.9) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
          display: flex;
          flex-direction: column;
        }
        .modal-scroll-area {
          overflow-y: auto;
          flex-grow: 1;
          padding-right: 5px;
        }
        .modal-scroll-area::-webkit-scrollbar {
          width: 6px;
        }
        .modal-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 168, 204, 0.2) !important;
        }
      `}</style>
    </section>
  );
};

export default Skills;
