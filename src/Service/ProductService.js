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

export const checkIfProductExists = (brandId, modelId, tasteId) => {
    return axios.patch(BACKEND_BASE_URL + `/product?brandId=${brandId}&modelId=${modelId}&tasteId=${tasteId}`).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const CART_KEY = 'cart';

export const getCartFromStorage = () => {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const addToCart = (product, selectedTaste, quantity = 1) => {
    const cart = getCartFromStorage();
    const { brandEntity, discountedPrice, image, modelId, name, regularPrice, weightKg } = product;

    let existingProductIndex;

    if(selectedTaste) {
        existingProductIndex = cart.findIndex(item => item.modelId === modelId && item.selectedTaste?.silaTasteID === selectedTaste?.silaTasteID);
    } else {
        existingProductIndex = cart.findIndex(item => item.modelId === modelId && !item.selectedTaste);
    }

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({
            brandEntity,
            discountedPrice,
            image,
            modelId,
            name,
            regularPrice,
            selectedTaste,
            weightKg,
            quantity
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
};

export const reduceQuantityInCart = (product, selectedTaste, quantity = 1) => {
    const cart = getCartFromStorage();
    let indexToReduce;

    if(selectedTaste) {
        indexToReduce = cart.findIndex(item => item.modelId === product.modelId && item.selectedTaste?.silaTasteID === selectedTaste?.silaTasteID);
    } else {
        indexToReduce = cart.findIndex(item => item.modelId === product.modelId && !item.selectedTaste);
    }

    if (indexToReduce !== -1) {
        if (cart[indexToReduce].quantity > quantity) {
            cart[indexToReduce].quantity -= quantity;
        } else {
            cart.splice(indexToReduce, 1);
        }

        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    return cart;
};




