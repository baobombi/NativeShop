import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_FAVORITE_PRODUCT,
  SET_FILTERS,
  SET_PRODUCT,
  SEARCH_PRODUCT,
  SET_FAVORITES,
} from '../actions/products';
import Product from '../../models/product';
import Favorite from '../../models/favorite';
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
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case SET_FAVORITES:
      return {
        ...state,
        favoriteProduct: action.favs,
      };
    case ADD_FAVORITE_PRODUCT:
      const existingIndex = state.favoriteProduct.findIndex(
        product => product.id === action.favoriteProduct.productId,
      );
      if (existingIndex >= 0) {
        const updateFavoriteProduct = [...state.favoriteProduct];
        updateFavoriteProduct.splice(existingIndex, 1);
        return {
          ...state,
          favoriteProduct: updateFavoriteProduct,
        };
      } else {
        // const product = state.availableProducts.find(
        //   pro => pro.id === action.favoriteProduct.productId,
        // );
        const favChange = action.favoriteProduct;
        const newFavProduct = new Favorite(
          favChange.userId,
          favChange.productId,
          favChange.productTitle,
          favChange.productImage,
          favChange.productPrice,
        );
        return {
          ...state,
          favoriteProduct: state.favoriteProduct.concat(newFavProduct),
        };
      }
  }

  return state;
};
