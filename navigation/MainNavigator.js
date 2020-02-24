import React from 'react'

import {
  Platform,
  Dimensions,
  Image,
  View,
  SafeAreaView,
  Button,
  ScrollView,
  Text
} from 'react-native';

import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
//import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors';
//import Login from '../screens/Users/Login'
import Home from '../screens/Shop/Home'
import ProductsOverView from '../screens/Shop/ProductsOverView';
import ProductDetail from '../screens/Shop/ProductDetail';
import Cart from '../screens/Shop/Cart';
import Favorities from '../screens/Shop/Favorities';
import IconHeader from '../components/UI/IconHeader';
import SplashScreen from '../screens/Users/SplashScreen';
import SignInScreen from '../screens/Users/SignInScreen';
import SignUpScreen from '../screens/Users/SignUpScreen';
import * as authActions from '../store/actions/auth'

import { useSelector, useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('screen');

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.default
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
}

const ProductsNavtigator = createStackNavigator({

  Home: Home,
  ProductsOverView: ProductsOverView,

  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: {
      header: null
    }
  },
  Cart: Cart,
}, {
  //mode: 'modal',
  initialRouteName: 'Home',
  defaultNavigationOptions: defaultNavOptions
}
)

const FavNavigator = createStackNavigator(
  {
    Favorities:
    {
      screen: Favorities
    },
    ProductDetail:
    {
      screen: ProductDetail,
      navigationOptions: {

        header: null
      }
    },
  },
  {
    initialRouteName: 'Favorities',
    defaultNavigationOptions: defaultNavOptions
  }
);

const CartNavigator = createStackNavigator(
  {
    Cart: {
      screen: Cart
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: ProductsNavtigator,
      navigationOptions: {

        tabBarIcon: tabInfo => {
          return (
            <Icon name={Platform.OS === 'android' ? 'md-home' : 'ios-home'} size={25} color={tabInfo.tintColor} />
          );
        },
        //tabBarColor: 'red',
      }
    },
    Favorites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <Icon name='ios-star' size={25} color={tabInfo.tintColor} />
        },
        //tabBarColor: Colors.primary,
      },
    },
  },
  {

    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {},
      activeTintColor: Colors.default
    }
  }
)

const ShopNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {

        drawerIcon: drawerConfig => <Icon
          name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
          size={23}
          color={drawerConfig.tintColor}
        />,
      }
    },
  },
  {
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    drawerWidth: Math.min(height, width) * 0.5,
    contentOptions: {
      activeTintColor: Colors.default
    },
    // contentComponent: props => (<DrawerContent {...props} />)
    contentComponent: props => {
      const dispatch = useDispatch()
      const checkLogin = useSelector(state => state.auth.userId)
      console.log(checkLogin)
      return (<View style={{ flex: 1, paddingTop: 20, }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerNavigatorItems {...props} />
          {
            checkLogin != null ?
              <Button title='Log Out' color={Colors.primary} onPress={() => {
                dispatch(authActions.logout())
                props.navigation.navigate('Shop')
                props.navigation.toggleDrawer()

              }} /> :
              <Button title='Log In' color={Colors.primary} onPress={() => {
                props.navigation.navigate('LoginNavigator')
              }} />
          }
        </SafeAreaView>
      </View>)
    }
  }
)

const LoginNavigator = createStackNavigator({

  // SplashScreen: {
  //   screen: SplashScreen,
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // },

  SignInScreen: {
    screen: SignInScreen,
    navigationOptions: {
      headerShown: false
    }
  },

  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      headerShown: false
    }
  },
})

const MainNavigator = createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    LoginNavigator: LoginNavigator,
    Shop: ShopNavigator,
    //Login: Login,

  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

ProductsNavtigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName == "ProductDetail") {
      tabBarVisible = false;
    }
  }
  return {
    tabBarVisible
  };
}

export default createAppContainer(MainNavigator);
