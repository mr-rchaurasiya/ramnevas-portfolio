import React from 'react';
import { useFetchData } from '../utils/api';
import AnimatedTitle from './AnimatedTitle';

const Resume = () => {
  const { data: resume } = useFetchData('resume', null);

  return (
    <section id="resume" className="position-relative bg-dark-base">
      {/* Decorative Blob */}
      <div className="bg-blob blob-purple" style={{ top: '30%', left: '10%' }}></div>

      <div className="container text-center">
        <AnimatedTitle text="Resume" />
        
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="card-glass p-5 shadow-lg border-1">
              
              {/* Document icon */}
              <div className="bg-gradient-accent rounded-circle p-3 text-white mb-4 d-flex align-items-center justify-content-center mx-auto" style={{ width: '64px', height: '64px' }}>
                <i className="bi bi-file-earmark-pdf fs-3"></i>
              </div>

              {/* Resume Title */}
              <h3 className="h4 text-white fw-bold mb-3">Ramnevas Chaurasiya - CV</h3>
              
              {/* Short Professional Description */}
              <p className="text-white-50 mb-4 leading-relaxed" style={{ fontSize: '0.9rem' }}>
                Download my comprehensive resume to explore my B.Tech in CS & IT credentials, technical toolkit (C++, JavaScript, React, Node.js, Flutter), development experience, and algorithmic capabilities.
              </p>
              
              {/* Dynamic Download Button */}
              {resume ? (
                <a 
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary-gradient px-5 py-3 fs-5"
                >
                  <i className="bi bi-download me-2"></i> Download Resume
                </a>
              ) : (
                <div className="p-3 rounded-3 text-center d-inline-block mx-auto border" style={{ background: 'rgba(255, 193, 7, 0.08)', borderColor: 'rgba(255, 193, 7, 0.25)', color: '#ffe082' }}>
                  <i className="bi bi-info-circle-fill me-2 text-warning"></i> 
                  <span className="small font-monospace">Resume is currently not uploaded. Please contact the administrator or check back soon!</span>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
