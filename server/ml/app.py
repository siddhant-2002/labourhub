from flask import Flask, request, jsonify
import requests
from utils.knn import recommend_jobs
from twilio.rest import Client
import os
import json
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

# Backend API URLs - updated to match your Express routes
WORKERS_API_URL = 'http://localhost:3000/workers/all'
JOBS_API_URL = 'http://localhost:3000/jobs/all'

# Twilio Configuration
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

# Initialize Twilio client
twilio_client = None
if TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN:
    try:
        twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    except Exception as e:
        print(f"Twilio client initialization error: {e}")

def fetch_workers():
    """Fetch all workers from the backend API"""
    try:
        response = requests.get(WORKERS_API_URL)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching workers: {e}")
        return []

def fetch_jobs():
    """Fetch all jobs from the backend API"""
    try:
        response = requests.get(JOBS_API_URL)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching jobs: {e}")
        return []

def get_worker_by_id(worker_id):
    """Get worker details by ID from the API"""
    workers = fetch_workers()
    for worker in workers:
        if str(worker.get('_id')) == str(worker_id):
            return worker
    return None

def get_job_by_id(job_id):
    """Get job details by ID from the API"""
    jobs = fetch_jobs()
    for job in jobs:
        if str(job.get('_id')) == str(job_id):
            return job
    return None


@app.route('/')
def index():
    return "Welcome to the Job Recommendation System API"
@app.route('/recommend', methods=['POST'])
def recommend():
    """API endpoint to get job recommendations for a worker"""
    try:
        data = request.json
        worker_id = data.get('worker_id')
        
        if not worker_id:
            return jsonify({"error": "worker_id is required"}), 400
            
        workers = fetch_workers()
        jobs = fetch_jobs()
        
        # Find worker by MongoDB ID
        selected_worker = get_worker_by_id(worker_id)
        
        if not selected_worker:
            return jsonify({"error": "Worker not found"}), 404
            
        # Get personal info to access skills
        try:
            personal_info_url = f"http://localhost:3000/personalinfo?userId={worker_id}"
            personal_info_response = requests.get(personal_info_url)
            personal_info_response.raise_for_status()
            personal_info = personal_info_response.json()
            
            # Check if personal_info is array and has at least one element
            if isinstance(personal_info, list) and len(personal_info) > 0:
                # Add skills from personal info to worker object
                selected_worker['skills'] = personal_info[0].get('skills', [])
            else:
                selected_worker['skills'] = []
                
        except Exception as e:
            print(f"Error fetching personal info: {e}")
            selected_worker['skills'] = []
        
        # Get job recommendations
        recommended_jobs = recommend_jobs(selected_worker, jobs)
        return jsonify(recommended_jobs)
        
    except Exception as e:
        print(f"Recommendation error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/send_sms', methods=['POST'])
def send_sms():
    """Send SMS notification about job to worker"""
    try:
        data = request.json
        worker_id = data.get('worker_id')
        job_id = data.get('job_id')
        
        if not worker_id or not job_id:
            return jsonify({"error": "worker_id and job_id are required"}), 400
            
        if not twilio_client:
            return jsonify({"error": "Twilio client not configured"}), 500
            
        # Get worker and job details
        worker = get_worker_by_id(worker_id)
        job = get_job_by_id(job_id)
        
        if not worker:
            return jsonify({"error": "Worker not found"}), 404
            
        if not job:
            return jsonify({"error": "Job not found"}), 404
            
        # Get worker's phone number
        phone_number = worker.get('phone')
        if not phone_number:
            return jsonify({"error": "Worker phone number not found"}), 404
            
        # Send SMS notification
        message = twilio_client.messages.create(
            body=f"Job Recommendation:\n"
                 f"Title: {job.get('jobTitle', 'N/A')}\n"
                 f"Location: {job.get('jobLocation', 'N/A')}\n"
                 f"Salary: {job.get('salary', 'N/A')}\n"
                 f"Description: {job.get('jobdescription', 'N/A')}",
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        
        return jsonify({"status": "SMS sent!", "message_sid": message.sid})
        
    except Exception as e:
        print(f"SMS error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)