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

const CART_KEY = 'cart';

export const getCartFromStorage = () => {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const addToCart = (product, selectedTaste, quantity = 1) => {
    const cart = getCartFromStorage();
    const { brandEntity, discountedPrice, image, modelId, name, regularPrice, weightKg } = product;

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.modelId === modelId && item.selectedTaste.silaTasteID === selectedTaste.silaTasteID);

    if (existingProductIndex !== -1) {
        // If the product already exists, update its quantity
        cart[existingProductIndex].quantity += quantity;
    } else {
        // If the product doesn't exist, add it to the cart
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


// export const removeFromCart = (productId) => {
//     const cart = getCartFromStorage();
//     const updatedCart = cart.filter((product) => product.id !== productId);
//     localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
//     return updatedCart;
// };