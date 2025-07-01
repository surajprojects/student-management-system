import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000/api',
    baseURL: "https://student-management-system-xi-six.vercel.app/api",
});

export default axiosInstance;
