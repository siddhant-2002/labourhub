from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer

def recommend_jobs(worker, jobs):
    # Extract skills
    worker_skills = ' '.join(worker['skills'])  # Convert worker skills to a single string
    job_skills = [' '.join(job['skills']) for job in jobs]  # Convert job skills to a list of strings

    # Combine worker skills and job skills for vectorization
    all_skills = [worker_skills] + job_skills

    # Convert skills to TF-IDF vectors
    vectorizer = TfidfVectorizer()
    skill_vectors = vectorizer.fit_transform(all_skills)

    # Separate worker vector and job vectors
    worker_vector = skill_vectors[0]  # Worker's skill vector
    job_vectors = skill_vectors[1:]   # Job skill vectors

    # Fit KNN model
    knn = NearestNeighbors(n_neighbors=len(jobs), metric='cosine')
    knn.fit(job_vectors)

    # Find nearest jobs
    distances, indices = knn.kneighbors(worker_vector)
    recommended_jobs = [jobs[i] for i in indices[0]]

    return recommended_jobs