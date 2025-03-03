const axios = require('axios');
require('dotenv').config();

const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000';

/**
 * Get job recommendations for a worker
 */
const getRecommendations = async (req, res) => {
    try {
        const { userId } = req.body;
        // console.log(userId)
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        
        // Call the Flask API for recommendations
        const response = await axios.post(`${FLASK_API_URL}/recommend`, { 
            worker_id: userId 
        });
        
        res.json(response.data);
        // console.log(response.data)
    } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        res.status(500).json({ 
            error: 'Error fetching recommendations',
            details: error.message 
        });
    }
};

/**
 * Send SMS notification about a job to a worker
 */
const sendSMS = async (req, res) => {
    try {
        const { userId, jobId } = req.body;
        
        
        if (!userId || !jobId) {
            return res.status(400).json({ error: 'worker_id and job_id are required' });
        }
        console.log(userId,jobId)

        const worker_id=userId;
        const job_id=jobId;

        const response = await axios.post(`${FLASK_API_URL}/send_sms`, { 
            worker_id, 
            job_id 
        });
        
        res.json(response.data);
    } catch (error) {
        console.error('Error sending SMS:', error.message);
        res.status(500).json({ 
            error: 'Error sending SMS',
            details: error.message 
        });
    }
};

module.exports = {
    getRecommendations,
    sendSMS
};