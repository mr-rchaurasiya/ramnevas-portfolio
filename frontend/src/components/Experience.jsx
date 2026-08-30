import React from 'react';
import { portfolioData } from '../utils/portfolioData';
import { useFetchData } from '../utils/api';
import AnimatedTitle from './AnimatedTitle';

const Experience = () => {
  const { data: experience, loading } = useFetchData('experience', portfolioData.experience);

  if (loading) {
    return (
      <section id="experience" className="position-relative">
        <div className="container text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  const hasExperience = experience && experience.length > 0;

  return (
    <section id="experience" className="position-relative">
      <div className="container">
        <AnimatedTitle text="Work Experience" />
        
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {!hasExperience ? (
              <div className="text-center py-5 card-glass">
                <p className="text-muted mb-0">No work experience loaded.</p>
              </div>
            ) : (
              <div className="timeline">
                {experience.map((exp, index) => (
                  <div className="timeline-item" key={index}>
                    <div className="timeline-dot"></div>
                    <div className="card-glass p-4">
                      <span className="text-gradient fw-bold small text-uppercase tracking-wider d-block mb-1">
                        {exp.duration || (exp.startDate && exp.endDate ? `${exp.startDate} – ${exp.endDate}` : exp.startDate || exp.endDate || '')}
                      </span>
                      <h3 className="h4 text-white fw-bold mb-1">{exp.role}</h3>
                      <h4 className="h6 text-muted mb-3 fw-semibold">{exp.company}</h4>
                      <p className="text-muted mb-3">{exp.description}</p>
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 mt-3">
                          {exp.technologies.map((tech, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="badge bg-secondary-subtle text-secondary-emphasis small px-2 py-1"
                              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
