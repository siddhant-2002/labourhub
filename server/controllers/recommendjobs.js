const axios = require('axios');
// const { Client } = require('twilio');

const FLASK_API_URL = process.env.FLASK_API_URL;
// const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
// const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
// const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// const twilioClient = new Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const getRecommendations = async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_URL}/recommend`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recommendations' });
    }
};

const sendSMS = async (req, res) => {
    const { worker_id, job_id } = req.body;

    try {
        const response = await axios.post(`${FLASK_API_URL}/send_sms`, { worker_id, job_id });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error sending SMS' });
    }
};

module.exports = {
    getRecommendations,
    sendSMS
};