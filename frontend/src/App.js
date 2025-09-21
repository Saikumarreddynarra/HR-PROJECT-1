import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import './services/axiosConfig';
import CandidateList from "./components/CandidateList";
import CandidateForm from "./components/CandidateForm";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import JobForm from "./components/JobForm";
import ApplicationsList from "./components/ApplicationsList";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import RecruiterDashboard from "./components/dashboards/RecruiterDashboard";
import HiringManagerDashboard from "./components/dashboards/HiringManagerDashboard";
import CandidateDashboard from "./components/dashboards/CandidateDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Candidate Management System
            </Link>

            <div className="d-flex align-items-center">
              {role ? (
                <>
                  {/* Admin Navigation */}
                  {role === "ADMIN" && (
                    <>
                      <Link to="/admin-dashboard" className="btn btn-outline-light me-2">Dashboard</Link>
                      <Link to="/candidates" className="btn btn-outline-light me-2">Candidates</Link>
                      <Link to="/jobs" className="btn btn-outline-light me-2">Jobs</Link>
                    </>
                  )}

                  {/* Recruiter Navigation */}
                  {role === "RECRUITER" && (
                    <>
                      <Link to="/recruiter-dashboard" className="btn btn-outline-light me-2">Dashboard</Link>
                      <Link to="/jobs" className="btn btn-outline-light me-2">Manage Jobs</Link>
                    </>
                  )}

                  {/* Hiring Manager Navigation */}
                  {role === "HIRING_MANAGER" && (
                    <>
                      <Link to="/hiring-dashboard" className="btn btn-outline-light me-2">Dashboard</Link>
                      <Link to="/candidates" className="btn btn-outline-light me-2">Manage Candidates</Link>
                    </>
                  )}

                  {/* Candidate Navigation */}
                  {role === "CANDIDATE" && (
                    <>
                      <Link to="/candidate-dashboard" className="btn btn-outline-light me-2">Dashboard</Link>
                      <Link to="/jobs" className="btn btn-outline-light me-2">Browse Jobs</Link>
                      <Link to="/my-applications" className="btn btn-outline-light me-2">My Applications</Link>
                    </>
                  )}
                  
                  {/* Logout Button */}
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={() => {
                      localStorage.removeItem('role');
                      localStorage.removeItem('userId');
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-light me-2">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-outline-light">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Role-based Dashboard Routes */}
            <Route path="/admin-dashboard" 
              element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['ADMIN']} />} 
            />
            <Route path="/recruiter-dashboard" 
              element={<ProtectedRoute element={<RecruiterDashboard />} allowedRoles={['RECRUITER']} />} 
            />
            <Route path="/hiring-dashboard" 
              element={<ProtectedRoute element={<HiringManagerDashboard />} allowedRoles={['HIRING_MANAGER']} />} 
            />
            <Route path="/candidate-dashboard" 
              element={<ProtectedRoute element={<CandidateDashboard />} allowedRoles={['CANDIDATE']} />} 
            />

            {/* Candidate Management Routes */}
            <Route path="/candidates" 
              element={<ProtectedRoute element={<CandidateList />} allowedRoles={['ADMIN', 'HIRING_MANAGER']} />} 
            />
            <Route path="/add-candidate" 
              element={<ProtectedRoute element={<CandidateForm />} allowedRoles={['ADMIN', 'HIRING_MANAGER']} />} 
            />
            <Route path="/edit-candidate/:id" 
              element={<ProtectedRoute element={<CandidateForm />} allowedRoles={['ADMIN', 'HIRING_MANAGER']} />} 
            />

            {/* Job Management Routes */}
            <Route path="/jobs" 
              element={<ProtectedRoute element={<JobList />} allowedRoles={['ADMIN', 'RECRUITER', 'CANDIDATE']} />} 
            />
            <Route path="/jobs/:id" 
              element={<ProtectedRoute element={<JobDetails />} allowedRoles={['ADMIN', 'RECRUITER', 'CANDIDATE']} />} 
            />
            <Route path="/add-job" 
              element={<ProtectedRoute element={<JobForm />} allowedRoles={['ADMIN', 'RECRUITER']} />} 
            />
            <Route path="/edit-job/:id" 
              element={<ProtectedRoute element={<JobForm />} allowedRoles={['ADMIN', 'RECRUITER']} />} 
            />

            {/* Candidate Application Routes */}
            <Route path="/my-applications" 
              element={<ProtectedRoute element={<ApplicationsList />} allowedRoles={['CANDIDATE']} />} 
            />

            {/* Default Route - Redirects to role-specific dashboard */}
            <Route path="/" 
              element={
                <ProtectedRoute 
                  element={
                    (() => {
                      const role = localStorage.getItem('role');
                      switch(role) {
                        case 'ADMIN': return <AdminDashboard />;
                        case 'RECRUITER': return <RecruiterDashboard />;
                        case 'HIRING_MANAGER': return <HiringManagerDashboard />;
                        case 'CANDIDATE': return <CandidateDashboard />;
                        default: return <Navigate to="/login" />;
                      }
                    })()
                  }
                  allowedRoles={['ADMIN', 'RECRUITER', 'HIRING_MANAGER', 'CANDIDATE']} 
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
