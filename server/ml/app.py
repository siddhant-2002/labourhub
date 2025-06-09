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
        
        # Add country code +91 if not present
        phone_number = selected_worker.get('phone')
        if not phone_number.startswith('+'):
            phone_number = '+91' + phone_number
            
        # Send SMS for each recommended job
        for job in recommended_jobs[:3]:  # Limit to top 3 recommendations
            try:
                message = twilio_client.messages.create(
                    body=f"New Job Recommendation:\n"
                         f"Title: {job.get('jobTitle', 'N/A')}\n"
                         f"Location: {job.get('jobLocation', 'N/A')}\n"
                         f"Salary: {job.get('salary', 'N/A')}\n"
                         f"Description: {job.get('jobdescription', 'N/A')}",
                    from_=TWILIO_PHONE_NUMBER,
                    to=phone_number
                )
                print(f"SMS sent for job {job.get('_id', 'N/A')}: {message.sid}")
            except Exception as e:
                print(f"Error sending SMS for job {job.get('_id', 'N/A')}: {e}")
                
        return jsonify(recommended_jobs)
        
    except Exception as e:
        print(f"Recommendation error: {e}")
        return jsonify({"error": str(e)}), 500
    

@app.route('/notify_workers', methods=['POST'])
def notify_workers():
    """Send SMS notifications to workers with matching skills for a new job"""
    try:
        data = request.json
        job_id = data.get('job_id')
        job_data = data.get('job_data')  # Get the job data that was just saved
        
        print("\n=== Starting Worker Notification ===")
        print(f"Received job_id: {job_id}")
        
        if not job_id:
            print("Error: No job_id provided")
            return jsonify({"error": "job_id is required"}), 400
            
        if not job_data:
            print("Error: No job data provided")
            return jsonify({"error": "job_data is required"}), 400
            
        # Use the job data directly instead of fetching it
        new_job = job_data
        print(f"Using job data: {json.dumps(new_job, indent=2)}")
        
        # Get all workers
        workers_response = requests.get(WORKERS_API_URL)
        if workers_response.status_code != 200:
            print("Error fetching workers")
            return jsonify({"error": "Failed to fetch workers"}), 500
            
        workers = workers_response.json()
        print(f"Found {len(workers)} workers")
        
        # Track notification results
        notified_count = 0
        errors = []
        
        # Check each worker's skills against the new job
        for worker in workers:
            try:
                print(f"\nChecking worker: {worker.get('name')} (ID: {worker.get('_id')})")
                
                # Get worker's personal info to access skills
                personal_info_url = f"http://localhost:3000/personalinfo?userId={worker.get('_id')}"
                personal_info_response = requests.get(personal_info_url)
                personal_info_response.raise_for_status()
                personal_info = personal_info_response.json()
                
                # Get skills from personal info
                worker_skills = []
                if isinstance(personal_info, list) and len(personal_info) > 0:
                    worker_skills = personal_info[0].get('skills', [])
                print(f"Worker skills from personal info: {worker_skills}")
                
                # Get job skills and title
                job_skills = new_job.get('skills', [])
                job_title = new_job.get('jobTitle', '').lower()
                
                # Check for any matching skills or job title match
                matching_skills = []
                
                # Check if any worker skill matches any job skill
                for worker_skill in worker_skills:
                    worker_skill_lower = worker_skill.lower()
                    # Check against job skills
                    if any(worker_skill_lower in job_skill.lower() or job_skill.lower() in worker_skill_lower 
                          for job_skill in job_skills):
                        matching_skills.append(worker_skill)
                    # Check if job title contains worker skill
                    if worker_skill_lower in job_title:
                        matching_skills.append(worker_skill)
                
                if matching_skills:
                    print(f"Found matching skills: {matching_skills}")
                    
                    # Get worker's phone number
                    phone = worker.get('phone')
                    if not phone:
                        print(f"Error: No phone number for worker {worker.get('name')}")
                        errors.append(f"No phone number for worker {worker.get('name')}")
                        continue
                    
                    # Format phone number
                    formatted_phone = validate_phone_number(phone)
                    if not formatted_phone:
                        print(f"Error: Invalid phone number format for worker {worker.get('name')}")
                        errors.append(f"Invalid phone number format for worker {worker.get('name')}")
                        continue
                    
                    print(f"Formatted phone number: {formatted_phone}")
                    
                    # Get job provider details
                    job_provider = new_job.get('jobProvider', {})
                    provider_phone = job_provider.get('phone', 'N/A')
                    
                    # Create concise message with job details
                    message_body = (
                        f"NEW JOB\n"
                        f"{new_job.get('jobTitle', 'N/A')}\n"
                        f"📍{new_job.get('jobLocation', {}).get('address', 'N/A')}\n"
                        f"💰₹{new_job.get('salary', 'N/A')}\n"
                        f"📞{provider_phone}\n"
                        f"Reply MORE for details"
                    )
                    
                    print(f"Attempting to send message to {formatted_phone}")
                    print(f"Message content: {message_body}")
                    
                    try:
                        message = twilio_client.messages.create(
                            body=message_body,
                            from_=TWILIO_PHONE_NUMBER,
                            to=formatted_phone
                        )
                        print(f"Message sent successfully! SID: {message.sid}")
                        notified_count += 1
                        
                    except Exception as e:
                        error_msg = str(e)
                        error_code = getattr(e, 'code', 'Unknown')
                        more_info = getattr(e, 'more_info', 'No additional info')
                        
                        print(f"Error sending message via Twilio: {error_msg}")
                        print(f"Twilio error code: {error_code}")
                        print(f"Twilio more info: {more_info}")
                        
                        errors.append(f"Failed to send message to {worker.get('name')}: {error_msg}")
                else:
                    print("No matching skills found for this worker")
                    
            except Exception as e:
                print(f"Error processing worker {worker.get('name')}: {str(e)}")
                errors.append(f"Error processing worker {worker.get('name')}: {str(e)}")
                continue
        
        print(f"\n=== Notification Summary ===")
        print(f"Successfully notified: {notified_count} workers")
        if errors:
            print(f"Errors encountered: {len(errors)}")
            for error in errors:
                print(f"- {error}")
        
        return jsonify({
            "success": True,
            "notified_count": notified_count,
            "errors": errors
        })
        
    except Exception as e:
        print(f"Error in notify_workers: {str(e)}")
        return jsonify({"error": str(e)}), 500

