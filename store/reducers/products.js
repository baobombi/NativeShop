import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_FAVORITE_PRODUCT,
  SET_FILTERS,
  SET_PRODUCT,
  SEARCH_PRODUCT
} from '../actions/products';
import Product from '../../models/product'

const initialState = {
  availableProducts: [],
  favoriteProduct: [],
  userProducts: [],
  searchProducts: []
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_PRODUCT:
      return {
        ...state,
        availableProducts: action.products,
      }

    case ADD_FAVORITE_PRODUCT:
      const existingIndex = state.favoriteProduct.findIndex(product => product.id === action.productId)
      const productUpdateLike = state.availableProducts.findIndex(product => product.id === action.productId)
      //const updateProductLike;
      if (action.likeTotal > 0) {
        const updateProductLike = new Product(
          action.productId,
          state.availableProducts[productUpdateLike].ownerId,
          state.availableProducts[productUpdateLike].title,
          state.availableProducts[productUpdateLike].imageUrl,
          state.availableProducts[productUpdateLike].description,
          state.availableProducts[productUpdateLike].price,
          action.likeTotal - 1)
      }
      else {
        const updateProductLike = new Product(
          action.productId,
          state.availableProducts[productUpdateLike].ownerId,
          state.availableProducts[productUpdateLike].title,
          state.availableProducts[productUpdateLike].imageUrl,
          state.availableProducts[productUpdateLike].description,
          state.availableProducts[productUpdateLike].price,
          0)
      }
      const updateAvailableProduct = [...availableProducts]
      updateAvailableProduct[productUpdateLike] = updateProductLike

      if (existingIndex >= 0) {
        const updateFavProduct = [...state.favoriteProduct]
        updateFavProduct.splice(existingIndex, 1)
        return {
          ...state,
          favoriteProduct: updateFavProduct,
          availableProducts: updateAvailableProduct
        }
      } else {
        const product = state.availableProducts.find(pro => pro.id === action.productId)
        return {
          ...state,
          favoriteProduct: state.favoriteProduct.concat(product),
          availableProducts: updateAvailableProduct
        }
      }
  }

  return state;
}
