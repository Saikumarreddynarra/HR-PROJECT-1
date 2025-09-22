# HR-PROJECT-1
# 🧑‍💼 HR Candidate Management System

A full-stack web application to manage job postings, candidates, and the hiring process.  
Built with **React** (frontend) and **Spring Boot + MySQL** (backend), the platform supports multiple user roles—**Admin**, **Recruiter**, **Hiring Manager**, and **Candidate**—with secure authentication using **JWT**.

---

## 🚀 Features

### 👤 User Roles
- **Admin**: Superuser with the ability to manage all users, jobs, and candidates.
- **Recruiter**: Creates and manages job postings, reviews candidate applications.
- **Hiring Manager**: Reviews applicants, updates candidate status.
- **Candidate**: Registers, updates profile, and applies for jobs.

### 🔑 Authentication & Security
- Registration and login with **BCrypt** password hashing.
- **JWT-based** authentication and role-based authorization.

### 🛠️ Core Modules
- **Jobs**: Create, update, delete, and view job postings.
- **Candidates**: Maintain candidate profiles, track application status.
- **Applications**: Candidates can apply to jobs, and recruiters/hiring managers can review.

---

## 🏗️ Tech Stack

**Frontend**
- React (with React Router)
- Axios for API calls
- Bootstrap for UI components

**Backend**
- Java 17+
- Spring Boot
- Spring Data JPA / Hibernate
- Spring Security (JWT)
- MySQL database


