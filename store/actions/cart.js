export const ADD_TO_CART = 'ADD_TO_CART'
export const CHANGE_CART_ITEM = 'CHANGE_CART_ITEM'
export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        product: product
    }
}

export const changeCartItem = (productId, value) => {
    return {
        type: CHANGE_CART_ITEM,
        prod: productId,
        changeValue: value
    }
}