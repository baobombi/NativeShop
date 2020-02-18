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


  }

  return state;
}
