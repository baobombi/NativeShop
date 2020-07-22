import Product from '../..//models/product';
import Favorites from '../../models/favorites';
import {AsyncStorage} from 'react-native';

export const ADD_FAVORITE_PRODUCT = 'ADD_FAVORITE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_FAVORITES = 'SET_FAVORITES';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://rn-shopapp-4686f.firebaseio.com/products.json',
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('Some thing went wrong!');
      }
      const resData = await response.json();
      //console.log(resData)

      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
            resData[key].likeTotal,
          ),
        );
      }

      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const deleteFavoriteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-shopapp-4686f.firebaseio.com/favorites/${userId}/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );
    //console.log('day la response:', response);
    if (!response.ok) {
      throw new Error('Some thing went wrong!');
    }

    dispatch({
      type: ADD_FAVORITE_PRODUCT,
      favoriteProduct: {
        productId: productId,
      },
    });
  };
};

export const addFavoriteProduct = (productId, productImage, productPrice) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://rn-shopapp-4686f.firebaseio.com/favorites/${userId}/${productId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          productImage,
          productPrice,
        }),
      },
    );
    console.log(userId);
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    //const resData = await response.json();

    dispatch({
      type: ADD_FAVORITE_PRODUCT,
      favoriteProduct: {
        productId: productId,
      },
    });
  };
};
