import guestApiClient from "./moviesApiClient";
import authApiClient from "./authApiClient";

const getApiClient = () => {
    const token = localStorage.getItem("authToken");
    return token ? authApiClient : guestApiClient;
};

export default getApiClient;
