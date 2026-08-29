import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is in view
      const sections = ['hero', 'about', 'skills', 'experience', 'education', 'projects', 'achievements', 'hobbies', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update theme class on body element
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false); // Close navbar menu on link click (important for mobile)
    
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80; // height of navbar
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
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top navbar-glass ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="container">
        <a className="navbar-brand fw-bold text-gradient fs-4" href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>
          RC.Portfolio
        </a>
        
        <div className="d-flex align-items-center order-lg-last gap-2">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="btn btn-link nav-link p-2 text-gradient border-0" 
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Light/Dark Theme"
            style={{ fontSize: '1.25rem', cursor: 'pointer', outline: 'none' }}
          >
            <i className={`bi ${theme === 'dark' ? 'bi-moon-stars' : 'bi-sun-fill'}`}></i>
          </button>

          <button 
            className="navbar-toggler border-0" 
            type="button" 
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="navbarNav" 
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'projects', label: 'Projects' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'hobbies', label: 'Sports Analysis' },
              { id: 'resume', label: 'Resume' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <li className="nav-item" key={item.id}>
                <a 
                  className={`nav-link nav-link-custom ${activeSection === item.id ? 'active' : ''}`} 
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
