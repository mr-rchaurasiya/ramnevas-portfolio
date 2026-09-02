import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!email || !password) {
      setErrorMsg('Please provide all fields');
      return;
    }
    
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setErrorMsg(result.message || 'Invalid email or password');
    }
  };

  return (
    <main className="min-vh-100 bg-dark-base d-flex align-items-center justify-content-center py-5 px-3 position-relative">
      {/* Visual Blobs */}
      <div className="bg-blob blob-cyan"></div>
      <div className="bg-blob blob-purple"></div>

      <div className="card-glass p-5 w-100 shadow-2xl" style={{ maxWidth: '420px' }}>
        <h1 className="text-center text-white fw-bold mb-2 h3">Admin Portal</h1>
        <p className="text-center text-muted small mb-4">Please log in to manage your portfolio</p>
        
        {errorMsg && (
          <div className="alert alert-danger border-0 bg-danger-subtle text-danger small py-2 px-3 mb-4 rounded-3 text-center">
            {errorMsg}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white-50 small fw-semibold">Email Address</label>
            <input 
              type="email" 
              className="form-control form-control-custom"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label text-white-50 small fw-semibold mb-0">Password</label>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-link p-0 text-decoration-none text-info small"
                style={{ fontSize: '0.8rem' }}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} me-1`}></i>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="position-relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="form-control form-control-custom pe-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary-gradient w-100 py-3"
            disabled={submitting}
          >
            {submitting ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <a href="/" className="small text-white-50 hover:text-white text-decoration-none">
            <i className="bi bi-arrow-left me-1"></i> Return to Homepage
          </a>
        </div>
      </div>
    </main>
  );
};

export default Login;
