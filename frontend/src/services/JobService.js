import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/jobs";

const JobService = {
  getAllJobs: () => axios.get(API_BASE_URL),
  getJob: (id) => axios.get(`${API_BASE_URL}/${id}`),
  createJob: (job) => axios.post(API_BASE_URL, job),
  updateJob: (id, job) => axios.put(`${API_BASE_URL}/${id}`, job),
  deleteJob: (id) => axios.delete(`${API_BASE_URL}/${id}`),
};

export default JobService;
