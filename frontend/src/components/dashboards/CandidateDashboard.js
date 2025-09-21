import React from 'react';
import { Link } from 'react-router-dom';

const CandidateDashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Candidate Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Available Jobs</h5>
              <p className="card-text">Browse and apply for open positions.</p>
              <Link to="/jobs" className="btn btn-primary">View Jobs</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My Applications</h5>
              <p className="card-text">Track your job applications.</p>
              <Link to="/my-applications" className="btn btn-primary">View Applications</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;