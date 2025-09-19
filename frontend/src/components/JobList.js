import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobService from '../services/JobService';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    JobService.getAllJobs()
      .then(res => setJobs(res.data))
      .catch(err => console.error('Error loading jobs:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Available Jobs</h2>
      <div className="list-group">
        {jobs.map(j => (
          <Link key={j.id} to={`/jobs/${j.id}`} className="list-group-item list-group-item-action">
            <h5>{j.title}</h5>
            <p>{j.description.substring(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobList;
