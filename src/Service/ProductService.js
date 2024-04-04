import axios from "axios";
import {BACKEND_BASE_URL} from "../Constant/globalConst";

export const getAllSellableProducts = () => {
    return axios.get(BACKEND_BASE_URL).then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get all sellable products.');
        }
    }).catch((error) => {
        throw error;
    });
};

export const getProductBySkuAndModelId = (sku, modelId) => {
    return axios.get(BACKEND_BASE_URL + `/product?sku=${sku}&modelId=${modelId}`).then((response) => {
        if (response.status === 202) {
            return response.data;
        } else {
            throw new Error('Failed to get current product.');
        }
    }).catch((error) => {
        throw error;
    });
};