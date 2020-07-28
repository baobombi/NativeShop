import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as authActions from '../../store/actions/auth';
import * as languageAction from '../../store/actions/language';
import Colors from '../../constants/Colors';
import * as Animatable from 'react-native-animatable';
import AppText from '../../src/i18n/app-text';
import {useDispatch, useSelector} from 'react-redux';

const {height} = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.4;
const SplashScreen = props => {
  const dispatch = useDispatch();
  const currentLanguae = useSelector(state => state.language.language);
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      //console.log('da ta da duoc luu : ', userData);
      if (!userData) {
        //props.navigation.navigate('LoginNavigator');
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate('LoginNavigator');
        return;
      }
      const exTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, exTime));
      props.navigation.navigate('Shop');
    };
    tryLogin();
  }, [dispatch]);
  //console.log('current language', currentLanguae);

  const setLanguage = language => {
    //console.log('selected language', language);
    dispatch(languageAction.changeLanguage(language));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('../../assets/appIcon/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Stay connect with Every One</Text>
        <Text style={styles.text}>Sign in with Account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Shop')}>
            <LinearGradient
              colors={['#5db8fe', '#39cff2']}
              style={styles.signIn}>
              {/* <Text style={styles.textSign}>Shop</Text> */}
              <AppText style={styles.textSign} i18nKey={'home'}>
                Home
              </AppText>

              <MaterialIcons name="navigate-next" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('SignInScreen')}>
            <LinearGradient
              colors={['#5db8fe', '#39cff2']}
              style={styles.signIn}>
              <AppText style={styles.textSign} i18nKey={'start'}>
                Start
              </AppText>
              {/* <Text style={styles.textSign}>Get Start!</Text> */}
              <MaterialIcons name="navigate-next" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={() => setLanguage('vi')}>
            <LinearGradient
              colors={['#5db8fe', '#39cff2']}
              style={styles.signIn}>
              <Text style={styles.textSign}>VI</Text>
              <MaterialIcons name="navigate-next" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setLanguage('ja')}>
            <LinearGradient
              colors={['#5db8fe', '#39cff2']}
              style={styles.signIn}>
              <Text style={styles.textSign}>JP</Text>
              <MaterialIcons name="navigate-next" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
  },

  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  logo: {
    width: height_logo,
    height: height_logo,
  },

  title: {
    color: Colors.default,
    fontWeight: 'bold',
    fontSize: 20,
  },

  text: {
    color: 'gray',
    marginTop: 5,
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },

  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
