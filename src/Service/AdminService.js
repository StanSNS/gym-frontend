import axios from "axios";
import {BACKEND_BASE_URL} from "../Constant/globalConst";

export const getAllOrderData = () => {
    return axios.get(BACKEND_BASE_URL + "/admin").then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get all order data.');
        }
    }).catch((error) => {
        throw error;
    });
};

export const modifyOrderStatus = (status, randomNumber) => {
    return axios.put(BACKEND_BASE_URL + `/admin?status=${status}&randomNumber=${randomNumber}`).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};