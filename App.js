import React, {useEffect} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Navigation from './navigation/MainNavigator';
import authReducer from './store/reducers/auth';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import languagReducer from './store/reducers/language';
import FCMService from './src/FCMService';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  orders: orderReducer,
  language: languagReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
//console.log('aaaaa')
var fcmNotification = new FCMService();
const App = () => {
  const dateExit = new Date();
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
      //dataId: notify._messageId,
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

  const scheduleNotificationDevice = () => {
    const channelObjSch = {
      channelId: 'SampleChannelID',
      channelName: 'SampleChannelName',
      channelDes: 'SampleChannelDes',
    };
    const channelSch = fcmNotification.buildChannel(channelObjSch);

    const buildNotifySch = {
      dataId: notify.notificationId,
      //dataId: notify._messageId,
      title: 'Native Device Shop',
      content: 'Chao mung ban quay lai voi Native Shop',
      sound: 'default',
      channel: channel,
      data: {},
      colorBgIcon: '#1A243B',
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      vibrate: true,
    };
    const notificationSch = fcmNotification.buidlNotification(buildNotifySch);
    fcmNotification.displayNotification(notification);
    //console.log("Da di vao day")
  };
  useEffect(() => {
    fcmNotification.register(onRegister, onNotification, onOpenNotification);
    fcmNotification.scheduleNotification(
      scheduleNotificationDevice,
      dateExit.setDate(0),
      dateExit.setMinutes(1),
    );
  }, [scheduleNotificationDevice]);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
