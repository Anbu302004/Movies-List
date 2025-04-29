import axios from "axios";

export const API_BASE_URL = "https://movies.harikaran.com/api";
export const IMAGE_BASE_URL = "https://movies.harikaran.com/";

const moviesApiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default moviesApiClient;
