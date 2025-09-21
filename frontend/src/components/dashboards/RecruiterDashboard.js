import React from 'react';
import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Recruiter Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Job Postings</h5>
              <p className="card-text">Create and manage job postings.</p>
              <Link to="/jobs" className="btn btn-primary">Manage Jobs</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Applications</h5>
              <p className="card-text">Review candidate applications.</p>
              <Link to="/applications" className="btn btn-primary">View Applications</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;