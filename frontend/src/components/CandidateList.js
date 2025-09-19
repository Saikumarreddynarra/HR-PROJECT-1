import React, { useState, useEffect } from 'react';
import CandidateService from '../services/CandidateService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCandidates();
    }, []);

    const loadCandidates = () => {
        CandidateService.getAllCandidates()
            .then(response => {
                setCandidates(response.data);
            })
            .catch(error => {
                console.error('Error loading candidates:', error);
            });
    };

    const handleEdit = (id) => {
        navigate(`/edit-candidate/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this candidate?')) {
            CandidateService.deleteCandidate(id)
                .then(() => {
                    loadCandidates();
                })
                .catch(error => {
                    console.error('Error deleting candidate:', error);
                });
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Candidate List</h2>
            <div className="mb-3">
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/add-candidate')}
                >
                    Add New Candidate
                </button>
            </div>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CandidateList;