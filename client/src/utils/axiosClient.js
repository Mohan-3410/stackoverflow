import axios from "axios"

const baseURL = import.meta.env.MODE === "development" ? 'http://localhost:3000' : import.meta.env.VITE_SERVER_BASE_URL;

export const axiosClient = axios.create({
    baseURL,
    withCredentials: true
})

axiosClient.interceptors.request.use((req) => {
    if (localStorage.getItem('Profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
    }
    return req;
})