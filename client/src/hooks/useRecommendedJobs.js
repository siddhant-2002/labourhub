import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update with your backend URL

// API functions
const getRecommendations = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/recommend`, { userId: userId });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};



// const sendSMS = async (userId, jobId) => {
//     try {
//         const response = await axios.post(`${API_URL}/send_sms`, { userId: userId, jobId: jobId });
//         return response.data;
//     } catch (error) {
//         console.error('Error sending SMS:', error);
//         throw error;
//     }
// };

// Hook for recommended jobs
export const useRecommendedJobs = (userId) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        setLoading(true);
        const data = await getRecommendations(userId);
        // console.log(data)
        // sendSMS();
        setJobs(data);
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