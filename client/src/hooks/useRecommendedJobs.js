import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://api.labourhub.com/v1'; // Replace with actual API URL

export const useRecommendedJobs = (userId) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/recommended-jobs`);
        setJobs(response.data.jobs);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recommended jobs');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecommendedJobs();
    }
  }, [userId]);

  return { jobs, loading, error };
};