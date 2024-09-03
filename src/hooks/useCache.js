import { useState, useEffect, useCallback } from 'react';

const useCache = (key, fetchFunction, expirationTime = 3600000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const cachedData = localStorage.getItem(key);
      if (cachedData) {
        const { value, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < expirationTime) {
          setData(value);
          setLoading(false);
          return;
        }
      }

      const result = await fetchFunction();
      localStorage.setItem(key, JSON.stringify({ value: result, timestamp: Date.now() }));
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFunction, expirationTime]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useCache;