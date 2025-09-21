import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobService from '../services/JobService';

const JobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState({
    title: '',
    description: '',
    requiredSkills: '',
    recruiterId: localStorage.getItem('userId') // This would normally come from the authenticated user
  });

  useEffect(() => {
    if (id) {
      JobService.getJob(id)
        .then(res => setJob(res.data))
        .catch(err => console.error('Error loading job:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      console.log('Original job data:', job);
      
      const jobData = {
        title: job.title,
        description: job.description,
        requiredSkills: job.requiredSkills,
        recruiterId: parseInt(job.recruiterId)
      };
      
      console.log('Formatted job data:', jobData);

      if (id) {
        await JobService.updateJob(id, jobData);
      } else {
        await JobService.createJob(jobData);
      }
      navigate('/jobs');
    } catch (err) {
      console.error('Error saving job:', err);
      setError(err.response?.data?.message || 'Error saving job. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit Job' : 'Create New Job'}</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={job.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Required Skills</label>
          <input
            type="text"
            className="form-control"
            name="requiredSkills"
            value={job.requiredSkills}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary me-2">
            {id ? 'Update' : 'Create'} Job
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/jobs')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;