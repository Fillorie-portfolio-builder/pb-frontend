import axios from "axios";
import { API_BASE_URL } from "./url";

export const createReview = async (reviewData) => {
    return axios.post(`${API_BASE_URL}/review/createReview/`, reviewData);
};

export const getReviewsByBuilder = async (id) => {
    return axios.get(`${API_BASE_URL}/review/getReviewsByBuilder/${id}`);
};