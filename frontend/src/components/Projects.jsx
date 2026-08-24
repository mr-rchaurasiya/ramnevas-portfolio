import React from 'react';
import { portfolioData } from '../utils/portfolioData';
import { useFetchData } from '../utils/api';
import AnimatedTitle from './AnimatedTitle';

const Projects = () => {
  const { data: projects, loading } = useFetchData('projects', portfolioData.projects);

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
    <section id="projects" className="position-relative">
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
            projects.map((project, index) => (
              <div className="col-md-6" key={index}>
                <div className="card-glass p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className="badge bg-dark border-1 text-gradient border-white-10 text-uppercase tracking-wider small fw-semibold px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem' }}>
                        {project.category}
                      </span>
                      <div className="d-flex gap-2">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white-50 hover:text-white fs-5" aria-label={`GitHub Repository for ${project.title} (opens in a new tab)`}>
                            <i className="bi bi-github"></i>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white-50 hover:text-white fs-5" aria-label={`Live Demo of ${project.title} (opens in a new tab)`}>
                            <i className="bi bi-box-arrow-up-right"></i>
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="h4 text-white fw-bold mb-3">{project.title}</h3>
                    <p className="text-muted small mb-4">{project.description}</p>
                  </div>
                  
                  <div>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {(project.tags || project.technologies || []).map((tag, tIndex) => (
                        <span 
                          className="badge bg-secondary-subtle text-secondary-emphasis small px-2 py-1" 
                          key={tIndex}
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {(project.githubUrl || project.liveUrl) && (
                      <div className="d-flex gap-3 mt-4">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom btn-sm w-50 py-2">
                            Live Preview
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary-gradient btn-sm w-50 py-2">
                            View Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
