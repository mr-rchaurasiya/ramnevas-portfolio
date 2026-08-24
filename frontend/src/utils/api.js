import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
          setData(result);
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
