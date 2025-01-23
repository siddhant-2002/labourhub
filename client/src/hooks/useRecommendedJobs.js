import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useRecommendedJobs = (userId) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        setLoading(true);
        const recommendedJobs = await apiService.getRecommendedJobs(userId);
        setJobs(recommendedJobs);
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