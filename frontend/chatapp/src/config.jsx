// src/apiConfig.js
import axios from 'axios';

// Set up the base URL for your backend
const API_BASE_URL = 'http://127.0.0.1:8000/api';  // Replace with your actual backend URL

// Set up Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // You can add Authorization headers here if needed
    },
});

export default apiClient;
