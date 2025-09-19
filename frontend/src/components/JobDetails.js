import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobService from "../services/JobService";
import ApplyJobButton from "./ApplyJobButton";
import ApplicantsList from "./ApplicantsList";

const JobDetails = ({ candidateId }) => {
  const { id } = useParams(); // Job ID from URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    JobService.getJobById(id)
      .then(res => setJob(res.data))
      .catch(err => console.error("Error fetching job:", err));
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="card shadow p-3">
      <h3 className="card-title">{job.title}</h3>
      <p className="card-text">{job.description}</p>
      <p><strong>Required Skills:</strong> {job.requiredSkills}</p>
      <p><strong>Recruiter ID:</strong> {job.recruiterId}</p>

      {/* Apply button only if candidateId is provided */}
      {candidateId && (
        <ApplyJobButton jobId={job.id} candidateId={candidateId} />
      )}

      {/* Show list of applicants (for recruiter/admin) */}
      <div className="mt-4">
        <ApplicantsList jobId={job.id} />
      </div>
    </div>
  );
};

export default JobDetails;
