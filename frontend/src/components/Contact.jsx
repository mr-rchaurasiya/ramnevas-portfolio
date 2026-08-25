import React, { useState } from 'react';
import { portfolioData } from '../utils/portfolioData';
import AnimatedTitle from './AnimatedTitle';
import { API_BASE_URL } from '../utils/api';

const Contact = () => {
  const { email, location, locationUrl, linkedin, instagram, whatsapp } = portfolioData.personalInfo;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required.';
    if (!formData.email.trim()) return 'Email address is required.';
    
    // Basic email format check
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    
    if (!formData.subject.trim()) return 'Subject is required.';
    if (!formData.message.trim()) return 'Message body is required.';
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setSuccessMsg(data.message || 'Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="position-relative bg-dark-base">
      <div className="container">
        <AnimatedTitle text="Contact Me" />
        
        <div className="row g-5 mt-2">
          {/* Info Details */}
          <div className="col-lg-5">
            <h3 className="text-white fw-bold mb-4 h4">Let's Connect</h3>
            <p className="text-white-50 mb-5">
              Have an opening in your development team, a freelance opportunity, or simply want to chat about web technology? Drop me a message and I'll get back to you within 24 hours.
            </p>
            
            <div className="d-flex flex-column gap-4">
              <a href={`mailto:${email}`} className="d-flex align-items-center gap-3 text-decoration-none contact-link-item">
                <div className="bg-gradient-accent rounded-circle p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-envelope fs-5"></i>
                </div>
                <div>
                  <h4 className="h6 text-white mb-0 fw-bold">Email</h4>
                  <span className="small text-muted transition-color">{email}</span>
                </div>
              </a>
              <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-3 text-decoration-none contact-link-item">
                <div className="bg-gradient-accent rounded-circle p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-geo-alt fs-5"></i>
                </div>
                <div>
                  <h4 className="h6 text-white mb-0 fw-bold">Location</h4>
                  <span className="small text-muted transition-color">{location}</span>
                </div>
              </a>
              <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-3 text-decoration-none contact-link-item">
                <div className="bg-gradient-accent rounded-circle p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-linkedin fs-5"></i>
                </div>
                <div>
                  <h4 className="h6 text-white mb-0 fw-bold">LinkedIn</h4>
                  <span className="small text-muted transition-color">{linkedin}</span>
                </div>
              </a>
              <a href={`https://${instagram}`} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-3 text-decoration-none contact-link-item">
                <div className="bg-gradient-accent rounded-circle p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-instagram fs-5"></i>
                </div>
                <div>
                  <h4 className="h6 text-white mb-0 fw-bold">Instagram</h4>
                  <span className="small text-muted transition-color">{instagram}</span>
                </div>
              </a>
              <a href={`https://wa.me/917830911201`} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-3 text-decoration-none contact-link-item">
                <div className="bg-gradient-accent rounded-circle p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-whatsapp fs-5"></i>
                </div>
                <div>
                  <h4 className="h6 text-white mb-0 fw-bold">WhatsApp</h4>
                  <span className="small text-muted transition-color">{whatsapp}</span>
                </div>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card-glass p-4">
              
              {/* Notifications */}
              {errorMsg && (
                <div className="alert alert-danger border-0 bg-danger-subtle text-danger small py-2 px-3 mb-4 rounded-3 text-center">
                  {errorMsg}
                </div>
              )}
              
              {successMsg ? (
                <div className="alert alert-success border-0 bg-success-subtle text-success p-4 mb-0 text-center" style={{ borderRadius: '12px' }}>
                  <i className="bi bi-check-circle-fill fs-2 d-block mb-3 text-gradient"></i>
                  <h4 className="fw-bold">Message Sent Successfully!</h4>
                  <p className="small mb-4">{successMsg}</p>
                  <button onClick={() => setSuccessMsg('')} className="btn btn-outline-custom btn-sm">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="contact-name" className="form-label text-white-50 small fw-semibold">Name *</label>
                      <input 
                        id="contact-name"
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        className="form-control form-control-custom" 
                        placeholder="John Doe"
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contact-email" className="form-label text-white-50 small fw-semibold">Email *</label>
                      <input 
                        id="contact-email"
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className="form-control form-control-custom" 
                        placeholder="john@example.com"
                        required 
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="contact-subject" className="form-label text-white-50 small fw-semibold">Subject *</label>
                      <input 
                        id="contact-subject"
                        type="text" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange}
                        className="form-control form-control-custom" 
                        placeholder="Collaboration Opportunity"
                        required 
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="contact-message" className="form-label text-white-50 small fw-semibold">Message *</label>
                      <textarea 
                        id="contact-message"
                        name="message" 
                        rows="5" 
                        value={formData.message} 
                        onChange={handleChange}
                        className="form-control form-control-custom" 
                        placeholder="Type your message here..."
                        required
                      ></textarea>
                    </div>
                    <div className="col-12 mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary-gradient w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
