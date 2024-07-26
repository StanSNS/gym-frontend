import {decryptData, encryptData} from "./SecurityService";

const CART_KEY = 'gym_fit_cart';

export const getCartFromStorage = () => {
    const cartItem = sessionStorage.getItem(CART_KEY)

    if (cartItem) {
        return decryptData(cartItem)
    }
    return [];
};

export const addToCart = (product, selectedTaste, quantity = 1) => {
    const cart = getCartFromStorage();
    const {brandEntity, discountedPrice, image, modelId, name, regularPrice, weightKg} = product;

    let existingProductIndex;

    if (selectedTaste) {
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

    sessionStorage.setItem(CART_KEY, encryptData(cart));
    return cart;
};

export const reduceQuantityInCart = (product, selectedTaste, quantity = 1) => {
    const cart = getCartFromStorage();
    let indexToReduce;

    if (selectedTaste) {
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

        sessionStorage.setItem(CART_KEY, encryptData(cart));
    }

    return cart;
};

export const removeCartItems = () => {
    sessionStorage.removeItem(CART_KEY)
}

const SHOP_FILTERS = 'gym_fit_shop_filters';

export const getShopFilters = () => {
    const cartItem = sessionStorage.getItem(SHOP_FILTERS)

    if (cartItem) {
        return JSON.parse(decryptData(cartItem));
    }
    return [];
}

export const setShopFilters = (updatedFilters) => {
    sessionStorage.setItem(SHOP_FILTERS, encryptData(JSON.stringify(updatedFilters)));
}
