import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/candidates";

const CandidateService = {
  getAllCandidates: () => axios.get(API_BASE_URL),
  getCandidate: (id) => axios.get(`${API_BASE_URL}/${id}`),
  createCandidate: (candidate) => axios.post(API_BASE_URL, candidate),
  updateCandidate: (id, candidate) => axios.put(`${API_BASE_URL}/${id}`, candidate),
  deleteCandidate: (id) => axios.delete(`${API_BASE_URL}/${id}`),
};

export default CandidateService;
