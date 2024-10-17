import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://shopping-cart.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
