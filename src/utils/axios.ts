import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000/api',
    baseURL: 'https://student-management-system-42m1.onrender.com/api',
});

export default axiosInstance;