// import axios from 'axios';

const API_BASE_URL = 'https://api.labourhub.com/v1'; // Replace with actual API URL

class ApiService {
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async getRecommendedJobs(userId) {
    // For development, return mock data
    return this.getMockJobs();
  }

  async searchJobs(filters) {
    // For development, return mock data
    const mockJobs = this.getMockJobs();
    return {
      jobs: mockJobs,
      total: mockJobs.length,
    };
  }

  getMockJobs() {
    return [
      {
        id: '1',
        title: "Construction Site Manager",
        company: "BuildTech Solutions",
        location: "New York, NY",
        salary: "$75,000 - $95,000",
        type: "Full-time",
        postedDate: "Posted 2 days ago",
        description: "Experienced construction site manager needed for large-scale residential project.",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80",
        skills: ["Project Management", "Team Leadership", "Safety Compliance"],
        requirements: ["5+ years experience", "PMP Certification", "OSHA Certification"],
        benefits: ["Health Insurance", "401(k)", "Paid Time Off"]
      },
      {
        id: '2',
        title: "Senior Electrician",
        company: "PowerGrid Services",
        location: "Chicago, IL",
        salary: "$60,000 - $80,000",
        type: "Contract",
        postedDate: "Posted 3 days ago",
        description: "Looking for a certified electrician with experience in commercial installations.",
        imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80",
        skills: ["Electrical Systems", "Circuit Installation", "Troubleshooting"],
        requirements: ["Licensed Electrician", "3+ years experience", "Valid Driver's License"],
        benefits: ["Flexible Schedule", "Tool Allowance", "Vehicle Provided"]
      },
      // Add more mock jobs as needed
    ];
  }
}

export const apiService = new ApiService();