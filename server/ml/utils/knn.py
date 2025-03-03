from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer

def recommend_jobs(worker, jobs):
    """
    Recommend jobs for a worker based on skill similarity using KNN.
    
    Args:
        worker (dict): Worker data containing skills array
        jobs (list): List of job objects with skills array
        
    Returns:
        list: Recommended jobs sorted by relevance
    """
    # Extract skills - handle potential missing skills
    worker_skills = ' '.join(worker.get('skills', []) if isinstance(worker.get('skills'), list) else [])
    
    # Filter out jobs with no skills and extract skill strings
    valid_jobs = []
    job_skills = []
    
    for i, job in enumerate(jobs):
        if 'skills' in job and isinstance(job['skills'], list) and len(job['skills']) > 0:
            valid_jobs.append(job)
            job_skills.append(' '.join(job['skills']))
    
    # If no valid jobs or worker has no skills, return empty list
    if not job_skills or not worker_skills:
        return []
        
    # Combine worker skills and job skills for vectorization
    all_skills = [worker_skills] + job_skills

    # Convert skills to TF-IDF vectors
    vectorizer = TfidfVectorizer()
    try:
        skill_vectors = vectorizer.fit_transform(all_skills)
    except Exception as e:
        print(f"Vectorization error: {e}")
        return []

    # Separate worker vector and job vectors
    worker_vector = skill_vectors[0]  # Worker's skill vector
    job_vectors = skill_vectors[1:]   # Job skill vectors
    
    # Handle case with only one job
    if job_vectors.shape[0] == 1:
        return valid_jobs
    
    # Fit KNN model - use min of jobs count or 5 neighbors
    n_neighbors = min(len(valid_jobs), 5)
    knn = NearestNeighbors(n_neighbors=n_neighbors, metric='cosine')
    knn.fit(job_vectors)

    # Find nearest jobs
    distances, indices = knn.kneighbors(worker_vector)
    
    # Sort jobs by similarity (closest first)
    recommended_jobs = [valid_jobs[i] for i in indices[0]]
    
    return recommended_jobs