import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobService from '../services/JobService';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch jobs
    JobService.getAllJobs()
      .then(response => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading jobs:', error);
        setError(error.response?.data || 'Error loading jobs');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await JobService.deleteJob(id);
        // Fetch the updated list of jobs
        const response = await JobService.getAllJobs();
        setJobs(response.data);
      } catch (err) {
        console.error('Error deleting job:', err);
        setError(err.response?.data || 'Error deleting job');
      }
    }
  };

  const canEditJob = (job) => {
    if (userRole === 'ADMIN') return true;
    if (userRole === 'RECRUITER' && job.recruiterId === parseInt(userId)) return true;
    return false;
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Jobs</h2>
        {(userRole === 'ADMIN' || userRole === 'RECRUITER') && (
          <Link to="/add-job" className="btn btn-primary">
            Add New Job
          </Link>
        )}
      </div>

      {jobs.length === 0 ? (
        <div className="alert alert-info">No jobs available.</div>
      ) : (
        <div className="list-group">
          {jobs.map(job => (
            <div key={job.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{job.title}</h5>
                  <p className="mb-1">
                    {job.description.length > 100 
                      ? `${job.description.substring(0, 100)}...` 
                      : job.description}
                  </p>
                  <small className="text-muted">Required Skills: {job.requiredSkills}</small>
                </div>
                <div className="btn-group">
                  <Link to={`/jobs/${job.id}`} className="btn btn-info me-2">
                    View Details
                  </Link>
                  {userRole === 'CANDIDATE' && (
                    <button 
                      className="btn btn-success me-2"
                      onClick={() => JobService.applyForJob(job.id)}
                    >
                      Apply
                    </button>
                  )}
                  {canEditJob(job) && (
                    <>
                      <Link to={`/edit-job/${job.id}`} className="btn btn-warning me-2">
                        Edit
                      </Link>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
