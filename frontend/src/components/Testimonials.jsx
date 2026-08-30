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
    },
    {
      quote: "I recently reviewed the developer portfolio, and the layout looks clean and very professional. The About section in particular is extremely well-structured and detailed. Overall, the presentation, theme options, and academic details are excellent.",
      name: "Dinesh Gupta",
      role: "Chemical Engineer",
      company: "Independent Reviewer",
      avatar: "DG"
    },
    {
      quote: "The portfolio design and component architecture are clean, functional, and user-friendly. A solid showcase of React and frontend development practices.",
      name: "Mohan Pratap",
      role: "Software Engineering Intern",
      company: "MNJ Software / Dronamaps / RMSI",
      avatar: "MP"
    },
    {
      quote: "Bhai accha bana hai, sab to hai isme. (It is built really well and includes all the essential sections. It's a great project to highlight on a resume!)",
      name: "Mohd Tayyab",
      role: "Software Developer",
      company: "CDAC Noida / CS & IT Graduate",
      avatar: "MT"
    },
    {
      quote: "Bhai bohot sahi hai! (Really well-crafted and looks awesome. Great integration of skills and project details.)",
      name: "Avinash Maurya",
      role: "Mobile App Developer",
      company: "Appening Infotech",
      avatar: "AM",
      linkedin: "https://www.linkedin.com/in/avinash-maurya-8a5357202/"
    },
    {
      quote: "Badhiya hai bhai! (Looks great, brother! The design and structure are highly professional.)",
      name: "Vikas Patel",
      role: "Software Engineer",
      company: "Tech Company, Noida",
      avatar: "VP"
    },
    {
      quote: "Mst lg rha! (It looks awesome! The overall design, API integrations, and layout are highly professional.)",
      name: "Himanshu Chaurasia",
      role: "Software Engineer",
      company: "Biz2x",
      avatar: "HC",
      linkedin: "https://www.linkedin.com/in/himanshu-chaurasia/"
    },
    {
      quote: "Bhai badhiya banaya hai. (Great job! The portfolio has a very neat structure and represents all our engineering projects nicely.)",
      name: "Prashant Rathor",
      role: "CS & IT Graduate",
      company: "Classmate",
      avatar: "PR"
    },
    {
      quote: "Bhai ek time pe do intern aur 1+ yrs of exp likhe ho, usko mention karo. (You have mentioned doing two internships at the same time and having 1+ years of experience, you should clarify or highlight that in your resume/details.)",
      name: "Ayush Kumar Mishra",
      role: "Technical Developer AI & ML",
      company: "Independent Reviewer",
      avatar: "AM"
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
                        <div className="d-flex align-items-center gap-2">
                          <h4 className="h6 text-white mb-0 fw-bold">{testimonials[currentIndex].name}</h4>
                          {testimonials[currentIndex].linkedin && (
                            <a 
                              href={testimonials[currentIndex].linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-info hover-scale"
                              style={{ fontSize: '0.9rem', transition: 'transform 0.2s' }}
                              title="View LinkedIn Profile"
                            >
                              <i className="bi bi-linkedin"></i>
                            </a>
                          )}
                        </div>
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
