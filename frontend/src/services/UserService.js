import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

const UserService = {
    login: (email, password) => {
        return axios.post(`${API_BASE_URL}/login`, { email, password }, { withCredentials: true })
            .then(response => {
                const { id, role } = response.data;
                localStorage.setItem('userId', id);
                localStorage.setItem('role', role);
                return response.data;
            });
    },

    register: (userData) => {
        return axios.post(`${API_BASE_URL}/register`, userData, { withCredentials: true });
    },

    logout: () => {
        return axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true })
            .then(() => {
                localStorage.removeItem('userId');
                localStorage.removeItem('role');
            });
    },

    getCurrentUser: () => {
        const role = localStorage.getItem('role');
        return {
            role: role,
            id: localStorage.getItem('userId')
        };
    },

    hasPermission: (requiredRole) => {
        const userRole = localStorage.getItem('role');
        if (!userRole) return false;

        // Define role hierarchy
        const roleHierarchy = {
            'ADMIN': ['ADMIN', 'RECRUITER', 'HIRING_MANAGER', 'CANDIDATE'],
            'RECRUITER': ['RECRUITER', 'CANDIDATE'],
            'HIRING_MANAGER': ['HIRING_MANAGER', 'CANDIDATE'],
            'CANDIDATE': ['CANDIDATE']
        };

        return roleHierarchy[userRole]?.includes(requiredRole) || false;
    }
};

export default UserService;
