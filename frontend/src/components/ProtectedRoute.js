import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const role = localStorage.getItem('role');

    // Only check if user is logged in
    if (!role) {
        return <Navigate to="/login" replace />;
    }

    // Simple role check without clearing localStorage
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to={`/${role.toLowerCase()}-dashboard`} replace />;
    }

    // Render the protected component if authorized
    return element;
};

export default ProtectedRoute;