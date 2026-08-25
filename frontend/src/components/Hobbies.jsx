import React, { useState } from 'react';
import { portfolioData } from '../utils/portfolioData';
import AnimatedTitle from './AnimatedTitle';
import CricketRevisionSheet from './CricketRevisionSheet';

const Hobbies = () => {
  const { cricket } = portfolioData.hobbies || {};
  const [activeSubpart, setActiveSubpart] = useState(cricket?.subparts[0]?.id || 'formats_strategy');
  const [showFullSheet, setShowFullSheet] = useState(false);
  const [initialSheetTab, setInitialSheetTab] = useState('formats');
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);

  const currentSubpart = cricket?.subparts?.find((sub) => sub.id === activeSubpart);

  return (
    <section id="hobbies" className="position-relative bg-dark-base py-5">
      {/* Decorative Blob */}
      <div className="bg-blob blob-cyan" style={{ top: '20%', right: '10%' }}></div>

      <div className="container">
        <AnimatedTitle text="Cricket & Sports Analysis" />
        <p className="text-white-50 text-center small mb-5">Analyzing match dynamics, team strategies, and tactical differences across formats.</p>

        {/* Featured Cricket Card on Landing Page */}
        {cricket && (
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">
              <div className="card-glass p-4 p-md-5 text-center hover-lift shadow-lg position-relative overflow-hidden">
                {/* Floating Icon */}
                <div className="bg-gradient-accent rounded-circle p-4 text-white d-inline-flex align-items-center justify-content-center mb-4 shadow-md" style={{ width: '80px', height: '80px' }}>
                  <i className={`bi ${cricket.icon || 'bi-dribbble'} fs-1`}></i>
                </div>
                
                {/* Titles */}
                <h3 className="h4 text-white fw-bold mb-3">{cricket.title}</h3>
                
                <p className="text-white-50 small mb-4 px-md-4 leading-relaxed">
                  Deeply passionate about following and analyzing cricket across franchise and international formats. 
                  Click below to open the interactive hobby board and explore the detailed cricket strategy notes, rules, and interview cheat sheets.
                </p>

                {/* Trigger Button */}
                <button 
                  onClick={() => setIsMainModalOpen(true)}
                  className="btn btn-primary-gradient px-5 py-3 rounded-pill fw-bold btn-sm shadow transition-all hover-glow"
                  aria-label="Open Cricket Strategy Board"
                >
                  Explore Hobby Board <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Overlay Popup Modal */}
      {isMainModalOpen && (
        <div className="hobby-modal-overlay d-print-none animate-fade-in">
          <div className="hobby-modal-container p-4 p-md-5">
            {showFullSheet ? (
              <CricketRevisionSheet 
                initialTab={initialSheetTab} 
                onClose={() => setShowFullSheet(false)} 
              />
            ) : (
              <div>
                {/* Modal Header */}
                <div className="d-flex justify-content-between align-items-center border-bottom border-white-10 pb-3 mb-4 flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-gradient-accent rounded-circle p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                      <i className={`bi ${cricket?.icon || 'bi-dribbble'} fs-4`}></i>
                    </div>
                    <div>
                      <h3 className="h5 text-white fw-bold mb-0">{cricket?.title}</h3>
                      <p className="text-muted small mb-0">Select any sub-section to explore strategies and rules</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMainModalOpen(false)} 
                    className="btn btn-outline-custom btn-sm rounded-3 px-3 py-2 d-flex align-items-center gap-2"
                    aria-label="Close hobby board"
                  >
                    <i className="bi bi-x-lg"></i> Close Board
                  </button>
                </div>

                {/* Subparts Tabs inside Modal */}
                {cricket && (
                  <div className="row g-3 mb-4">
                    {cricket.subparts.map((subpart) => {
                      const isActive = subpart.id === activeSubpart;
                      return (
                        <div className="col-md-4 col-12" key={subpart.id}>
                          <button
                            onClick={() => {
                              if (subpart.id === 'rules_dismissals') {
                                setInitialSheetTab('rules');
                                setShowFullSheet(true);
                              } else if (subpart.id === 'insights_teamwork') {
                                setInitialSheetTab('faq');
                                setShowFullSheet(true);
                              } else {
                                setActiveSubpart(subpart.id);
                              }
                            }}
                            className={`w-100 p-3 rounded text-start border transition-all hover-glow select-subpart-btn ${
                              isActive 
                                ? 'border-info bg-dark-base shadow-sm' 
                                : 'border-white-10'
                            }`}
                            style={{ 
                              background: isActive ? 'rgba(15, 23, 42, 0.8)' : 'rgba(30, 41, 59, 0.2)',
                              cursor: 'pointer'
                            }}
                            aria-label={`Show ${subpart.title} details`}
                          >
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <i className={`bi ${subpart.icon} fs-5 ${isActive ? 'text-gradient' : 'text-white'}`}></i>
                              <h4 className={`h6 mb-0 fw-bold ${isActive ? 'text-white' : 'text-white-50'}`}>
                                {subpart.title}
                              </h4>
                            </div>
                            <span className="text-muted d-block" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {subpart.badge}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Expanded Content Panel inside Modal */}
                {currentSubpart && (
                  <div className="p-4 rounded border border-white-10 bg-dark-base animate-fade-in" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
                    {/* Introduction */}
                    <p className="text-white-50 border-bottom border-white-10 pb-3 mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                      {currentSubpart.introduction}
                    </p>

                    {activeSubpart === 'formats_strategy' ? (
                      <div className="mt-2">
                        <h5 className="text-gradient h6 fw-bold mb-3 text-uppercase tracking-wider border-bottom border-white-10 pb-2" style={{ fontSize: '0.75rem' }}>
                          ⚡ Click on any format to view its complete interview notes:
                        </h5>
                        <div className="row g-3">
                          {[
                            { id: 't20', title: 'T20 International', icon: 'bi-lightning-charge', desc: 'Click to view T20 match phases, powerplays, death overs strategy, and ball weight rules.' },
                            { id: 't20', title: 'IPL Franchise', icon: 'bi-trophy', desc: 'Click to view BCCI rules, auction pool, impact player substitutions, playoffs, and white ball specs.' },
                            { id: 'odi', title: 'ODI International', icon: 'bi-globe-asia-australia', desc: 'Click to view 50-over pacing, two new white balls rules, and run rate calculations.' },
                            { id: 'test', title: 'Test Match Tactics', icon: 'bi-hourglass-split', desc: 'Click to view 5-day match draw vs tie, follow-on rules, declarations, and red/pink ball specs.' }
                          ].map((item, idx) => (
                            <div className="col-md-6 col-12" key={idx}>
                              <button
                                onClick={() => {
                                  setInitialSheetTab(item.id);
                                  setShowFullSheet(true);
                                }}
                                className="w-100 p-3 rounded text-start border border-white-10 hover-glow transition-all d-flex gap-3 align-items-start"
                                style={{ background: 'rgba(30, 41, 59, 0.3)', cursor: 'pointer' }}
                                aria-label={`Open notes for ${item.title}`}
                              >
                                <div className="bg-gradient-accent rounded-circle p-2 text-white d-flex align-items-center justify-content-center mt-1" style={{ width: '35px', height: '35px', minWidth: '35px' }}>
                                  <i className={`bi ${item.icon} fs-6`}></i>
                                </div>
                                <div>
                                  <strong className="text-white d-block mb-1" style={{ fontSize: '0.82rem' }}>{item.title}</strong>
                                  <p className="text-muted mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>{item.desc}</p>
                                </div>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="row g-4">
                        {currentSubpart.sections.map((section, sIdx) => (
                          <div className="col-md-6 col-12" key={sIdx}>
                            <h5 className="text-gradient h6 fw-bold mb-3 text-uppercase tracking-wider border-bottom border-white-10 pb-2" style={{ fontSize: '0.75rem' }}>
                              {section.title}
                            </h5>
                            <div className="d-flex flex-column gap-3">
                              {section.items.map((item, iIdx) => (
                                <div className="pb-2 border-bottom border-white-05" key={iIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                  <strong className="text-white d-block mb-1" style={{ fontSize: '0.82rem' }}>
                                    {item.term}
                                  </strong>
                                  <p className="text-muted mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                                    {item.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hobbies;
