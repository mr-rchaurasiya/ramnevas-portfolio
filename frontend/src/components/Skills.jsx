import React from 'react';
import { portfolioData } from '../utils/portfolioData';
import { useFetchData } from '../utils/api';

const Skills = () => {
  const { data: skills, loading } = useFetchData('skills', portfolioData.skills);
  const { coreConcepts } = portfolioData;

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

  // Check empty state
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
          {coreConcepts.map((concept, index) => (
            <div className="col-6 col-sm-4 col-md-2" key={index}>
              <div className="card-glass p-3 text-center h-100 d-flex flex-column align-items-center justify-content-center">
                <i className={`bi ${concept.icon} fs-3 text-gradient mb-2`}></i>
                <span className="small text-white-50 fw-semibold">{concept.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
