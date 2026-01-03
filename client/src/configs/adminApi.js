import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:3000",
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default adminApi;
