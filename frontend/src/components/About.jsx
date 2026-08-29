import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../utils/portfolioData';
import AnimatedTitle from './AnimatedTitle';

const About = () => {
  const { aboutSummary, aboutDetails } = portfolioData.personalInfo;

  // Custom smooth scroll helper with navbar offset calculation
  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
            
            {/* Interactive Professional Pillars */}
            <div className="row g-4 mt-2">
              {[
                {
                  icon: "bi-code-slash",
                  title: "Clean Code",
                  desc: "Modular structures",
                  target: "skills"
                },
                {
                  icon: "bi-speedometer2",
                  title: "Performance",
                  desc: "Optimized bundles",
                  target: "projects"
                }
              ].map((item, idx) => (
                <div className="col-sm-6" key={idx}>
                  <motion.a
                    href={`#${item.target}`}
                    onClick={(e) => handleScrollTo(e, item.target)}
                    className="d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      cursor: 'pointer'
                    }}
                    whileHover={{ 
                      scale: 1.03, 
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      borderColor: 'rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 8px 30px rgba(59, 130, 246, 0.12)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <div className="bg-gradient-accent rounded p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', flexShrink: 0 }}>
                      <i className={`bi ${item.icon} fs-4`}></i>
                    </div>
                    <div>
                      <h4 className="h6 text-white mb-0 fw-bold">{item.title}</h4>
                      <span className="small text-muted">{item.desc}</span>
                    </div>
                  </motion.a>
                </div>
              ))}
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
                  <h4 className="display-4 fw-bold text-gradient mb-2">4+</h4>
                  <p className="small text-muted mb-0 fw-semibold text-uppercase tracking-wider">Completed Projects</p>
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
