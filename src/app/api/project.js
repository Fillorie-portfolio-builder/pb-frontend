import axios from "axios";

import { API_BASE_URL } from "./url";

export const addProject = async (data) => axios.post(`${API_BASE_URL}/project/`, data);

export const getProjectsByOwner = async (ownerId) => axios.get(`${API_BASE_URL}/project/owner/${ownerId}`);

export const getProjectById = async (id) => axios.get(`${API_BASE_URL}/project/${id}`);

export const getAllProjects = async () => axios.get(`${API_BASE_URL}/project/`);

export const updateProject = async (id, data) => axios.put(`${API_BASE_URL}/project/${id}`, data);

export const markAsInterested = async (projectId, userId, newInterest) =>
  axios.post(`${API_BASE_URL}/project/${projectId}/interested`, {
    userId,
    newInterest,
  });

export const assignBuilderToProject = (projectId, builderId) =>
  axios.post(`${API_BASE_URL}/project/${projectId}/assign-builder`, {
    builderId,
  });


axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});