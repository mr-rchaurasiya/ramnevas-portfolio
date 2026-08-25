import React, { createContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on boot
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedToken && savedEmail) {
      setToken(savedToken);
      setUserEmail(savedEmail);
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      setUserEmail(data.email);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminEmail', data.email);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.message);
      return { success: false, message: error.message };
    }
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, login, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
