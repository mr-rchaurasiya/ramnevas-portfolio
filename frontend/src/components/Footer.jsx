import React from 'react';
import { portfolioData } from '../utils/portfolioData';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { name, email, github, linkedin, instagram } = portfolioData.personalInfo;

  return (
    <footer className="py-5 bg-dark-base border-top border-white-10" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4 text-center text-md-start">
          <div>
            <h3 className="h4 text-white fw-bold mb-2">{name}</h3>
            <p className="small text-muted mb-0">Software Developer Portfolio</p>
          </div>
          
          <div className="d-flex gap-3 fs-5">
            <a href={`https://${github}`} target="_blank" rel="noopener noreferrer" className="text-white-50 hover:text-white" aria-label="GitHub">
              <i className="bi bi-github"></i>
            </a>
            <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer" className="text-white-50 hover:text-white" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href={`https://${instagram}`} target="_blank" rel="noopener noreferrer" className="text-white-50 hover:text-white" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://wa.me/917830911201" target="_blank" rel="noopener noreferrer" className="text-white-50 hover:text-white" aria-label="WhatsApp">
              <i className="bi bi-whatsapp"></i>
            </a>
            <a href={`mailto:${email}`} className="text-white-50 hover:text-white" aria-label="Email">
              <i className="bi bi-envelope-fill"></i>
            </a>
          </div>
        </div>
        
        <hr className="my-4 border-white-10" style={{ opacity: 0.1 }} />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-muted text-center text-md-start">
          <p className="mb-0">&copy; {currentYear} {name}. All rights reserved.</p>
          <p className="mb-0">Designed & Built with React, Vite, Bootstrap, and Custom CSS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
