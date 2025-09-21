import React from 'react';
import { Link } from 'react-router-dom';

const HiringManagerDashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Hiring Manager Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My Candidates</h5>
              <p className="card-text">Review candidates for your positions.</p>
              <Link to="/my-candidates" className="btn btn-primary">View Candidates</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Assigned Jobs</h5>
              <p className="card-text">View jobs assigned to you.</p>
              <Link to="/my-jobs" className="btn btn-primary">View Jobs</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringManagerDashboard;