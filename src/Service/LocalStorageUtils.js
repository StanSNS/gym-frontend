import {decryptData, encryptData} from "./SecurityService";

const SELECTED_PRODUCT = 'gym_fit_selected_product';

export const getSelectedProductFromStorage = () => {
    const selectedProduct = localStorage.getItem(SELECTED_PRODUCT)

    if (selectedProduct) {
        return decryptData(selectedProduct)
    }
    return null;
};

export const setSelectedProductFromStorage = (selectedProduct) => {
    localStorage.setItem(SELECTED_PRODUCT, encryptData(selectedProduct));
};

const CART_KEY = 'gym_fit_cart';

export const getCartFromStorage = () => {
    const cartItem = localStorage.getItem(CART_KEY)

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

    localStorage.setItem(CART_KEY, encryptData(cart));
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

        localStorage.setItem(CART_KEY, encryptData(cart));
    }

    return cart;
};

export const removeCartItems = () => {
    localStorage.removeItem(CART_KEY)
}

const SHOP_FILTERS = 'gym_fit_shop_filters';

// export const getShopFilters = () => {
//     const cartItem = localStorage.getItem(SHOP_FILTERS)
//
//     if (cartItem) {
//         return JSON.parse(decryptData(cartItem));
//     }
//     return [];
// }
//
// export const setShopFilters = (updatedFilters) => {
//     localStorage.setItem(SHOP_FILTERS, encryptData(JSON.stringify(updatedFilters)));
// }

export const getShopFilters = () => {
    const cartItem = localStorage.getItem(SHOP_FILTERS)

    if (cartItem) {
        return JSON.parse((cartItem));
    }
    return [];
}

export const setShopFilters = (updatedFilters) => {
    localStorage.setItem(SHOP_FILTERS, (JSON.stringify(updatedFilters)));
}