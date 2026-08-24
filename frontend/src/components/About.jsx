import React from 'react';
import { portfolioData } from '../utils/portfolioData';
import AnimatedTitle from './AnimatedTitle';

const About = () => {
  const { aboutSummary, aboutDetails } = portfolioData.personalInfo;

  return (
    <section id="about" className="position-relative">
      <div className="container">
        <AnimatedTitle text="About Me" />
        
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h3 className="text-white mb-3 fw-bold h4">
              {aboutSummary}
            </h3>
            <p className="text-white-50 mb-4">
              {aboutDetails}
            </p>
            
            <div className="row g-4 mt-2">
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-gradient-accent rounded p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                    <i className="bi bi-code-slash fs-4"></i>
                  </div>
                  <div>
                    <h4 className="h6 text-white mb-0 fw-bold">Clean Code</h4>
                    <span className="small text-muted">Modular structures</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-gradient-accent rounded p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                    <i className="bi bi-speedometer2 fs-4"></i>
                  </div>
                  <div>
                    <h4 className="h6 text-white mb-0 fw-bold">Performance</h4>
                    <span className="small text-muted">Optimized bundles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="row g-4">
              <div className="col-6">
                <div className="card-glass p-4 text-center h-100">
                  <h4 className="display-4 fw-bold text-gradient mb-2">1+</h4>
                  <p className="small text-muted mb-0 fw-semibold text-uppercase tracking-wider">Years Experience</p>
                </div>
              </div>
              <div className="col-6">
                <div className="card-glass p-4 text-center h-100">
                  <h4 className="display-4 fw-bold text-gradient mb-2">2+</h4>
                  <p className="small text-muted mb-0 fw-semibold text-uppercase tracking-wider">Core Projects</p>
                </div>
              </div>
              <div className="col-6">
                <div className="card-glass p-4 text-center h-100">
                  <h4 className="display-4 fw-bold text-gradient mb-2">400+</h4>
                  <p className="small text-muted mb-0 fw-semibold text-uppercase tracking-wider">DSA Solved</p>
                </div>
              </div>
              <div className="col-6">
                <div className="card-glass p-4 text-center h-100">
                  <h4 className="display-4 fw-bold text-gradient mb-2">5★</h4>
                  <p className="small text-muted mb-0 fw-semibold text-uppercase tracking-wider">C / C++ Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
