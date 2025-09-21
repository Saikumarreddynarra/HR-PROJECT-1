import axios from 'axios';

// Set default headers
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

// Basic axios configuration
axios.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);