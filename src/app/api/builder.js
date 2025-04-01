import axios from "axios";

import { API_BASE_URL } from "./url";

export const getBuilderById = async (id) => axios.get(`${API_BASE_URL}/builder/${id}`);

// Automatically attach token to requests
// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
