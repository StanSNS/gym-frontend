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

export const getProductByModelId = (modelId) => {
    return axios.get(BACKEND_BASE_URL + `/product?&modelId=${modelId}`).then((response) => {
        if (response.status === 202) {
            return response.data;
        } else {
            throw new Error('Failed to get current product.');
        }
    }).catch((error) => {
        throw error;
    });
};

export const checkIfProductExists = (brandId, modelId, tasteId) => {
    return axios.patch(BACKEND_BASE_URL + `/product?brandId=${brandId}&modelId=${modelId}&tasteId=${tasteId}`).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};
