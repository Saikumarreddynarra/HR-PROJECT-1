import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/candidates";

const config = {
  withCredentials: true
};

const CandidateService = {
  getAllCandidates: () => axios.get(API_BASE_URL, config),
  getCandidate: (id) => axios.get(`${API_BASE_URL}/${id}`, config),
  createCandidate: (candidate) => axios.post(API_BASE_URL, candidate, config),
  updateCandidate: (id, candidate) => axios.put(`${API_BASE_URL}/${id}`, candidate, config),
  deleteCandidate: (id) => axios.delete(`${API_BASE_URL}/${id}`, config),
  getCandidateApplications: (id) => axios.get(`${API_BASE_URL}/${id}/applications`, config),
};

export default CandidateService;
