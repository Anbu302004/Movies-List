import axios from "axios";

// Use env variable or fallback to localhost for local testing
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const moviesApiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // required if backend uses cookies/sessions
});

export default moviesApiClient;
