import axios from "axios";

import { API_BASE_URL } from "./url";

export const addPortfolioProject = async (data) => axios.post(`${API_BASE_URL}/portfolio`, data);


axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});