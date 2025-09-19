import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/applications";

const ApplicationService = {
  applyForJob: (candidateId, jobId) =>
    axios.post(`${API_BASE_URL}/apply?candidateId=${candidateId}&jobId=${jobId}`),
  getApplicantsForJob: (jobId) => axios.get(`${API_BASE_URL}/job/${jobId}/candidates`),
  getJobsAppliedByCandidate: (candidateId) =>
    axios.get(`${API_BASE_URL}/candidate/${candidateId}/jobs`),
};

export default ApplicationService;
