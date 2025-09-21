import React, { useState, useEffect } from 'react';
import CandidateService from '../services/CandidateService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const [candidateApplications, setCandidateApplications] = useState({});
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [candidateToDelete, setCandidateToDelete] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showApplications, setShowApplications] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (!role || (role !== 'ADMIN' && role !== 'HIRING_MANAGER')) {
            navigate('/login');
            return;
        }
        loadCandidates();
    }, [navigate]);

    const loadCandidates = () => {
        setLoading(true);
        setError(null);
        CandidateService.getAllCandidates()
            .then(response => {
                setCandidates(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error loading candidates: ' + (error.response?.data || error.message));
                setLoading(false);
                if (error.response?.status === 401) {
                    localStorage.removeItem('role');
                    localStorage.removeItem('userId');
                    navigate('/login');
                }
            });
    };

    const loadCandidateApplications = (candidateId) => {
        CandidateService.getCandidateApplications(candidateId)
            .then(response => {
                setCandidateApplications(prev => ({
                    ...prev,
                    [candidateId]: response.data
                }));
            })
            .catch(error => {
                console.error('Error loading applications:', error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('role');
                    localStorage.removeItem('userId');
                    navigate('/login');
                }
            });
    };

    const handleViewApplications = (candidate) => {
        setSelectedCandidate(candidate);
        setShowApplications(true);
        if (!candidateApplications[candidate.id]) {
            loadCandidateApplications(candidate.id);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-candidate/${id}`);
    };

    const handleDelete = (id) => {
        setCandidateToDelete(id);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (candidateToDelete) {
            CandidateService.deleteCandidate(candidateToDelete)
                .then(() => {
                    loadCandidates();
                    setShowDeleteDialog(false);
                    setCandidateToDelete(null);
                })
                .catch(error => {
                    console.error('Error deleting candidate:', error);
                    setShowDeleteDialog(false);
                    setCandidateToDelete(null);
                });
        }
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
        setCandidateToDelete(null);
    };

    const userRole = localStorage.getItem('role');
    const canModify = userRole === 'ADMIN' || userRole === 'HIRING_MANAGER';

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Candidate List</h2>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {canModify && (
                <div className="mb-3">
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/add-candidate')}
                    >
                        Add New Candidate
                    </button>
                </div>
            )}
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th>Resume</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <tr key={candidate.id}>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.email}</td>
                                    <td>{candidate.phoneNumber}</td>
                                    <td>{candidate.currentStatus}</td>
                                    <td>
                                        {candidate.resumeLink && (
                                            <a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer">
                                                View Resume
                                            </a>
                                        )}
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleViewApplications(candidate)}
                                        >
                                            View Applications
                                        </button>
                                        {canModify && (
                                            <>
                                                <button 
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => handleEdit(candidate.id)}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(candidate.id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={cancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this candidate?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={confirmDelete}>
                                    Yes
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Applications Modal */}
            {showApplications && selectedCandidate && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Applications - {selectedCandidate.name}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowApplications(false)}></button>
                            </div>
                            <div className="modal-body">
                                {candidateApplications[selectedCandidate.id] ? (
                                    candidateApplications[selectedCandidate.id].length > 0 ? (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Job Title</th>
                                                    <th>Applied Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {candidateApplications[selectedCandidate.id].map(application => (
                                                    <tr key={application.id}>
                                                        <td>{application.job.title}</td>
                                                        <td>{new Date(application.appliedDate).toLocaleDateString()}</td>
                                                        <td>{application.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No applications found for this candidate.</p>
                                    )
                                ) : (
                                    <div className="text-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading applications...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowApplications(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateList;