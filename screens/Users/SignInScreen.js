import React, {
  useState,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
//Component
import LineOption from '../../components/UI/IconLogin/LoginOptions';
import Colors from '../../constants/Colors';
import Inputs from '../../components/Inputs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '../../components/UI/IconLogin/CheckBox';
//Redux
import * as Animatable from 'react-native-animatable';
import * as authActions from '../../store/actions/auth';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const {height, width} = Dimensions.get('screen');
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updateValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updateValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updateFormIsValid = true;
      for (const key in updateValidities) {
        updateFormIsValid = updateFormIsValid && updateValidities[key];
      }
      return {
        formIsValid: updateFormIsValid,
        inputValidities: updateValidities,
        inputValues: updateValues,
      };

    default:
      return state;
  }
};

const SignInScreen = props => {
  //console.log('aaaa');
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [isLoginError, setIsLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userName, setUsername] = useState('');

  const mountedRef = useRef(true);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('The username or password is incorrect', error, [
        {text: 'OK'},
      ]);
    } else if (isLoginError) {
      Alert.alert('The username or password is incorrect', isLoginError, [
        {text: 'OK'},
      ]);
    }
  }, [error, isLoginError]);

  useEffect(() => {
    //console.log('truoc khi componet render1111');
    getRememberUser();
    setRememberMe(true);

    return () => {
      setRememberMe(false);
    };
  }, []);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const LoginHandler = useCallback(async () => {
    setError(null);
    if (!formState.formIsValid) {
      Alert.alert(
        'やり直してください',
        'ユーザー名とパスワードがご登録の内容と異なっています。ご確認の上、再度お試してください',
        [{text: 'OK'}],
      );
      return;
    }
    setIsLoginError(null);
    setIsLoginLoading(true);

    try {
      await dispatch(
        authActions.login(
          formState.inputValues.email,
          formState.inputValues.password,
        ),
      );
      if (rememberMe == true) {
        setRememberUser();
      } else {
        removeRememberUser();
      }
      setRememberMe(false);
      props.navigation.navigate('Shop');
      setIsLoginLoading(false);
    } catch (err) {
      setIsLoginError(err.message);
      setIsLoginLoading(false);
    }
  }, [dispatch, formState, rememberMe]);

  //console.log(rememberMe);
  const checkBoxHandle = useCallback(() => {
    if (rememberMe == true) {
      setRememberMe(false);
    } else if (rememberMe == false) {
      setRememberMe(true);
    }
  }, [setRememberMe]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const disableLoginButton = useCallback(() => {
    if (
      formState.inputValues.email.trim().length > 0 &&
      formState.inputValues.password.trim().length > 0
    ) {
      setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
  }, [formState.inputValues.email, formState.inputValues.password]);

  useEffect(() => {
    disableLoginButton();
  }, [disableLoginButton]);

  const setRememberUser = async () => {
    await AsyncStorage.setItem(
      'username',
      JSON.stringify({savedUserName: formState.inputValues.email}),
    );
  };
  const removeRememberUser = async () => {
    await AsyncStorage.removeItem('username');
  };

  const getRememberUser = useCallback(async () => {
    try {
      const userName = await AsyncStorage.getItem('username');

      if (!userName) {
        return;
      }
      if (!mountedRef.current) {
        return null;
      }
      const transFormData = JSON.parse(userName);
      const {savedUserName} = transFormData;
      //console.log('user name da save: ', savedUserName);
      if (!savedUserName) {
        return;
      }
      setUsername(savedUserName);
    } catch (err) {
      console.log(err);
    }
  }, []);
  //console.log('user name la: ',userName)
  //console.log('truoc khi componet render');
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Native Shop</Text>
          </View>
          <Animatable.View
            duration={1000}
            animation="fadeInUpBig"
            style={styles.footer}>
            <Text style={styles.textFooter}>E-MAIL</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={Colors.default} size={20} />
              <Inputs
                style={styles.textInput}
                placeholder="Enter your email..."
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                id="email"
                errorText="Please enter a email!"
                required
                Loginn
                initialValue={userName}
                onInputChange={inputChangeHandler}
              />
              <Feather name="check-circle" color={Colors.default} size={20} />
            </View>

            <Text
              style={[
                styles.textFooter,
                {
                  marginTop: 35,
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <FontAwesome name="lock" color={Colors.default} size={20} />
              <Inputs
                style={styles.textInput}
                Login
                id="password"
                placeholder="Enter your password..."
                autoCapitalize="none"
                secureTextEntry={!isShowPassword}
                returnKeyType="next"
                errorText="Please enter a password"
                onInputChange={inputChangeHandler}
                initialValue=""
                required
              />
              <TouchableOpacity
                onPress={() =>
                  setIsShowPassword(isShowPassword => !isShowPassword)
                }>
                <Feather name="eye-off" color="gray" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.rememberMeOverView}>
              <View style={styles.rememberMeView}>
                <TouchableOpacity
                //onPress={checkBoxHandle}
                >
                  <CheckBox
                    name={rememberMe ? 'checkbox-active' : 'checkbox-passive'}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: 1, fontSize: 15, color: '#009bd1'}}>
                  Remember Me
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#009bd1', fontSize: 15}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUpScreen')}>
              <Text style={{color: '#009bd1', marginTop: 20, fontSize: 15}}>
                Register
              </Text>
            </TouchableOpacity> */}
            <View style={styles.button}>
              {!isLoginLoading ? (
                <TouchableOpacity
                  style={{width: '100%'}}
                  //activeOpacity={true}
                  onPress={LoginHandler}
                  //disabled={disableLogin}
                >
                  <View style={[styles.signIn, {backgroundColor: '#5db8fe'}]}>
                    <Text style={styles.textSignIn}>Login</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.loginLoading}>
                  <ActivityIndicator size="small" color={Colors.primary} />
                </View>
              )}
              <View style={styles.optionLogin}>
                <LineOption />
                <Text>OR</Text>
                <LineOption />
              </View>
              <TouchableOpacity
                style={[
                  styles.signIn,
                  {
                    borderColor: '#4dc2f8',
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}
                onPress={() => props.navigation.navigate('SignUpScreen')}>
                <Text style={[styles.textSignIn, {color: '#4dc2f8'}]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  rememberMeView: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor:'red',
    flex: 5,
  },
  rememberMeOverView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 5,
    //backgroundColor:'green'
  },

  container: {
    flex: 1,
    backgroundColor: Colors.default,
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },

  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  textHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    fontSize: 18,
    color: Colors.default,
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    //borderBottomWidth: 1,
    //borderBottomColor: '#f2f2f2',
    // paddingBottom: 5,
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
    //height: 50
    //height: 30
  },

  textInput: {
    paddingLeft: 10,
    flex: 1,
  },

  button: {
    alignItems: 'center',
    marginTop: 0.04 * height,
  },

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  textSignIn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  optionLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 30,
  },
});

export default SignInScreen;
