import React from 'react';
import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import Navigation from './navigation/MainNavigator';
import authReducer from './store/reducers/auth';
import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer
 });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}


export default App;