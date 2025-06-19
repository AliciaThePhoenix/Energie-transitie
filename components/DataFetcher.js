import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function useDataFetcher(initialParams = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  // Load saved preferences from cookies
  useEffect(() => {
    const savedParams = Cookies.get('dashboard-preferences');
    if (savedParams) {
      try {
        const parsed = JSON.parse(savedParams);
        setParams(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Error parsing saved preferences:', e);
      }
    }
  }, []);

  // Save preferences to cookies when params change
  useEffect(() => {
    Cookies.set('dashboard-preferences', JSON.stringify(params), { expires: 30 });
  }, [params]);

  const fetchData = async (newParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams({
        ...params,
        ...newParams
      });
      
      const response = await fetch(`/api/data?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setData(result);
      } else {
        throw new Error(result.message || 'Unknown error');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateParams = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  const refreshData = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    params,
    updateParams,
    refreshData,
    fetchData
  };
} 