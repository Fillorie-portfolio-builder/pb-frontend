import axios from "axios";

import { API_BASE_URL } from "./url";

export const signup = async (userData) => axios.post(`${API_BASE_URL}/auth/register-builder`, userData);
export const signupOwner = async (userData) => axios.post(`${API_BASE_URL}/auth/register-owner`, userData);
export const signin = async (userData) => axios.post(`${API_BASE_URL}/auth/login`, userData);
// export const forgotPassword = async (email) => axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });

export const forgotPassword = async (email) => axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
export const confirmPassword = async (token, password) => {
  return axios.post(`${API_BASE_URL}/auth/reset-password?token=${token}`, { password });
};
// Automatically attach token to requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
