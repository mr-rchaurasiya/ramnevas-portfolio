import { useState, useEffect } from 'react';

// Determine the API base URL dynamically to support local network mobile testing
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  return `http://${hostname}:5000/api`;
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Helper function to fetch data from Express backend
 * @param {string} endpoint - API route suffix (e.g. 'projects', 'skills')
 */
export const fetchPortfolioData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in fetchPortfolioData for '${endpoint}':`, error.message);
    throw error;
  }
};

/**
 * Custom React Hook to load data from backend with a local fallback
 * @param {string} endpoint - API route suffix
 * @param {any} fallbackData - Backup configuration constants
 */
export const useFetchData = (endpoint, fallbackData) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const result = await fetchPortfolioData(endpoint);
        if (isMounted) {
          const isEmpty = !result || 
                          (Array.isArray(result) && result.length === 0) ||
                          (typeof result === 'object' && Object.keys(result).length === 0);
          
          if (isEmpty) {
            setData(fallbackData);
          } else {
            setData(result);
          }
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          // Fall back to the provided local configuration
          setData(fallbackData);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
};
