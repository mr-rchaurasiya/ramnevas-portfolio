import React, { useState, useEffect } from 'react';

const CricketRevisionSheet = ({ initialTab = 'formats', onClose }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Synchronize initialTab if it changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="cricket-sheet-container bg-dark-base p-4 p-md-5 rounded-4 border border-white-10 shadow-2xl">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom border-white-10 pb-4 mb-4 flex-wrap gap-3">
        <div>
          <h1 className="h3 text-white fw-bold mb-1">🏏 CRICKET INTERVIEW REVISION SHEET</h1>
          <p className="text-muted small mb-0">MCC Laws, ICC Playing Conditions, IPL Regulations & Engineering Analogies</p>
        </div>
        <button 
          onClick={onClose} 
          className="btn btn-outline-custom px-4 py-2 btn-sm rounded-3 d-flex align-items-center gap-2"
          aria-label="Close revision sheet"
        >
          <i className="bi bi-x-lg"></i> Return to Portfolio
        </button>
      </div>

      {/* Tabs Row */}
      <div className="d-flex flex-wrap gap-2 mb-4 border-bottom border-white-05 pb-3">
        {[
          { id: 'formats', label: '📊 Formats Comparison', icon: 'bi-grid-3x3-gap-fill' },
          { id: 't20', label: '⚡ T20 & IPL League', icon: 'bi-lightning-charge-fill' },
          { id: 'odi', label: '🏆 ODI International', icon: 'bi-trophy-fill' },
          { id: 'test', label: '⏳ Test Match Tactics', icon: 'bi-hourglass-split' },
          { id: 'specs', label: '📏 Equipment & Specs', icon: 'bi-rulers' },
          { id: 'rules', label: '📋 Laws & Dismissals', icon: 'bi-gear-wide-connected' },
          { id: 'faq', label: '💬 HR Q&A Scenarios', icon: 'bi-chat-quote-fill' },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn btn-sm px-3 py-2 rounded-3 transition-all d-flex align-items-center gap-2 ${
                isSelected 
                  ? 'btn-info text-dark fw-bold' 
                  : 'btn-outline-secondary text-white-50 border-white-10 hover:text-white'
              }`}
              style={{ fontSize: '0.8rem' }}
            >
              <i className={`bi ${tab.icon}`}></i>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="cricket-sheet-body text-white-50 animate-fade-in" style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '8px' }}>
        
        {/* TAB 1: FORMATS & COMPARISON */}
        {activeTab === 'formats' && (
          <div>
            <h2 className="h5 text-white fw-bold mb-3 d-flex align-items-center gap-2">
              <span className="text-gradient">1. Sabse Pehle Basic Difference</span>
            </h2>
            <p className="small mb-4">
              Hum cricket ko 3 main formats me divide karte hain (T20, ODI, Test). IPL ek franchise league hai jisme T20 format use kiya jata hai. 
              Niche formats aur unki specifications ka comparison diya gaya hai:
            </p>

            <div className="table-responsive mb-4">
              <table className="table table-dark table-bordered table-striped align-middle small mb-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <thead>
                  <tr className="text-white fw-bold">
                    <th>Feature</th>
                    <th>IPL (Franchise)</th>
                    <th>T20 International</th>
                    <th>ODI</th>
                    <th>Test Cricket</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Type</strong></td>
                    <td>Franchise League</td>
                    <td>International Match</td>
                    <td>International Match</td>
                    <td>International/Test</td>
                  </tr>
                  <tr>
                    <td><strong>Format</strong></td>
                    <td>T20 (20 Overs)</td>
                    <td>T20 (20 Overs)</td>
                    <td>50-Over</td>
                    <td>Multi-day (No limit)</td>
                  </tr>
                  <tr>
                    <td><strong>Overs / Innings</strong></td>
                    <td>20 overs (120 balls)</td>
                    <td>20 overs (120 balls)</td>
                    <td>50 overs (300 balls)</td>
                    <td>No fixed overs</td>
                  </tr>
                  <tr>
                    <td><strong>Innings per Team</strong></td>
                    <td>1 Innings</td>
                    <td>1 Innings</td>
                    <td>1 Innings</td>
                    <td>Up to 2 Innings</td>
                  </tr>
                  <tr>
                    <td><strong>Duration</strong></td>
                    <td>~3–4 Hours</td>
                    <td>~3–4 Hours</td>
                    <td>~7–8 Hours</td>
                    <td>Up to 5 Days</td>
                  </tr>
                  <tr>
                    <td><strong>Ball Colour</strong></td>
                    <td>White Ball (BCCI spec)</td>
                    <td>White Ball</td>
                    <td>White Ball (2 new balls)</td>
                    <td>Red Ball (Pink for D/N)</td>
                  </tr>
                  <tr>
                    <td><strong>Main focus</strong></td>
                    <td>Aggression + Tactics</td>
                    <td>Aggression + Tactics</td>
                    <td>Balance & Partnership</td>
                    <td>Patience & Technique</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-glass p-3 border-white-05">
              <strong className="text-white d-block mb-1">⭐ Strategic Overview (Interview Point):</strong>
              <p className="small mb-0 leading-relaxed text-justify">
                "T20 and IPL demand instant acceleration, tactical player matchups, and high-risk boundary hitting. 
                ODI requires building partnerships in middle overs, keeping the score rotating, and balancing risk. 
                Test cricket is the ultimate challenge of defensive technique, patience across 5 days, session planning, and adapting to cracking pitches."
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: T20 & IPL LEAGUE */}
        {activeTab === 't20' && (
          <div>
            <h2 className="h5 text-white fw-bold mb-3"><span className="text-gradient">2. T20 & IPL Franchise Dynamics</span></h2>
            
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card-glass p-3 border-white-05 h-100">
                  <h3 className="h6 text-white fw-bold mb-2">⚡ T20 Format & Balls</h3>
                  <p className="small mb-2">T20 innings limits are capped at <strong>20 overs (120 legal balls)</strong>. If a team is bowled out or chases the target earlier, the balls are lesser.</p>
                  <ul className="small mb-0 pl-3">
                    <li><strong>Ball Colour:</strong> White ball is used for visibility in day/night conditions under floodlights.</li>
                    <li><strong>Phases:</strong> Powerplay (Overs 1-6, only 2 fielders outside 30-yd circle), Middle overs (7-15), and Death overs (16-20).</li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card-glass p-3 border-white-05 h-100">
                  <h3 className="h6 text-white fw-bold mb-2">🏆 IPL Franchise Specifications</h3>
                  <p className="small mb-2">IPL (Indian Premier League) is a professional T20 franchise league played between city teams (e.g. CSK, MI, RCB, KKR) rather than national countries.</p>
                  <ul className="small mb-0 pl-3">
                    <li><strong>Impact Player Rule:</strong> Allows teams to substitute an active player mid-match based on batting/bowling requirements.</li>
                    <li><strong>Auction & Retention:</strong> Franchises bid financially to build squads using player pools and retentions.</li>
                    <li><strong>Overseas Cap:</strong> Under IPL conditions, a maximum of 4 overseas players can be included in the playing XI.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-glass p-3 border-white-05">
              <strong className="text-white d-block mb-2">🔥 Crucial Interview Difference:</strong>
              <blockquote className="blockquote small text-muted mb-0 border-start border-info ps-3 py-1">
                "IPL and T20 International use the same T20 format (20 overs, white ball, fielding restrictions). However, IPL is a franchise-based domestic league featuring mixed global squads, whereas T20 International is played directly between sovereign national teams."
              </blockquote>
            </div>
          </div>
        )}

        {/* TAB 3: ODI INTERNATIONAL */}
        {activeTab === 'odi' && (
          <div>
            <h2 className="h5 text-white fw-bold mb-3"><span className="text-gradient">3. ODI International Specifications</span></h2>
            
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card-glass p-3 border-white-05 h-100">
                  <h3 className="h6 text-white fw-bold mb-2">🏏 50-Over Structure</h3>
                  <p className="small mb-0">
                    ODIs feature <strong>50 overs per innings (300 legal balls)</strong> per team. 
                    It is a single-day format that demands a careful transition from early powerplay attack, middle-overs anchoring/strike rotation, and final death-overs acceleration.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card-glass p-3 border-white-05 h-100">
                  <h3 className="h6 text-white fw-bold mb-2">⚪ Two New White Balls</h3>
                  <p className="small mb-0">
                    Official ICC ODI playing conditions state that <strong>two new white balls</strong> are used per innings—one from each end. 
                    This ensures the ball remains hard and visible longer, but reduces natural reverse swing in the later overs.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-glass p-3 border-white-05">
              <h3 className="h6 text-white fw-bold mb-2">📈 Required Run Rate (RRR) Calculation</h3>
              <p className="small mb-0">
                If the target is 250 and the batting team is at 100 after 20 overs, they need 150 runs in the remaining 30 overs. 
                The <strong>Required Run Rate (RRR)</strong> is: <code>150 runs / 30 overs = 5.00 runs per over.</code>
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: TEST MATCH TACTICS */}
        {activeTab === 'test' && (
          <div>
            <h2 className="h5 text-white fw-bold mb-3"><span className="text-gradient">4. Test Cricket & Multi-Day Tactics</span></h2>
            
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="p-3 rounded bg-dark-card border border-white-05 h-100">
                  <strong className="text-white d-block mb-1">⏳ Time-Limited Format</strong>
                  <span className="small text-muted d-block mt-2">Played over a maximum of 5 days with 3 sessions per day (Morning, Afternoon, Evening) separated by Lunch and Tea. No fixed overs limits per innings.</span>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-3 rounded bg-dark-card border border-white-05 h-100">
                  <strong className="text-white d-block mb-1">🔄 Multi-Innings System</strong>
                  <span className="small text-muted d-block mt-2">Each team bats up to 2 innings. A captain can choose to **Declare** (voluntarily end innings) to give bowlers enough time to bowl out the opposition.</span>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-3 rounded bg-dark-card border border-white-05 h-100">
                  <strong className="text-white d-block mb-1">📊 Tie vs Draw</strong>
                  <span className="small text-muted d-block mt-2">**Tie:** Equal total scores when all innings are completed. **Draw:** Time/5 days expire before both teams complete their innings.</span>
                </div>
              </div>
            </div>

            <div className="card-glass p-3 border-white-05 mb-4">
              <h3 className="h6 text-white fw-bold mb-2">🔴 Red Ball vs Pink Ball</h3>
              <p className="small mb-0">
                Tests traditionally use the <strong>Red leather ball</strong> which has a pronounced seam and swings longer. 
                In Day-Night Tests, a <strong>Pink ball</strong> is used to ensure visibility under floodlights. 
                Unlike limited overs, the bowling captain can opt for a **new ball after 80 overs**.
              </p>
            </div>

            <div className="card-glass p-3 border-white-05">
              <h3 className="h6 text-white fw-bold mb-2">📋 Follow-On Rule</h3>
              <p className="small mb-0">
                In a 5-day Test, if the team batting second trails the first-innings score by <strong>200+ runs</strong>, 
                the leading captain can force them to bat again immediately (Follow-on).
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: EQUIPMENT & DIMENSIONS */}
        {activeTab === 'specs' && (
          <div>
            <h2 className="h5 text-white fw-bold mb-3"><span className="text-gradient">5. Factual Dimensions & Equipment Specs (Ratta Sheet)</span></h2>
            
            <div className="row g-4 mb-4">
              
              {/* Ball Specs */}
              <div className="col-md-6">
                <div className="card-glass p-3 border-white-05 h-100">
                  <h3 className="h6 text-white fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-circle-fill text-gradient"></i> Men's Cricket Ball
                  </h3>
                  <table className="table table-dark table-bordered table-striped small mb-0">
                    <tbody>
                      <tr>
                        <td><strong>Weight Range</strong></td>
                        <td>155.9 grams – 163.0 grams (approx. 5.5 – 5.75 ounces)</td>
                      </tr>
                      <tr>
                        <td><strong>Circumference</strong></td>
                        <td>22.4 cm – 22.9 cm (approx. 8.81 – 9.0 inches)</td>
                      </tr>
                      <tr>
                        <td><strong>Materials</strong></td>
                        <td>Cork core, layers of wool yarn, raised stitched leather seam.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bat Specs */}
              <div className="col-md-6">
                <div className="card-glass p-3 border-white-05 h-100">
                  <h3 className="h6 text-white fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-suit-spade-fill text-gradient"></i> Standard Cricket Bat
                  </h3>
                  <table className="table table-dark table-bordered table-striped small mb-0">
                    <tbody>
                      <tr>
                        <td><strong>Wood Type</strong></td>
                        <td>Willow wood (English Willow for professionals, Kashmir Willow)</td>
                      </tr>
                      <tr>
                        <td><strong>Max Width</strong></td>
                        <td>4.25 inches / 10.8 cm (108 mm)</td>
                      </tr>
                      <tr>
                        <td><strong>Max Length</strong></td>
                        <td>38.0 inches / 96.5 cm (965 mm)</td>
                      </tr>
                      <tr>
                        <td><strong>Parts</strong></td>
                        <td>Handle and Blade (MCC standards check wood-to-grain lines).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pitch & Wicket */}
              <div className="col-md-12">
                <div className="card-glass p-3 border-white-05">
                  <h3 className="h6 text-white fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-aspect-ratio text-gradient"></i> Pitch & Wicket Dimensions
                  </h3>
                  <div className="row g-3 small">
                    <div className="col-md-4">
                      <strong>Pitch Length:</strong> 22 yards / 20.12 metres (from wickets to wickets).
                    </div>
                    <div className="col-md-4">
                      <strong>Pitch Width:</strong> 10 feet / 3.05 metres.
                    </div>
                    <div className="col-md-4">
                      <strong>Stump Height:</strong> 28 inches / 71.1 cm above the ground.
                    </div>
                    <div className="col-md-12">
                      <strong>Crease Types:</strong> Bowling crease, Popping crease (batsman's safe line for run-outs/stumpings), and Return crease.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: LAWS & DISMISSALS */}
        {activeTab === 'rules' && (
          <div>
            <h2 className="h5 text-white fw-bold mb-3"><span className="text-gradient">6. Laws, Extras & 10 Dismissal Methods</span></h2>
            
            <div className="row g-4 mb-4">
              {/* Extras */}
              <div className="col-md-6">
                <div className="card-glass p-3 border-white-05 h-100">
                  <h3 className="h6 text-white fw-bold mb-2">📋 Deliveries & Extras (Illegal Runs)</h3>
                  <ul className="small mb-0 pl-3 d-flex flex-column gap-2" style={{ paddingLeft: '1.2rem' }}>
                    <li><strong>No-Ball:</strong> Foot oversteps crease or ball is full-toss above waist height. Awards 1 extra run, ball must be re-bowled, and triggers a **Free Hit** in limited overs.</li>
                    <li><strong>Wide:</strong> Ball is too far from batsman's reach. Awards 1 extra run and must be re-bowled.</li>
                    <li><strong>Bye & Leg Bye:</strong> Runs scored when ball passes the bat without contact (Bye) or hits pads/body (Leg Bye) while attempting a shot.</li>
                  </ul>
                </div>
              </div>

              {/* DRS */}
              <div className="col-md-6">
                <div className="card-glass p-3 border-white-05 h-100">
                  <h3 className="h6 text-white fw-bold mb-2">📡 DRS (Decision Review System)</h3>
                  <p className="small mb-2">Technology used to review on-field decisions. Core tech components:</p>
                  <ul className="small mb-0 pl-3 d-flex flex-column gap-1" style={{ paddingLeft: '1.2rem' }}>
                    <li><strong>Ball Tracking:</strong> Estimates ball path trajectory (pitching, impact, hitting stumps) for LBW reviews.</li>
                    <li><strong>UltraEdge:</strong> Audio sensors capture sound spikes to verify if ball brushed bat/glove.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-glass p-3 border-white-05 mb-4">
              <h3 className="h6 text-white fw-bold mb-3">🏏 The 10 Methods of Dismissal</h3>
              <div className="row g-2 small">
                {[
                  { name: '1. Bowled', desc: 'Ball hits stumps and dislodges bails directly.' },
                  { name: '2. Caught', desc: 'Fielder catches the ball in the air before it bounces.' },
                  { name: '3. LBW (Leg Before Wicket)', desc: 'Ball hits pad/body in line with stumps, which would have hit wickets if not blocked.' },
                  { name: '4. Run Out', desc: 'Wickets broken by fielder while batsman is running outside popping crease.' },
                  { name: '5. Stumped', desc: 'Keeper dislodges bails when batsman leaves crease to play ball without attempting a run.' },
                  { name: '6. Hit Wicket', desc: 'Batsman accidentally breaks wickets with bat/body while playing a shot.' },
                  { name: '7. Hit Ball Twice', desc: 'Accidentally hitting the ball twice to score runs (excluding defending stumps).' },
                  { name: '8. Obstructing the Field', desc: 'Accidentally or intentionally blocking fielders or paths.' },
                  { name: '9. Timed Out', desc: 'New batsman takes more than 3 minutes (or 2 mins in T20) to reach crease.' },
                  { name: '10. Retired Out', desc: 'Batsman leaves the field without umpire permission or injury justification.' }
                ].map((item, idx) => (
                  <div className="col-md-6 col-lg-4" key={idx}>
                    <div className="p-2 rounded bg-dark-card border border-white-05 h-100">
                      <strong className="text-white d-block mb-1">{item.name}</strong>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: HR Q&A FAQS */}
        {activeTab === 'faq' && (
          <div>
            <h2 className="h5 text-white fw-bold mb-3"><span className="text-gradient">7. Most Likely Interview Questions & Answers</span></h2>
            
            <div className="d-flex flex-column gap-4 small mb-4">
              
              <div className="card-glass p-3 border-white-05">
                <strong className="text-white d-block mb-1">Q. How do you describe your cricket interest in an interview?</strong>
                <span className="text-muted leading-relaxed">
                  "I follow cricket across IPL and international T20, ODI, and Test formats. I particularly enjoy analyzing team strategies, player match-ups, batting partnerships, bowling variations (like yorkers or googly spin), and how the tactical approach shifts between limited-overs formats and the multi-day Test matches."
                </span>
              </div>

              <div className="card-glass p-3 border-white-05">
                <strong className="text-white d-block mb-1">Q. What is the difference between IPL and T20 International?</strong>
                <span className="text-muted leading-relaxed">
                  "T20 International matches are played between sovereign national teams representing their countries. IPL is a franchise-based T20 league where privately owned city teams compete, allowing international and domestic players to share the same squad."
                </span>
              </div>

              <div className="card-glass p-3 border-white-05">
                <strong className="text-white d-block mb-1">Q. Explain the physical weight and sizing of a cricket ball?</strong>
                <span className="text-muted leading-relaxed">
                  "A standard men's cricket ball weighs between 155.9 and 163.0 grams, and has a circumference of 22.4 to 22.9 centimetres. It uses a cork core, yarn layers, and stitched leather."
                </span>
              </div>

              <div className="card-glass p-3 border-white-05">
                <strong className="text-white d-block mb-1">Q. unexpected tech analogy: How does TCP connection establishment resemble cricket?</strong>
                <span className="text-muted leading-relaxed">
                  "Just like a TCP 3-way handshake (SYN, SYN-ACK, ACK) establishes a reliable channel before transmitting data, a batsman and bowler establish boundary boundaries through mutual play. The bowler throws the ball (SYN), the batsman taps/defends it (SYN-ACK), and the fielders position themselves (ACK) to initiate the active play cycle. Also, DRS ball-tracking acts like parity checks or checksums to verify packet integrity (decision accuracy)."
                </span>
              </div>

              <div className="card-glass p-3 border-white-05">
                <strong className="text-white d-block mb-2">Q. What has cricket taught you that helps in software engineering?</strong>
                <p className="text-muted mb-0 leading-relaxed">
                  "Cricket has taught me <strong>patience, teamwork, and situational adaptability</strong>. 
                  In Test cricket, you plan session-by-session and build partnerships. Similarly, in software development, 
                  complex debugging and clean system designs cannot be rushed; they require careful analysis, collaborative pairings, 
                  and the patience to see long-term strategies succeed."
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
      
      {/* Footer / Back link */}
      <div className="d-flex justify-content-end mt-4 border-top border-white-10 pt-3 d-print-none">
        <button onClick={onClose} className="btn btn-primary-gradient px-4 py-2 rounded-3 btn-sm">
          Return to Portfolio
        </button>
      </div>

    </div>
  );
};

export default CricketRevisionSheet;
