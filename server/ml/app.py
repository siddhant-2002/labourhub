from flask import Flask, render_template, request, jsonify
import requests
from utils.knn import recommend_jobs
from twilio.rest import Client
import os

from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)

# Backend API URLs
WORKERS_API_URL = 'http://localhost:3000/workers/all'
JOBS_API_URL = 'http://localhost:3000/jobs/all'

TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

# Initialize Twilio client
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def fetch_workers():
    response = requests.get(WORKERS_API_URL)
    response.raise_for_status()
    return response.json()

def fetch_jobs():
    response = requests.get(JOBS_API_URL)
    response.raise_for_status()
    return response.json()

@app.route('/')
def home():
    workers = fetch_workers()
    return render_template('index.html', workers=workers)

@app.route('/recommend', methods=['POST'])
def recommend():
    worker_id = int(request.json['worker_id'])
    workers = fetch_workers()
    jobs = fetch_jobs()
    selected_worker = next(w for w in workers if w['worker_id'] == worker_id)
    recommended_jobs = recommend_jobs(selected_worker, jobs)
    return jsonify(recommended_jobs)

@app.route('/send_sms', methods=['POST'])
def send_sms():
    worker_id = int(request.json['worker_id'])
    job_id = int(request.json['job_id'])

    workers = fetch_workers()
    jobs = fetch_jobs()

    # Find worker and job
    selected_worker = next(w for w in workers if w['worker_id'] == worker_id)
    selected_job = next(j for j in jobs if j['job_id'] == job_id)

    # Send SMS
    message = twilio_client.messages.create(
        body=f"Job Recommendation:\n"
             f"Location: {selected_job['location']}\n"
             f"Provider: {selected_job['provider_name']}\n"
             f"Contact: {selected_job['provider_contact']}\n"
             f"Description: {selected_job['description']}",
        from_=TWILIO_PHONE_NUMBER,
        to=selected_worker['mobile']
    )

    return jsonify({"status": "SMS sent!", "message_sid": message.sid})

if __name__ == '__main__':
    app.run(debug=True)