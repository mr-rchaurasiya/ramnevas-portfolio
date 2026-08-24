import React from 'react';
import { portfolioData } from '../utils/portfolioData';
import { useFetchData } from '../utils/api';

const Achievements = () => {
  const { data: achievements, loading } = useFetchData('achievements', portfolioData.achievements);

  if (loading) {
    return (
      <section id="achievements" className="position-relative bg-dark-base">
        <div className="container text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  const hasAchievements = achievements && achievements.length > 0;

  return (
    <section id="achievements" className="position-relative bg-dark-base">
      <div className="container">
        <h2 className="section-title text-white">Achievements & Recognitions</h2>
        
        <div className="row g-4 justify-content-center">
          {!hasAchievements ? (
            <div className="col-12">
              <div className="text-center py-5 card-glass">
                <p className="text-muted mb-0">No achievements loaded.</p>
              </div>
            </div>
          ) : (
            achievements.map((ach, index) => (
              <div className="col-md-5" key={index}>
                <div className="card-glass p-4 h-100 text-center d-flex flex-column align-items-center">
                  <div className="bg-gradient-accent rounded-circle p-3 text-white mb-4 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className={`bi ${ach.icon || 'bi-trophy'} fs-3`}></i>
                  </div>
                  <h3 className="h5 text-white fw-bold mb-2">{ach.title}</h3>
                  {ach.award && <h4 className="small text-gradient fw-bold text-uppercase tracking-wider mb-3">{ach.award}</h4>}
                  <p className="text-muted small mb-0 mt-auto">{ach.details || ach.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
