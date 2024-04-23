import axios from "axios";
import {BACKEND_BASE_URL} from "../Constant/globalConst";

export const sendOrder = (orderDto) => {
    return axios.post(BACKEND_BASE_URL + "/order", orderDto).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const getAllAddresses = () => {
    return axios.get(BACKEND_BASE_URL + "/order/addresses").then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get all addresses.');
        }
    }).catch((error) => {
        throw error;
    });
};

export const sendAllOrdersToEmail = (email) => {
    return axios.get(BACKEND_BASE_URL + `/order/recover?email=${email}`).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const findOrderByNumber = (number) => {
    return axios.get(BACKEND_BASE_URL + `/order/number?number=${number}`).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};