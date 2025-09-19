import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CandidateService from '../services/CandidateService';
import 'bootstrap/dist/css/bootstrap.min.css';

const CandidateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        currentStatus: '',
        resumeLink: ''
    });

    useEffect(() => {
        if (id) {
            CandidateService.getCandidate(id)
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error('Error loading candidate:', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const saveOrUpdate = id
            ? CandidateService.updateCandidate(id, formData)
            : CandidateService.createCandidate(formData);

        saveOrUpdate
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error saving candidate:', error);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{id ? 'Edit Candidate' : 'Add New Candidate'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Current Status</label>
                    <select
                        className="form-control"
                        name="currentStatus"
                        value={formData.currentStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offered">Offered</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Resume Link</label>
                    <input
                        type="url"
                        className="form-control"
                        name="resumeLink"
                        value={formData.resumeLink}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary me-2">
                        {id ? 'Update' : 'Save'}
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CandidateForm;