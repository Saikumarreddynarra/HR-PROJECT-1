import axios from "axios";
import './axiosConfig';

const API_BASE_URL = "http://localhost:8080/api/jobs";

const JobService = {
    getAllJobs: () => {
        return axios.get(API_BASE_URL);
    },

    getJobById: (id) => {
        return axios.get(`${API_BASE_URL}/${id}`);
    },

    createJob: (job) => {
        // Ensure the data is properly structured
        const jobData = {
            title: job.title,
            description: job.description,
            requiredSkills: job.requiredSkills,
            recruiterId: parseInt(job.recruiterId)
        };
        return axios.post(API_BASE_URL, JSON.stringify(jobData), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    },

    updateJob: (id, job) => {
        // Ensure the data is properly structured
        const jobData = {
            title: job.title,
            description: job.description,
            requiredSkills: job.requiredSkills,
            recruiterId: parseInt(job.recruiterId)
        };
        return axios.put(`${API_BASE_URL}/${id}`, JSON.stringify(jobData), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    },

    deleteJob: (id) => {
        return axios.delete(`${API_BASE_URL}/${id}`);
    },

    applyForJob: (jobId) => {
        return axios.post(`${API_BASE_URL}/${jobId}/apply`, {});
    }
};

export default JobService;
