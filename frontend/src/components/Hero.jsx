import React, { useState } from 'react';
import { portfolioData } from '../utils/portfolioData';
import { motion } from 'framer-motion';

const Hero = () => {
  const { name, title } = portfolioData.personalInfo;
  const [isFlipped, setIsFlipped] = useState(false);

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
    <section id="hero" className="d-flex align-items-center min-vh-100 position-relative overflow-hidden hero-section">
      {/* Decorative Blobs */}
      <motion.div 
        className="bg-blob blob-cyan"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      ></motion.div>
      <motion.div 
        className="bg-blob blob-purple" 
        style={{ bottom: '10%', right: '10%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
      ></motion.div>
      
      <div className="container">
        <div className="row align-items-center g-5">
          <motion.div 
            className="col-lg-7 text-center text-lg-start"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-gradient fw-bold text-uppercase tracking-wider fs-6 d-block mb-3">
              Welcome to my portfolio
            </span>
            <h1 className="display-3 fw-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Hi, I'm <span className="text-gradient">{name}</span>
            </h1>
            <h2 className="h2 text-white-50 fw-semibold mb-4">
              {title}
            </h2>
            <p className="lead text-muted mb-5 max-w-2xl">
              I build high-performance, responsive web applications with modern frontend frameworks and robust, scalable backend architectures. Let's turn your vision into clean, executable code.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
              <a 
                href="#projects" 
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="btn btn-primary-gradient px-4 py-3"
              >
                View My Projects
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="btn btn-outline-custom px-4 py-3"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-lg-5 text-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {/* 3D Flip Card Container */}
            <div 
              className="mx-auto position-relative" 
              style={{ 
                maxWidth: '100%', 
                width: '380px', 
                height: '420px',
                perspective: '1000px', // enables 3D space
                cursor: 'pointer'
              }}
              onClick={() => setIsFlipped(!isFlipped)}
              title="Click to flip card!"
            >
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d', // maintains 3D layout for children
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                whileHover={{ scale: 1.02 }}
              >
                
                {/* --- FRONT SIDE: Profile Photo --- */}
                <div
                  className="position-absolute w-100 h-100 card-glass p-3 shadow-2xl"
                  style={{
                    backfaceVisibility: 'hidden', // hides back when rotated
                    WebkitBackfaceVisibility: 'hidden',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    top: 0,
                    left: 0
                  }}
                >
                  <div className="position-relative overflow-hidden rounded-4 mb-3" style={{ height: '300px' }}>
                    <img 
                      src="/profile.png" 
                      alt={name} 
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-100 h-100 d-none align-items-center justify-content-center flex-column gap-3 text-white-50 p-3 text-center"
                      style={{ background: 'linear-gradient(135deg, #1f2937, #111827)' }}
                    >
                      <i className="bi bi-person-badge display-3 text-gradient"></i>
                      <span className="small font-monospace text-muted mt-2">Place your photo in:</span>
                      <span className="small font-monospace text-gradient" style={{ fontSize: '0.75rem' }}>frontend/public/profile.png</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center px-1">
                    <div className="text-start">
                      <h3 className="h6 text-white mb-0 fw-bold">{name}</h3>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>{title}</span>
                    </div>
                    <span className="badge bg-info-subtle text-info border-1 px-2.5 py-1 rounded-pill small fw-semibold" style={{ fontSize: '0.7rem' }}>
                      Click to Flip
                    </span>
                  </div>
                </div>

                {/* --- BACK SIDE: Developer Profile Code --- */}
                <div
                  className="position-absolute w-100 h-100 card-glass p-4 text-start shadow-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)', // flips it initially
                    background: 'linear-gradient(145deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.95))',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    top: 0,
                    left: 0
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-2">
                      <span className="badge bg-danger-subtle text-danger rounded-circle p-1" style={{ width: '8px', height: '8px' }}></span>
                      <span className="badge bg-warning-subtle text-warning rounded-circle p-1" style={{ width: '8px', height: '8px' }}></span>
                      <span className="badge bg-success-subtle text-success rounded-circle p-1" style={{ width: '8px', height: '8px' }}></span>
                    </div>
                    <span className="badge bg-secondary-subtle text-secondary small px-2 py-0.5 rounded-pill" style={{ fontSize: '0.65rem' }}>
                      Click to Photo
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-primary-emphasis font-monospace d-block">&lt;DeveloperProfile&gt;</span>
                  </div>
                  <div className="font-monospace text-white-50 small ps-3 mb-4" style={{ lineHeight: '1.6', fontSize: '0.75rem' }}>
                    <span className="text-info">name:</span> "{name}",<br />
                    <span className="text-info">role:</span> "{title}",<br />
                    <span className="text-info">skills:</span> [<br />
                    &nbsp;&nbsp;"React.js", "Node.js",<br />
                    &nbsp;&nbsp;"Express.js", "MongoDB"<br />
                    ],<br />
                    <span className="text-info">passion:</span> "Scalable Architectures"
                  </div>
                  <div className="text-end">
                    <span className="text-primary-emphasis font-monospace">&lt;/DeveloperProfile&gt;</span>
                  </div>
                </div>

              </motion.div>

              {/* Behind card glow effect */}
              <div 
                className="position-absolute top-50 start-50 translate-middle w-100 h-100 z-n1 rounded-circle blur-3xl opacity-20"
                style={{ 
                  background: 'radial-gradient(circle, var(--color-cyan) 0%, var(--color-purple) 100%)',
                  transform: 'translate(-50%, -50%) scale(0.8)',
                  pointerEvents: 'none'
                }}
              ></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

