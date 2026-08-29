import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Ramnevas demonstrated exceptional skill in full-stack architecture during his development work. His ability to design modular React components and resolve complex backend peer dependency issues efficiently is highly commendable.",
      name: "Siddharth Sen",
      role: "Senior Engineering Mentor",
      company: "CodSoft",
      avatar: "SS"
    },
    {
      quote: "An outstanding student with an analytical mind. Ramnevas consistently performed at the top of his class in Computer Science modules and displayed strong problem-solving capabilities in data structures and C++ programming.",
      name: "Dr. A. K. Bareilly",
      role: "Professor & Head of Department",
      company: "IET MJPRU Bareilly",
      avatar: "AB"
    },
    {
      quote: "A highly collaborative teammate who brings robust engineering solutions to the table. His work on the WebRTC TeleHealth portal showed deep commitment to clean code standards and responsive mobile interfaces.",
      name: "Rohan Verma",
      role: "Associate Developer",
      company: "Tech Collaboration Team",
      avatar: "RV"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="position-relative bg-dark-base py-5">
      <div className="container">
        <AnimatedTitle text="Testimonials" />

        <div className="row justify-content-center mt-2">
          <div className="col-lg-8">
            <div className="card-glass p-4 p-md-5 text-center position-relative overflow-hidden" style={{ minHeight: '320px', dFlex: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              {/* Quote Icon */}
              <div className="text-white-10 position-absolute start-5 top-5" style={{ opacity: 0.05, fontSize: '5rem', pointerEvents: 'none' }}>
                <i className="bi bi-quote"></i>
              </div>

              {/* Slider Content */}
              <div style={{ minHeight: '180px' }} className="d-flex align-items-center justify-content-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-100"
                  >
                    <p className="lead text-white-50 mb-4 fs-6 italic font-monospace">
                      "{testimonials[currentIndex].quote}"
                    </p>

                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <div 
                        className="bg-gradient-accent text-white rounded-circle fw-bold d-flex align-items-center justify-content-center" 
                        style={{ width: '48px', height: '48px', fontSize: '1rem', flexShrink: 0 }}
                      >
                        {testimonials[currentIndex].avatar}
                      </div>
                      <div className="text-start">
                        <h4 className="h6 text-white mb-0 fw-bold">{testimonials[currentIndex].name}</h4>
                        <span className="small text-muted">{testimonials[currentIndex].role} &middot; <strong className="text-gradient">{testimonials[currentIndex].company}</strong></span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button 
                  onClick={handlePrev}
                  className="btn btn-outline-custom rounded-circle p-0 d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                  aria-label="Previous testimonial"
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                
                <div className="d-flex align-items-center gap-1.5">
                  {testimonials.map((_, idx) => (
                    <span 
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className="rounded-circle"
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        background: currentIndex === idx ? 'var(--primary-accent)' : 'rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease'
                      }}
                    ></span>
                  ))}
                </div>

                <button 
                  onClick={handleNext}
                  className="btn btn-outline-custom rounded-circle p-0 d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                  aria-label="Next testimonial"
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
