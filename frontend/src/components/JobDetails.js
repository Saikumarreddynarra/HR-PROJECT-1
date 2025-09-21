import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import JobService from "../services/JobService";
import ApplyJobButton from "./ApplyJobButton";
import ApplicantsList from "./ApplicantsList";

const JobDetails = () => {
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        loadJobDetails();
    }, [id]);

    const loadJobDetails = () => {
        setLoading(true);
        setError(null);
        JobService.getJobById(id)
            .then(response => {
                setJob(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.response?.data || 'Error loading job details');
                setLoading(false);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            });
    };

    const handleApply = () => {
        JobService.applyForJob(id)
            .then(() => {
                alert('Application submitted successfully!');
                navigate('/applications');
            })
            .catch(err => {
                setError(err.response?.data || 'Error applying for job');
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            JobService.deleteJob(id)
                .then(() => {
                    navigate('/jobs');
                })
                .catch(err => {
                    setError(err.response?.data || 'Error deleting job');
                    if (err.response?.status === 401) {
                        navigate('/login');
                    }
                });
        }
    };

    const canEditJob = () => {
        if (!job) return false;
        if (userRole === 'ADMIN') return true;
        if (userRole === 'RECRUITER' && job.recruiterId === parseInt(userId)) return true;
        return false;
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <Link to="/jobs" className="btn btn-primary">
                    Back to Jobs
                </Link>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">
                    Job not found
                </div>
                <Link to="/jobs" className="btn btn-primary">
                    Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">{job.title}</h3>
                    <div className="btn-group">
                        <Link to="/jobs" className="btn btn-outline-primary">
                            Back to Jobs
                        </Link>
                        {userRole === 'CANDIDATE' && (
                            <button 
                                className="btn btn-success ms-2"
                                onClick={handleApply}
                            >
                                Apply Now
                            </button>
                        )}
                        {canEditJob() && (
                            <>
                                <Link 
                                    to={`/edit-job/${job.id}`}
                                    className="btn btn-warning ms-2"
                                >
                                    Edit
                                </Link>
                                <button 
                                    className="btn btn-danger ms-2"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="card-body">
                    <div className="mb-4">
                        <h5>Description</h5>
                        <p>{job.description}</p>
                    </div>
                    <div className="mb-4">
                        <h5>Required Skills</h5>
                        <p>{job.requiredSkills}</p>
                    </div>
                    {(userRole === 'ADMIN' || userRole === 'RECRUITER') && (
                        <>
                            <div className="mb-4">
                                <h5>Recruiter ID</h5>
                                <p>{job.recruiterId}</p>
                            </div>
                            <div className="mt-4">
                                <h5>Applicants</h5>
                                <ApplicantsList jobId={job.id} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
