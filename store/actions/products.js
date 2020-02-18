// export const ADD_FAVORITE_PRODUCT = 'ADD_FAVORITE_PRODUCT'

// export const DELETE_PRODUCT = 'DELETE_PRODUCT'

// export const CREATE_PRODUCT = 'CREATE_PRODUCT'

// export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// export const SET_FILTERS = 'SET_FILTERS'


// export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
import Product from '../..//models/product'
export const SET_PRODUCT = 'SET_PRODUCT'
export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shopapp-4686f.firebaseio.com/products.json', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Some thing went wrong!')
            }
            const resData = await response.json()
            //console.log(resData)

            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(new Product(key, resData[key].ownerId, resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price))
            }

            dispatch({
                type: SET_PRODUCT,
                products: loadedProducts,
            })
        } catch (err) {
            throw err
        }
    }
}
