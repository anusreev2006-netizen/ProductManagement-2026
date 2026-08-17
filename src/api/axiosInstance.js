import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://productmanagement-2026.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;