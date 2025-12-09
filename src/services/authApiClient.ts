import axios from "axios";

// Use environment variable for API URL, fallback to localhost for local dev
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const IMAGE_BASE_URL = "https://movies.harikaran.com/";

const moviesApiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // needed if backend uses cookies/sessions
});

export default moviesApiClient;
