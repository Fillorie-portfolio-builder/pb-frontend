import axios from "axios";

import { API_BASE_URL } from "./url";

export const getOwnerById = async (id) => axios.get(`${API_BASE_URL}/owner/${id}`);