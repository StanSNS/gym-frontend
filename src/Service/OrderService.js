import axios from "axios";
import {BACKEND_BASE_URL} from "../Constant/globalConst";

export const sendOrder = (orderDto) => {
    return axios.post(BACKEND_BASE_URL + "/order", orderDto).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};