import React from 'react';
import { portfolioData } from '../utils/portfolioData';
import { useFetchData } from '../utils/api';

const Education = () => {
  const { data: education, loading } = useFetchData('education', portfolioData.education);

  if (loading) {
    return (
      <section id="education" className="position-relative bg-dark-base">
        <div className="container text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  const hasEducation = education && education.length > 0;

  return (
    <section id="education" className="position-relative bg-dark-base">
      <div className="container">
        <h2 className="section-title text-white">Education</h2>
        
        <div className="row g-4 justify-content-center">
          {!hasEducation ? (
            <div className="col-lg-8">
              <div className="text-center py-5 card-glass">
                <p className="text-muted mb-0">No education history loaded.</p>
              </div>
            </div>
          ) : (
            education.map((edu, index) => (
              <div className="col-lg-8" key={index}>
                <div className="card-glass p-4 h-100 d-flex flex-column">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="bg-gradient-accent rounded p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-mortarboard fs-5"></i>
                    </div>
                    <div>
                      <span className="small text-gradient fw-semibold">{edu.duration || `${edu.startYear} – ${edu.endYear}`}</span>
                      <h3 className="h5 text-white fw-bold mb-0 mt-1">{edu.degree}</h3>
                    </div>
                  </div>
                  <h4 className="h6 text-muted mb-0 fw-semibold">{edu.institution}</h4>
                  {(edu.dgpa || edu.percentage || edu.division) && (
                    <div className="d-flex flex-wrap gap-2 mt-3 mb-1">
                      {edu.dgpa && (
                        <span className="badge bg-dark border border-white-10 text-white-50 px-3 py-2 small" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                          <strong>DGPA:</strong> {edu.dgpa}
                        </span>
                      )}
                      {edu.percentage && (
                        <span className="badge bg-dark border border-white-10 text-white-50 px-3 py-2 small" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                          <strong>Percentage:</strong> {edu.percentage}
                        </span>
                      )}
                      {edu.division && (
                        <span className="badge bg-dark border border-white-10 text-white-50 px-3 py-2 small" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                          <strong>Division:</strong> {edu.division}
                        </span>
                      )}
                    </div>
                  )}
                  {edu.description && <p className="text-muted small mt-3 mb-0">{edu.description}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
