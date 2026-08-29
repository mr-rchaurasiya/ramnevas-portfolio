import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';

const DSAStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch LeetCode solved statistics dynamically
  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch('https://alfa-leetcode-api.onrender.com/ddr6/solved');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        // Fallback to static mock if API fails
        setStats({
          solvedProblem: 16,
          easySolved: 11,
          mediumSolved: 4,
          hardSolved: 1
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, []);

  // Static stats for HackerRank since there is no simple public API
  const hackerRankStats = {
    badges: [
      { name: "Problem Solving", stars: 5, color: "var(--primary-accent)" },
      { name: "C++ Programming", stars: 5, color: "var(--secondary-accent)" }
    ],
    username: "ramnevas81889",
    profileUrl: "https://www.hackerrank.com/profile/ramnevas81889"
  };

  return (
    <section id="dsa-stats" className="position-relative bg-dark-base py-5">
      <div className="container">
        <AnimatedTitle text="Coding Analytics" />

        <div className="row g-4 mt-2 justify-content-center">
          {/* LeetCode Live Stats Card */}
          <div className="col-lg-5 col-md-6">
            <div className="card-glass p-4 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden">
              <div>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="bg-gradient-accent rounded p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-code fs-5"></i>
                  </div>
                  <div>
                    <h3 className="h5 text-white fw-bold mb-0">LeetCode Analytics</h3>
                    <span className="small text-muted">Live stats for user: <strong>ddr6</strong></span>
                  </div>
                </div>

                {loading ? (
                  <div className="d-flex justify-content-center align-items-center py-5">
                    <div className="spinner-border text-info spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {/* Easy Solved */}
                    <div>
                      <div className="d-flex justify-content-between small text-white-50 mb-1 fw-semibold">
                        <span>Easy Problems</span>
                        <span>{stats.easySolved} solved</span>
                      </div>
                      <div className="progress bg-dark-base" style={{ height: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <motion.div 
                          className="progress-bar bg-success" 
                          role="progressbar" 
                          style={{ width: `${(stats.easySolved / 500) * 100 || 5}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(stats.easySolved / 25) * 100}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        ></motion.div>
                      </div>
                    </div>

                    {/* Medium Solved */}
                    <div>
                      <div className="d-flex justify-content-between small text-white-50 mb-1 fw-semibold">
                        <span>Medium Problems</span>
                        <span>{stats.mediumSolved} solved</span>
                      </div>
                      <div className="progress bg-dark-base" style={{ height: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <motion.div 
                          className="progress-bar bg-warning" 
                          role="progressbar" 
                          style={{ width: `${(stats.mediumSolved / 300) * 100 || 5}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(stats.mediumSolved / 15) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        ></motion.div>
                      </div>
                    </div>

                    {/* Hard Solved */}
                    <div>
                      <div className="d-flex justify-content-between small text-white-50 mb-1 fw-semibold">
                        <span>Hard Problems</span>
                        <span>{stats.hardSolved} solved</span>
                      </div>
                      <div className="progress bg-dark-base" style={{ height: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <motion.div 
                          className="progress-bar bg-danger" 
                          role="progressbar" 
                          style={{ width: `${(stats.hardSolved / 100) * 100 || 5}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(stats.hardSolved / 5) * 100}%` }}
                          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                        ></motion.div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-white-05">
                      <span className="small text-white-50">Total LeetCode Problems:</span>
                      <span className="h4 text-gradient fw-bold mb-0">{stats.solvedProblem}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <a 
                  href="https://leetcode.com/u/ddr6/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-custom w-100 btn-sm text-decoration-none"
                >
                  <i className="bi bi-box-arrow-up-right me-1"></i> Visit LeetCode Profile
                </a>
              </div>
            </div>
          </div>

          {/* HackerRank & Platform Badges Card */}
          <div className="col-lg-5 col-md-6">
            <div className="card-glass p-4 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden">
              <div>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="bg-gradient-accent rounded p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-award fs-5"></i>
                  </div>
                  <div>
                    <h3 className="h5 text-white fw-bold mb-0">HackerRank Milestones</h3>
                    <span className="small text-muted">Gold Badge holder</span>
                  </div>
                </div>

                <div className="d-flex flex-column gap-3 mb-4">
                  {hackerRankStats.badges.map((badge, idx) => (
                    <div 
                      key={idx} 
                      className="d-flex align-items-center justify-content-between p-3 rounded-3" 
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <div>
                        <h4 className="h6 text-white mb-1 fw-bold">{badge.name}</h4>
                        <div className="text-warning small d-flex gap-1">
                          {Array.from({ length: badge.stars }).map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                        </div>
                      </div>
                      <span className="badge bg-dark-base border border-warning-subtle text-warning small px-2 py-1 rounded-pill fw-bold">
                        5★ Gold
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a 
                  href={hackerRankStats.profileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-custom w-100 btn-sm text-decoration-none mb-2"
                >
                  <i className="bi bi-box-arrow-up-right me-1"></i> Visit HackerRank Profile
                </a>
                <a 
                  href="https://github.com/mr-rchaurasiya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-custom w-100 btn-sm text-decoration-none"
                >
                  <i className="bi bi-github me-1"></i> Visit GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DSAStats;
