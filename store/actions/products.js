import Product from '../..//models/product';
import Favorite from '../../models/favorite';
import {AsyncStorage} from 'react-native';

export const ADD_FAVORITE_PRODUCT = 'ADD_FAVORITE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_FAVORITES = 'SET_FAVORITES';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

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

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-shopapp-4686f.firebaseio.com//products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      },
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const fetchFavorites = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rn-shopapp-4686f.firebaseio.com/favorites/${userId}.json`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('Some thing went wrong!');
      }
      const resData = await response.json();
      const loadFav = [];
      for (const key in resData) {
        loadFav.push(
          new Favorite(
            resData[key].userId,
            resData[key].productId,
            resData[key].productTitle,
            resData[key].productImage,
            resData[key].productPrice,
          ),
        );
      }
      //console.log(loadFav)
      dispatch({
        type: SET_FAVORITES,
        favs: loadFav,
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
      `https://rn-shopapp-4686f.firebaseio.com/favorites/${userId}.json?auth=${token}`,
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

export const addFavoriteProduct = (
  productId,
  productTitle,
  productImage,
  productPrice,
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://rn-shopapp-4686f.firebaseio.com/favorites/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
          productTitle,
          productImage,
          productPrice,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: ADD_FAVORITE_PRODUCT,
      favoriteProduct: {
        userId: userId,
        productId: productId,
        productTitle: productTitle,
        productImage: productImage,
        productPrice: productPrice,
      },
    });
  };
};
