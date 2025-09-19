import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

const UserService = {
  login: (email, password) =>
    axios.post(`${API_BASE_URL}/login`, { email, password }),
  register: (user) =>
    axios.post(`${API_BASE_URL}/register`, user),
};

export default UserService;
