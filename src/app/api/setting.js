import axios from "axios";
import { API_BASE_URL } from "./url";

export const updateProfile = async (data) => {
    const { id, ...profileData } = data;
    return axios.put(`${API_BASE_URL}/settings/updateprofile/${id}`, profileData);
};

export const updateEmail = async (id, data) => {
    return axios.put(`${API_BASE_URL}/settings/updateEmail/${id}`, data);
};

export const updatePassword = async (id, data) => {
    return axios.put(`${API_BASE_URL}/settings/updatePassword/${id}`, data);
};