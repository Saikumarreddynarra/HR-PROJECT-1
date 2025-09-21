import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Candidates</h5>
              <p className="card-text">View and manage all candidate profiles.</p>
              <Link to="/candidates" className="btn btn-primary">View Candidates</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Jobs</h5>
              <p className="card-text">Create and manage job postings.</p>
              <Link to="/jobs" className="btn btn-primary">View Jobs</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Management</h5>
              <p className="card-text">Manage system users and roles.</p>
              <Link to="/users" className="btn btn-primary">Manage Users</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;