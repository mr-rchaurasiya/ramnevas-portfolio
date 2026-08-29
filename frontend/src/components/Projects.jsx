import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../utils/portfolioData';
import { useFetchData } from '../utils/api';
import AnimatedTitle from './AnimatedTitle';

// Dynamic mapper to inject professional challenges and solutions based on project title
const enrichProjectData = (project) => {
  const title = (project.title || '').toLowerCase();
  
  if (title.includes('careerflow')) {
    return {
      ...project,
      challenges: [
        "Handling database connection dropouts gracefully on production environments.",
        "Ensuring complete data integrity when offline with transparent write propagation.",
        "Optimizing initial bundle size and API route protection limits."
      ],
      solutions: [
        "Built a hybrid adapter layer falling back seamlessly to local storage if MongoDB fails.",
        "Designed a client-side buffering system for local workspace synchronization.",
        "Implemented lazy-loading code chunks and structured route auth tokens."
      ],
      longDescription: "CareerFlow is a modern job tracking platform designed to simplify job hunt management. It incorporates secure authentication, a visual dashboard summarizing key metrics, and database fault tolerance with high-speed query indexing."
    };
  }
  
  if (title.includes('pulsemd') || title.includes('telehealth') || title.includes('doctor')) {
    return {
      ...project,
      challenges: [
        "Resolving signaling connection leaks and maintaining real-time video/audio stream latency.",
        "Handling client authentication state changes during a live consult stream.",
        "Designing cross-platform native-feeling camera layouts in Flutter."
      ],
      solutions: [
        "Structured a lightweight WebSocket server with a strict ping/pong connection validation heartbeat.",
        "Utilized clean ChangeNotifier states to isolate media states from layout structures.",
        "Created adaptive rendering constraints using Flutter's LayoutBuilder grids."
      ],
      longDescription: "A high-fidelity doctor portal designed to optimize telemedicine consulting. Features secure user accounts, dynamic analytics dashboard, live consultations utilizing peer-to-peer WebRTC connections, and serverless P2P audio/video media pipelines."
    };
  }

  if (title.includes('google')) {
    return {
      ...project,
      challenges: [
        "Handling deep nested JSON payloads from external search APIs without slowing down client renders.",
        "Optimizing data caching limits to prevent duplicate API hits."
      ],
      solutions: [
        "Implemented debounced input listeners and mapped payload objects efficiently.",
        "Integrated dynamic Cloud Firestore documents as query cache lookups."
      ],
      longDescription: "A Google Search clone that replicates query search functionality and visual layouts. Connected directly to live search endpoints and backed by Cloud Firestore queries to minimize network overhead."
    };
  }

  if (title.includes('chat')) {
    return {
      ...project,
      challenges: [
        "Maintaining smooth rendering streams on mobile viewports under high messaging throughput.",
        "Managing real-time status notifications for network drops."
      ],
      solutions: [
        "Optimized Firestore listeners using paginated queries and list item reuse adapters.",
        "Added local listeners notifying network state updates via reactive signals."
      ],
      longDescription: "A real-time communication tool featuring secure account registration, group chat rooms, and instantaneous message delivery utilizing Cloud Firestore backend document listeners."
    };
  }

  // Fallback for general projects
  return {
    ...project,
    challenges: [
      "Optimizing modular structure layouts to adapt across mobile, tablet, and desktop.",
      "Structuring code for high testability and separation of concerns."
    ],
    solutions: [
      "Designed responsive layouts utilizing CSS flex/grid and media queries.",
      "Separated UI components from state logic hooks and validation structures."
    ],
    longDescription: project.description || "A professional full-stack development project showcasing clean code, robust performance, and interactive user experiences."
  };
};

const Projects = () => {
  const { data: projects, loading } = useFetchData('projects', portfolioData.projects);
  const [selectedProject, setSelectedProject] = useState(null);

  if (loading) {
    return (
      <section id="projects" className="position-relative">
        <div className="container text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  const hasProjects = projects && projects.length > 0;

  return (
    <section id="projects" className="position-relative bg-dark-base py-5">
      <div className="container">
        <AnimatedTitle text="Featured Projects" />

        {/* Projects Grid */}
        <div className="row g-4 justify-content-center">
          {!hasProjects ? (
            <div className="col-12">
              <div className="text-center py-5 card-glass">
                <p className="text-muted mb-0">No projects loaded.</p>
              </div>
            </div>
          ) : (
            projects.map((project, index) => {
              const enriched = enrichProjectData(project);
              return (
                <div className="col-md-6" key={index}>
                  <div 
                    onClick={() => setSelectedProject(enriched)}
                    className="card-glass p-4 h-100 d-flex flex-column justify-content-between hover-lift hover-glow cursor-pointer"
                    title="Click to view details, challenges, and solutions!"
                  >
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className="badge bg-dark border-1 text-gradient border-white-10 text-uppercase tracking-wider small fw-semibold px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem' }}>
                          {enriched.category}
                        </span>
                        <span className="badge bg-info-subtle text-info border border-info-subtle px-2 py-1 rounded-pill small fw-semibold d-flex align-items-center gap-1" style={{ fontSize: '0.65rem' }}>
                          <i className="bi bi-info-circle"></i> Details
                        </span>
                      </div>
                      
                      <h3 className="h4 text-white fw-bold mb-3">{enriched.title}</h3>
                      <p className="text-muted small mb-4">{enriched.description}</p>
                    </div>
                    
                    <div>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        {(enriched.tags || enriched.technologies || []).map((tag, tIndex) => (
                          <span 
                            className="badge bg-secondary-subtle text-secondary-emphasis small px-2 py-1" 
                            key={tIndex}
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {(enriched.githubUrl || enriched.liveUrl) && (
                        <div className="d-flex gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
                          {enriched.liveUrl && (
                            <a href={enriched.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom btn-sm w-50 py-2">
                              Live Preview
                            </a>
                          )}
                          {enriched.githubUrl && (
                            <a href={enriched.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary-gradient btn-sm w-50 py-2">
                              View Code
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Details Dialog / Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="modal-backdrop-blur" onClick={() => setSelectedProject(null)}>
            <motion.div 
              className="custom-modal-content card-glass p-4 m-3 position-relative overflow-y-auto"
              style={{ maxWidth: '650px', width: '100%', maxHeight: '90vh', background: 'rgba(15, 23, 42, 0.98)', border: '1px solid rgba(255,255,255,0.1)' }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)} 
                className="btn position-absolute border-0 text-white-50 p-2"
                style={{ top: '15px', right: '15px', fontSize: '1.25rem', cursor: 'pointer' }}
                aria-label="Close details"
              >
                <i className="bi bi-x-lg"></i>
              </button>

              <div className="mb-4">
                <span className="badge bg-dark border border-white-10 text-gradient mb-2 text-uppercase tracking-wider small fw-semibold px-3 py-1.5" style={{ fontSize: '0.7rem' }}>
                  {selectedProject.category}
                </span>
                <h3 className="h4 text-white fw-bold mb-2">{selectedProject.title}</h3>
                <p className="text-white-50 small mb-0">{selectedProject.longDescription}</p>
              </div>

              {/* Technical Challenges & Solutions Grid */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="p-3 rounded-3 h-100" style={{ background: 'rgba(239, 68, 68, 0.02)', border: '1px solid rgba(239, 68, 68, 0.08)' }}>
                    <h4 className="h6 text-danger fw-bold mb-2 d-flex align-items-center gap-2">
                      <i className="bi bi-exclamation-triangle"></i> Key Challenges
                    </h4>
                    <ul className="ps-3 mb-0 small text-muted">
                      {selectedProject.challenges.map((c, i) => (
                        <li key={i} className="mb-2">{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-3 h-100" style={{ background: 'rgba(16, 185, 129, 0.02)', border: '1px solid rgba(16, 185, 129, 0.08)' }}>
                    <h4 className="h6 text-success fw-bold mb-2 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle"></i> Solutions
                    </h4>
                    <ul className="ps-3 mb-0 small text-muted">
                      {selectedProject.solutions.map((s, i) => (
                        <li key={i} className="mb-2">{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-4">
                <h4 className="h6 text-white fw-bold mb-2">Technologies Used</h4>
                <div className="d-flex flex-wrap gap-2">
                  {(selectedProject.tags || selectedProject.technologies || []).map((tag, i) => (
                    <span 
                      key={i} 
                      className="badge bg-secondary-subtle text-secondary-emphasis small px-2.5 py-1.5" 
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="d-flex gap-3">
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom w-50 py-2">
                    Live Demo <i className="bi bi-box-arrow-up-right ms-1"></i>
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary-gradient w-50 py-2">
                    GitHub Code <i className="bi bi-github ms-1"></i>
                  </a>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
