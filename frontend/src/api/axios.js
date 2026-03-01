import axios from "axios";

const api = axios.create({
    baseURL: "https://crm-full-stack-app-no-auth.vercel.app/api",
});

// THIS IS NEW: Automatically adds the token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
