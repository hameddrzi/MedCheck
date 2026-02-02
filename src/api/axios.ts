import axios from "axios";
/**
 * usare Axios invece di Fetch
 * perche fa Stringify/Parse outomaticamente 
 * handle of status Code
 * mostra gli errori in modo giusto
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const axiosInstance = axios.create({ //creqte istance of Axios
    baseURL: API_BASE,
    withCredentials: true, // Key for sending cookies
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: Add response interceptor for global error handling (e.g. 401)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access if needed (e.g. clear local state)
            // Note: We avoid forcing redirect here to let AuthContext handle state
        }
        return Promise.reject(error);
    }
);
