import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CandidateList from "./components/CandidateList";
import CandidateForm from "./components/CandidateForm";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import Login from "./components/Login";
import Register from "./components/Register";
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

            <div className="d-flex">
              {role ? (
                <>
                  {(role === "ADMIN" || role === "HIRING_MANAGER") && (
                    <Link to="/" className="btn btn-outline-light me-2">
                      Candidates
                    </Link>
                  )}
                  {(role === "ADMIN" || role === "RECRUITER" || role === "CANDIDATE") && (
                    <Link to="/jobs" className="btn btn-outline-light me-2">
                      Jobs
                    </Link>
                  )}
                  {role === "ADMIN" && (
                    <Link to="/admin-dashboard" className="btn btn-outline-light">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={() => {
                      localStorage.clear();
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
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Candidate Routes */}
            <Route path="/" element={<CandidateList />} />
            <Route path="/add-candidate" element={<CandidateForm />} />
            <Route path="/edit-candidate/:id" element={<CandidateForm />} />

            {/* Job Routes */}
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            {/* Dashboard placeholder for Admin */}
            <Route path="/admin-dashboard" element={<div>Admin Dashboard</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
