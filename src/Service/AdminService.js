import axios from "axios";
import {BACKEND_BASE_URL} from "../Constant/globalConst";

export const getAllTastes = () => {
    return axios.get(BACKEND_BASE_URL + "/admin").then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get all tastes.');
        }
    }).catch((error) => {
        throw error;
    });
};