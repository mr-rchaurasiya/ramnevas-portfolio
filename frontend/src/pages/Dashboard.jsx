import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const { token, logout, userEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');

  // Unified data states
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch all data helper
  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const pRes = await fetch(`${API_BASE_URL}/projects`);
      const expRes = await fetch(`${API_BASE_URL}/experience`);
      const eduRes = await fetch(`${API_BASE_URL}/education`);
      const skRes = await fetch(`${API_BASE_URL}/skills`);
      const achRes = await fetch(`${API_BASE_URL}/achievements`);
      const resRes = await fetch(`${API_BASE_URL}/resume`);

      if (pRes.ok) setProjects(await pRes.json());
      if (expRes.ok) setExperience(await expRes.json());
      if (eduRes.ok) setEducation(await eduRes.json());
      if (skRes.ok) setSkills(await skRes.json());
      if (achRes.ok) setAchievements(await achRes.json());
      if (resRes.ok) setResume(await resRes.json());
    } catch (err) {
      setErrorMsg('Error loading database. Make sure local MongoDB is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  /* =========================================================================
     CRUD SUB-HANDLERS (Projects, Experience, Education, Skills, Achievements, Resume)
     ========================================================================= */

  // Helper helper to make secure state modifications
  const makeSecureRequest = async (url, method, body = null) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      if (body) {
        config.body = JSON.stringify(body);
      }
      const res = await fetch(url, config);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Operation failed');
      }
      setSuccessMsg('Operation completed successfully!');
      fetchData();
      return { success: true, data };
    } catch (err) {
      setErrorMsg(err.message);
      return { success: false };
    }
  };

  // --- 1. PROJECTS ---
  const [projectForm, setProjectForm] = useState({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(t => t)
    };
    let url = `${API_BASE_URL}/projects`;
    let method = 'POST';
    if (editingProjectId) {
      url = `${API_BASE_URL}/projects/${editingProjectId}`;
      method = 'PUT';
    }
    const res = await makeSecureRequest(url, method, payload);
    if (res.success) {
      setProjectForm({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
      setEditingProjectId(null);
    }
  };

  const handleProjectEdit = (p) => {
    setEditingProjectId(p._id);
    setProjectForm({
      title: p.title,
      description: p.description,
      technologies: p.technologies.join(', '),
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || ''
    });
  };

  const handleProjectDelete = (id) => {
    if (window.confirm('Delete this project?')) {
      makeSecureRequest(`${API_BASE_URL}/projects/${id}`, 'DELETE');
    }
  };

  // --- 2. EXPERIENCE ---
  const [expForm, setExpForm] = useState({ company: '', role: '', startDate: '', endDate: '', description: '', technologies: '' });
  const [editingExpId, setEditingExpId] = useState(null);

  const handleExpSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...expForm,
      technologies: expForm.technologies ? expForm.technologies.split(',').map(t => t.trim()).filter(t => t) : []
    };
    let url = `${API_BASE_URL}/experience`;
    let method = 'POST';
    if (editingExpId) {
      url = `${API_BASE_URL}/experience/${editingExpId}`;
      method = 'PUT';
    }
    const res = await makeSecureRequest(url, method, payload);
    if (res.success) {
      setExpForm({ company: '', role: '', startDate: '', endDate: '', description: '', technologies: '' });
      setEditingExpId(null);
    }
  };

  const handleExpEdit = (exp) => {
    setEditingExpId(exp._id);
    setExpForm({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      technologies: exp.technologies ? exp.technologies.join(', ') : ''
    });
  };

  const handleExpDelete = (id) => {
    if (window.confirm('Delete experience record?')) {
      makeSecureRequest(`${API_BASE_URL}/experience/${id}`, 'DELETE');
    }
  };

  // --- 3. EDUCATION ---
  const [eduForm, setEduForm] = useState({ degree: '', institution: '', startYear: '', endYear: '' });
  const [editingEduId, setEditingEduId] = useState(null);

  const handleEduSubmit = async (e) => {
    e.preventDefault();
    let url = `${API_BASE_URL}/education`;
    let method = 'POST';
    if (editingEduId) {
      url = `${API_BASE_URL}/education/${editingEduId}`;
      method = 'PUT';
    }
    const res = await makeSecureRequest(url, method, eduForm);
    if (res.success) {
      setEduForm({ degree: '', institution: '', startYear: '', endYear: '' });
      setEditingEduId(null);
    }
  };

  const handleEduEdit = (edu) => {
    setEditingEduId(edu._id);
    setEduForm({
      degree: edu.degree,
      institution: edu.institution,
      startYear: edu.startYear,
      endYear: edu.endYear
    });
  };

  const handleEduDelete = (id) => {
    if (window.confirm('Delete education record?')) {
      makeSecureRequest(`${API_BASE_URL}/education/${id}`, 'DELETE');
    }
  };

  // --- 4. SKILLS ---
  const [skillForm, setSkillForm] = useState({ category: 'Programming Languages', name: '' });
  const [editingSkillId, setEditingSkillId] = useState(null);

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    let url = `${API_BASE_URL}/skills`;
    let method = 'POST';
    if (editingSkillId) {
      url = `${API_BASE_URL}/skills/${editingSkillId}`;
      method = 'PUT';
    }
    const res = await makeSecureRequest(url, method, skillForm);
    if (res.success) {
      setSkillForm({ category: 'Programming Languages', name: '' });
      setEditingSkillId(null);
    }
  };

  const handleSkillDelete = (id) => {
    if (window.confirm('Delete skill?')) {
      makeSecureRequest(`${API_BASE_URL}/skills/${id}`, 'DELETE');
    }
  };

  // --- 5. ACHIEVEMENTS ---
  const [achForm, setAchForm] = useState({ title: '', description: '' });
  const [editingAchId, setEditingAchId] = useState(null);

  const handleAchSubmit = async (e) => {
    e.preventDefault();
    let url = `${API_BASE_URL}/achievements`;
    let method = 'POST';
    if (editingAchId) {
      url = `${API_BASE_URL}/achievements/${editingAchId}`;
      method = 'PUT';
    }
    const res = await makeSecureRequest(url, method, achForm);
    if (res.success) {
      setAchForm({ title: '', description: '' });
      setEditingAchId(null);
    }
  };

  const handleAchEdit = (ach) => {
    setEditingAchId(ach._id);
    setAchForm({
      title: ach.title,
      description: ach.description
    });
  };

  const handleAchDelete = (id) => {
    if (window.confirm('Delete achievement?')) {
      makeSecureRequest(`${API_BASE_URL}/achievements/${id}`, 'DELETE');
    }
  };

  // --- 6. RESUME ---
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setErrorMsg('Please select a PDF file first');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');
    setUploadingResume(true);

    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const res = await fetch(`${API_BASE_URL}/resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Resume upload failed');
      }
      setSuccessMsg('Resume replaced successfully!');
      setResumeFile(null);
      document.getElementById('resumeFileInput').value = '';
      fetchData();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setUploadingResume(false);
    }
  };

  return (
    <main className="min-vh-100 bg-dark-base pt-5 pb-5 px-3">
      <div className="container mt-5">
        
        {/* Header Block */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 border-bottom pb-4 mb-4 border-white-10">
          <div>
            <h1 className="text-white fw-bold h2 mb-0">Admin Dashboard</h1>
            <span className="small text-muted">Loggged in as: {userEmail}</span>
          </div>
          <div className="d-flex gap-2">
            <a href="/" className="btn btn-outline-custom">View Website</a>
            <button onClick={handleLogoutClick} className="btn btn-danger px-4">Logout</button>
          </div>
        </div>

        {/* Global Notifications */}
        {errorMsg && (
          <div className="alert alert-danger border-0 bg-danger-subtle text-danger p-3 mb-4 rounded-3 text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="alert alert-success border-0 bg-success-subtle text-success p-3 mb-4 rounded-3 text-center">
            {successMsg}
          </div>
        )}

        {/* Main Workspace */}
        <div className="row g-4">
          
          {/* Sidebar Navigation */}
          <div className="col-lg-3">
            <div className="card-glass p-3 d-flex flex-column gap-2 dashboard-nav-container">
              {[
                { id: 'overview', label: 'Overview', icon: 'bi-speedometer2' },
                { id: 'projects', label: 'Projects', icon: 'bi-code-square' },
                { id: 'experience', label: 'Experience', icon: 'bi-briefcase' },
                { id: 'education', label: 'Education', icon: 'bi-mortarboard' },
                { id: 'skills', label: 'Skills', icon: 'bi-patch-check' },
                { id: 'achievements', label: 'Achievements', icon: 'bi-trophy' },
                { id: 'resume', label: 'Resume', icon: 'bi-file-pdf' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`btn text-start d-flex align-items-center gap-3 py-2 px-3 border-0 rounded-3 ${
                    activeTab === tab.id ? 'btn-primary-gradient text-white' : 'text-white-50 hover:text-white bg-transparent'
                  }`}
                >
                  <i className={`bi ${tab.icon}`}></i> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Data Grid Panes */}
          <div className="col-lg-9">
            <div className="card-glass p-4">
              
              {loading && activeTab !== 'resume' ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-info" role="status"></div>
                  <p className="text-muted small mt-3 mb-0">Refreshing data...</p>
                </div>
              ) : (
                <>
                  {/* OVERVIEW PANEL */}
                  {activeTab === 'overview' && (
                    <div>
                      <h2 className="h4 text-white fw-bold mb-4">Database Overview</h2>
                      <div className="row g-3">
                        {[
                          { label: 'Projects', count: projects.length, icon: 'bi-code-square' },
                          { label: 'Experience', count: experience.length, icon: 'bi-briefcase' },
                          { label: 'Education', count: education.length, icon: 'bi-mortarboard' },
                          { label: 'Skills', count: skills.length, icon: 'bi-patch-check' },
                          { label: 'Achievements', count: achievements.length, icon: 'bi-trophy' }
                        ].map((stat, i) => (
                          <div className="col-6 col-md-4" key={i}>
                            <div className="p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3 text-center">
                              <i className={`bi ${stat.icon} text-gradient fs-2 mb-2 d-block`}></i>
                              <span className="display-6 fw-bold text-white d-block mb-1">{stat.count}</span>
                              <span className="small text-muted">{stat.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PROJECTS PANEL */}
                  {activeTab === 'projects' && (
                    <div>
                      <h2 className="h4 text-white fw-bold mb-4">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>
                      <form onSubmit={handleProjectSubmit} className="row g-3 mb-5 p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3">
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Title *</label>
                          <input type="text" className="form-control form-control-custom" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Technologies (Comma separated) *</label>
                          <input type="text" className="form-control form-control-custom" value={projectForm.technologies} onChange={e => setProjectForm({ ...projectForm, technologies: e.target.value })} placeholder="React, Node.js" required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">GitHub URL</label>
                          <input type="text" className="form-control form-control-custom" value={projectForm.githubUrl} onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Live URL</label>
                          <input type="text" className="form-control form-control-custom" value={projectForm.liveUrl} onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })} />
                        </div>
                        <div className="col-12">
                          <label className="form-label small text-white-50">Description *</label>
                          <textarea rows="3" className="form-control form-control-custom" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required></textarea>
                        </div>
                        <div className="col-12 mt-4 text-end">
                          {editingProjectId && (
                            <button type="button" className="btn btn-outline-custom btn-sm me-2" onClick={() => { setEditingProjectId(null); setProjectForm({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' }); }}>Cancel</button>
                          )}
                          <button type="submit" className="btn btn-primary-gradient btn-sm px-4">{editingProjectId ? 'Save Updates' : 'Add Project'}</button>
                        </div>
                      </form>

                      <h3 className="h5 text-white fw-bold mb-3 border-bottom pb-2 border-white-10">Current Projects ({projects.length})</h3>
                      <div className="d-flex flex-column gap-3">
                        {projects.map(p => (
                          <div className="p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3 d-flex justify-content-between align-items-start" key={p._id}>
                            <div>
                              <h4 className="h6 text-white fw-bold mb-1">{p.title}</h4>
                              <p className="small text-muted mb-0">{p.description}</p>
                            </div>
                            <div className="d-flex gap-2">
                              <button onClick={() => handleProjectEdit(p)} className="btn btn-sm btn-outline-custom py-1"><i className="bi bi-pencil"></i></button>
                              <button onClick={() => handleProjectDelete(p._id)} className="btn btn-sm btn-danger py-1"><i className="bi bi-trash"></i></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EXPERIENCE PANEL */}
                  {activeTab === 'experience' && (
                    <div>
                      <h2 className="h4 text-white fw-bold mb-4">{editingExpId ? 'Edit Experience' : 'Add Experience'}</h2>
                      <form onSubmit={handleExpSubmit} className="row g-3 mb-5 p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3">
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Company *</label>
                          <input type="text" className="form-control form-control-custom" value={expForm.company} onChange={e => setExpForm({ ...expForm, company: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Role / Title *</label>
                          <input type="text" className="form-control form-control-custom" value={expForm.role} onChange={e => setExpForm({ ...expForm, role: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Start Date (e.g. June 2023) *</label>
                          <input type="text" className="form-control form-control-custom" value={expForm.startDate} onChange={e => setExpForm({ ...expForm, startDate: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">End Date (e.g. August 2023 or Present) *</label>
                          <input type="text" className="form-control form-control-custom" value={expForm.endDate} onChange={e => setExpForm({ ...expForm, endDate: e.target.value })} required />
                        </div>
                        <div className="col-12">
                          <label className="form-label small text-white-50">Technologies (Comma separated)</label>
                          <input type="text" className="form-control form-control-custom" value={expForm.technologies} onChange={e => setExpForm({ ...expForm, technologies: e.target.value })} placeholder="React, Node.js" />
                        </div>
                        <div className="col-12">
                          <label className="form-label small text-white-50">Description *</label>
                          <textarea rows="3" className="form-control form-control-custom" value={expForm.description} onChange={e => setExpForm({ ...expForm, description: e.target.value })} required></textarea>
                        </div>
                        <div className="col-12 mt-4 text-end">
                          {editingExpId && (
                            <button type="button" className="btn btn-outline-custom btn-sm me-2" onClick={() => { setEditingExpId(null); setExpForm({ company: '', role: '', startDate: '', endDate: '', description: '', technologies: '' }); }}>Cancel</button>
                          )}
                          <button type="submit" className="btn btn-primary-gradient btn-sm px-4">{editingExpId ? 'Save' : 'Add'}</button>
                        </div>
                      </form>

                      <h3 className="h5 text-white fw-bold mb-3 border-bottom pb-2 border-white-10">Experience History ({experience.length})</h3>
                      <div className="d-flex flex-column gap-3">
                        {experience.map(exp => (
                          <div className="p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3 d-flex justify-content-between align-items-start" key={exp._id}>
                            <div>
                              <h4 className="h6 text-white fw-bold mb-1">{exp.role} @ {exp.company}</h4>
                              <span className="small text-gradient fw-semibold d-block mb-1">{exp.duration || `${exp.startDate} - ${exp.endDate}`}</span>
                              <p className="small text-muted mb-0">{exp.description}</p>
                            </div>
                            <div className="d-flex gap-2">
                              <button onClick={() => handleExpEdit(exp)} className="btn btn-sm btn-outline-custom py-1"><i className="bi bi-pencil"></i></button>
                              <button onClick={() => handleExpDelete(exp._id)} className="btn btn-sm btn-danger py-1"><i className="bi bi-trash"></i></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EDUCATION PANEL */}
                  {activeTab === 'education' && (
                    <div>
                      <h2 className="h4 text-white fw-bold mb-4">{editingEduId ? 'Edit Education' : 'Add Education'}</h2>
                      <form onSubmit={handleEduSubmit} className="row g-3 mb-5 p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3">
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Degree / Course *</label>
                          <input type="text" className="form-control form-control-custom" value={eduForm.degree} onChange={e => setEduForm({ ...eduForm, degree: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Institution / University *</label>
                          <input type="text" className="form-control form-control-custom" value={eduForm.institution} onChange={e => setEduForm({ ...eduForm, institution: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Start Year (e.g. 2020) *</label>
                          <input type="text" className="form-control form-control-custom" value={eduForm.startYear} onChange={e => setEduForm({ ...eduForm, startYear: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Graduation Year (e.g. 2024) *</label>
                          <input type="text" className="form-control form-control-custom" value={eduForm.endYear} onChange={e => setEduForm({ ...eduForm, endYear: e.target.value })} required />
                        </div>
                        <div className="col-12 mt-4 text-end">
                          {editingEduId && (
                            <button type="button" className="btn btn-outline-custom btn-sm me-2" onClick={() => { setEditingEduId(null); setEduForm({ degree: '', institution: '', startYear: '', endYear: '' }); }}>Cancel</button>
                          )}
                          <button type="submit" className="btn btn-primary-gradient btn-sm px-4">{editingEduId ? 'Save' : 'Add'}</button>
                        </div>
                      </form>

                      <h3 className="h5 text-white fw-bold mb-3 border-bottom pb-2 border-white-10">Academic Records ({education.length})</h3>
                      <div className="d-flex flex-column gap-3">
                        {education.map(edu => (
                          <div className="p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3 d-flex justify-content-between align-items-start" key={edu._id}>
                            <div>
                              <h4 className="h6 text-white fw-bold mb-1">{edu.degree}</h4>
                              <span className="small text-muted d-block">{edu.institution}</span>
                              <span className="small text-gradient fw-semibold">{edu.duration || `${edu.startYear} - ${edu.endYear}`}</span>
                            </div>
                            <div className="d-flex gap-2">
                              <button onClick={() => handleEduEdit(edu)} className="btn btn-sm btn-outline-custom py-1"><i className="bi bi-pencil"></i></button>
                              <button onClick={() => handleEduDelete(edu._id)} className="btn btn-sm btn-danger py-1"><i className="bi bi-trash"></i></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SKILLS PANEL */}
                  {activeTab === 'skills' && (
                    <div>
                      <h2 className="h4 text-white fw-bold mb-4">Add Skill</h2>
                      <form onSubmit={handleSkillSubmit} className="row g-3 mb-5 p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3">
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Category *</label>
                          <select className="form-select form-control-custom" value={skillForm.category} onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}>
                            <option value="Programming Languages">Programming Languages</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Databases">Databases</option>
                            <option value="Tools">Tools</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-white-50">Skill Name *</label>
                          <input type="text" className="form-control form-control-custom" value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} placeholder="React.js" required />
                        </div>
                        <div className="col-12 mt-4 text-end">
                          <button type="submit" className="btn btn-primary-gradient btn-sm px-4">Add Skill</button>
                        </div>
                      </form>

                      <h3 className="h5 text-white fw-bold mb-3 border-bottom pb-2 border-white-10">Current Skills ({skills.length})</h3>
                      <div className="row g-3">
                        {['Programming Languages', 'Frontend', 'Backend', 'Databases', 'Tools'].map(cat => (
                          <div className="col-md-6" key={cat}>
                            <div className="p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3 h-100">
                              <h4 className="h6 text-gradient fw-bold mb-3">{cat}</h4>
                              <div className="d-flex flex-wrap gap-2">
                                {skills.filter(s => s.category === cat).map(s => (
                                  <span key={s._id} className="badge bg-secondary-subtle text-secondary-emphasis small px-2 py-1 d-inline-flex align-items-center gap-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    {s.name}
                                    <i onClick={() => handleSkillDelete(s._id)} className="bi bi-x-circle text-danger cursor-pointer hover:text-white" style={{ cursor: 'pointer' }}></i>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ACHIEVEMENTS PANEL */}
                  {activeTab === 'achievements' && (
                    <div>
                      <h2 className="h4 text-white fw-bold mb-4">{editingAchId ? 'Edit Achievement' : 'Add Achievement'}</h2>
                      <form onSubmit={handleAchSubmit} className="row g-3 mb-5 p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3">
                        <div className="col-md-12">
                          <label className="form-label small text-white-50">Title *</label>
                          <input type="text" className="form-control form-control-custom" value={achForm.title} onChange={e => setAchForm({ ...achForm, title: e.target.value })} required />
                        </div>
                        <div className="col-12">
                          <label className="form-label small text-white-50">Description *</label>
                          <textarea rows="3" className="form-control form-control-custom" value={achForm.description} onChange={e => setAchForm({ ...achForm, description: e.target.value })} required></textarea>
                        </div>
                        <div className="col-12 mt-4 text-end">
                          {editingAchId && (
                            <button type="button" className="btn btn-outline-custom btn-sm me-2" onClick={() => { setEditingAchId(null); setAchForm({ title: '', description: '' }); }}>Cancel</button>
                          )}
                          <button type="submit" className="btn btn-primary-gradient btn-sm px-4">{editingAchId ? 'Save' : 'Add'}</button>
                        </div>
                      </form>

                      <h3 className="h5 text-white fw-bold mb-3 border-bottom pb-2 border-white-10">Achievements ({achievements.length})</h3>
                      <div className="d-flex flex-column gap-3">
                        {achievements.map(ach => (
                          <div className="p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3 d-flex justify-content-between align-items-start" key={ach._id}>
                            <div>
                              <h4 className="h6 text-white fw-bold mb-1">{ach.title}</h4>
                              <p className="small text-muted mb-0">{ach.description}</p>
                            </div>
                            <div className="d-flex gap-2">
                              <button onClick={() => handleAchEdit(ach)} className="btn btn-sm btn-outline-custom py-1"><i className="bi bi-pencil"></i></button>
                              <button onClick={() => handleAchDelete(ach._id)} className="btn btn-sm btn-danger py-1"><i className="bi bi-trash"></i></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RESUME PANEL */}
                  {activeTab === 'resume' && (
                    <div>
                      <h2 className="h4 text-white fw-bold mb-4">Manage Resume</h2>
                      <form onSubmit={handleResumeSubmit} className="p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3 mb-5">
                        <div className="mb-3">
                          <label className="form-label small text-white-50">Select Resume (PDF only, max 5MB) *</label>
                          <input 
                            id="resumeFileInput"
                            type="file" 
                            accept="application/pdf"
                            className="form-control form-control-custom"
                            onChange={e => setResumeFile(e.target.files[0])}
                            required 
                          />
                        </div>
                        <div className="mt-4 text-end">
                          <button 
                            type="submit" 
                            className="btn btn-primary-gradient btn-sm px-4"
                            disabled={uploadingResume}
                          >
                            {uploadingResume ? (
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            ) : (
                              'Upload and Replace Resume'
                            )}
                          </button>
                        </div>
                      </form>

                      {resume ? (
                        <div className="p-3 bg-dark bg-opacity-20 border border-white-10 rounded-3">
                          <h3 className="h6 text-white fw-bold mb-2">Active Resume Document</h3>
                          <span className="small text-muted d-block mb-1">File Name: {resume.fileName}</span>
                          <span className="small text-muted d-block mb-3">Uploaded At: {new Date(resume.uploadedAt).toLocaleString()}</span>
                          <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom btn-sm"><i className="bi bi-file-pdf me-2"></i>View Active CV</a>
                        </div>
                      ) : (
                        <div className="text-center py-4 bg-dark bg-opacity-20 border border-white-10 rounded-3">
                          <p className="text-muted mb-0 small">No active resume document has been uploaded to database.</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Dashboard;
