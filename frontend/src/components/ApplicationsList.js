import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(
          `http://localhost:8080/api/applications/candidate/${userId}`,
          { withCredentials: true }
        );
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications. ' + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>My Job Applications</h2>
      
      {applications.length === 0 ? (
        <div className="alert alert-info">
          You haven't applied to any jobs yet.
          <Link to="/jobs" className="btn btn-primary ms-3">Browse Jobs</Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.id}>
                  <td>{application.job.title}</td>
                  <td>{application.job.company}</td>
                  <td>{new Date(application.appliedDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge bg-${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td>
                    <Link 
                      to={`/jobs/${application.job.id}`} 
                      className="btn btn-info btn-sm"
                    >
                      View Job
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'danger';
    case 'in review':
      return 'info';
    default:
      return 'secondary';
  }
};

export default ApplicationsList;