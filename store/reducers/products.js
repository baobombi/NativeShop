import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_FAVORITE_PRODUCT,
  SET_FILTERS,
  SET_PRODUCT,
  SEARCH_PRODUCT,
} from '../actions/products';
import Product from '../../models/product';

const initialState = {
  availableProducts: [],
  favoriteProduct: [],
  userProducts: [],
  searchProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        availableProducts: action.products,
      };

    case ADD_FAVORITE_PRODUCT:
      const existingIndex = state.favoriteProduct.findIndex(
        product => product.id === action.favoriteProduct.productId,
      );
      //console.log('da di vao ham nay')
      //console.log(existingIndex)
      if (existingIndex >= 0) {
        const updateFavoriteProduct = [...state.favoriteProduct];
        updateFavoriteProduct.splice(existingIndex, 1);
        return {
          ...state,
          favoriteProduct: updateFavoriteProduct,
        };
      } else {
        const product = state.availableProducts.find(
          pro => pro.id === action.favoriteProduct.productId,
        );
        return {
          ...state,
          favoriteProduct: state.favoriteProduct.concat(product),
        };
      }
  }

  return state;
};
