import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      
      const { role } = response.data;
      
      console.log('Login response:', response.data); // Debug log
      console.log('Role received:', role); // Debug log
      
      // Store role in localStorage
      localStorage.setItem("role", role);
      console.log('Role in localStorage after setting:', localStorage.getItem("role")); // Debug log

      // Redirect based on role
      switch (role) {
        case "ADMIN":
          navigate("/admin-dashboard");
          break;
        case "RECRUITER":
          navigate("/recruiter-dashboard");
          break;
        case "HIRING_MANAGER":
          navigate("/hiring-dashboard");
          break;
        case "CANDIDATE":
          navigate("/candidate-dashboard");
          break;
        default:
          setError("Invalid role");
          localStorage.removeItem("role");
          localStorage.removeItem("userId");
          navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
