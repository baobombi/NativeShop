import React,{useState, useEffect}  from 'react';
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
import orderReducer from './store/reducers/orders'
import FCMService from './src/FCMService';
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  orders: orderReducer,
 });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
var fcmNotification = new FCMService(); 
const App = () => {
const onRegister = token => {
    console.log('[NotificationFCM] onRegister', token);
  };
  const onNotification = notify => {
    console.log('[NotificationFCM] onNotification', notify);
    //Handle push notification

    const channelObj = {
      channelId: 'SampleChannelID',
      channelName: 'SampleChannelName',
      channelDes: 'SampleChannelDes',
    };
    const channel = fcmNotification.buildChannel(channelObj);

    const buildNotify = {
      dataId: notify.notificationId,
      title: notify._title,
      content: notify._body,
      sound: 'default',
      channel: channel,
      data: {},
      colorBgIcon: '#1A243B',
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      vibrate: true,
    };
    const notification = fcmNotification.buidlNotification(buildNotify);
    fcmNotification.displayNotification(notification);
  };

  const onOpenNotification = notify => {
    console.log('[NotificationFCM] onOpenNotification', notify);
    alert('Open Notification: ' + notify._body);
  };

  useEffect(() => {
    fcmNotification.register(onRegister, onNotification, onOpenNotification);
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App;