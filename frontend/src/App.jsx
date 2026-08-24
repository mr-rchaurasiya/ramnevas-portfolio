import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Performance Optimization: Lazy load heavy admin-only pages
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Subtle loader for lazy loaded components
const PageLoader = () => (
  <div className="min-vh-100 bg-dark-base d-flex justify-content-center align-items-center">
    <div className="spinner-border text-info" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function AppContent() {
  const location = useLocation();
  
  // Exclude main layout headers/footers on admin control segments
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark-base">
      {!isAdminRoute && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