def validate_phone_number(phone):
    """Validate and format phone number for Twilio"""
    try:
        # Remove any non-digit characters
        digits = ''.join(filter(str.isdigit, phone))
        
        # If number starts with 91, remove it
        if digits.startswith('91'):
            digits = digits[2:]
            
        # If number doesn't start with +, add +91
        if not phone.startswith('+'):
            return f'+91{digits}'
            
        return phone
    except Exception as e:
        print(f"Error validating phone number: {e}")
        return None

@app.route('/send_sms', methods=['POST'])
def send_sms():
    """Send SMS notification about job to worker"""
    try:
        data = request.json
        worker_id = data.get('worker_id')
        job_id = data.get('job_id')
        
        print(f"\n=== Sending SMS ===")
        print(f"Worker ID: {worker_id}")
        print(f"Job ID: {job_id}")
        
        if not worker_id or not job_id:
            print("Error: Missing worker_id or job_id")
            return jsonify({"error": "worker_id and job_id are required"}), 400
            
        if not twilio_client:
            print("Error: Twilio client not configured")
            return jsonify({"error": "Twilio client not configured"}), 500
            
        # Get worker and job details
        worker = get_worker_by_id(worker_id)
        job = get_job_by_id(job_id)
        
        print(f"Worker details: {worker}")
        print(f"Job details: {job}")
        
        if not worker:
            print("Error: Worker not found")
            return jsonify({"error": "Worker not found"}), 404
            
        if not job:
            print("Error: Job not found")
            return jsonify({"error": "Job not found"}), 404
            
        # Get worker's phone number and validate it
        phone_number = worker.get('phone')
        if not phone_number:
            print("Error: Worker phone number not found")
            return jsonify({"error": "Worker phone number not found"}), 404
            
        # Validate and format phone number
        formatted_phone = validate_phone_number(phone_number)
        if not formatted_phone:
            print("Error: Invalid phone number format")
            return jsonify({"error": "Invalid phone number format"}), 400
            
        print(f"Original phone number: {phone_number}")
        print(f"Formatted phone number: {formatted_phone}")
        
        # Get job provider details
        job_provider = job.get('jobProvider', {})
        provider_phone = job_provider.get('phone', 'N/A')
            
        # Format shorter message
        message_body = (
            f"NEW JOB\n"
            f"{job.get('jobTitle', 'N/A')}\n"
            f"📍{job.get('jobLocation', {}).get('address', 'N/A')}\n"
            f"💰₹{job.get('salary', 'N/A')}\n"
            f"📞{provider_phone}\n"
            f"Reply MORE for details"
        )
        
        print(f"Attempting to send message to {formatted_phone}")
        print(f"Message content: {message_body}")
            
        # Send message using Twilio
        try:
            message = twilio_client.messages.create(
                body=message_body,
                from_=TWILIO_PHONE_NUMBER,
                to=formatted_phone
            )
            print(f"Message sent successfully! SID: {message.sid}")
            
            return jsonify({
                "status": "success",
                "message": "SMS sent successfully",
                "message_sid": message.sid,
                "to": formatted_phone
            })
            
        except Exception as e:
            error_msg = str(e)
            error_code = getattr(e, 'code', 'Unknown')
            more_info = getattr(e, 'more_info', 'No additional info')
            
            print(f"Twilio error: {error_msg}")
            print(f"Error code: {error_code}")
            print(f"More info: {more_info}")
            
            return jsonify({
                "error": "Failed to send message",
                "details": error_msg,
                "code": error_code,
                "more_info": more_info
            }), 500
        
    except Exception as e:
        print(f"Error in send_sms: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)