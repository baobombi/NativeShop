import React, {useState, useCallback, useEffect, useReducer} from 'react';
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
import Colors from '../../constants/Colors';
import Inputs from '../../components/Inputs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as authActions from '../../store/actions/auth';
import {useDispatch} from 'react-redux';

import LineOption from '../../components/UI/IconLogin/LoginOptions';

FontAwesome.loadFont();
Feather.loadFont();
const {height, width} = Dimensions.get('window');
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
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [isLoginError, setIsLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);

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
      props.navigation.navigate('Shop');
      setIsLoginLoading(false);
    } catch (err) {
      setIsLoginError(err.message);
      setIsLoginLoading(false);
    }
  }, [dispatch, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred', error, [{text: 'OK'}]);
    } else if (isLoginError) {
      Alert.alert('An Error Occurred', isLoginError, [{text: 'OK'}]);
    }
  }, [error, isLoginError]);

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

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Welcome NativeShop</Text>
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
                Login
                initialValue=""
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
                required
              />
              <TouchableOpacity
                onPress={() =>
                  setIsShowPassword(isShowPassword => !isShowPassword)
                }>
                <Feather name="eye-off" color="gray" size={20} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={{color: '#009bd1', marginTop: 15}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUpScreen')}>
              <Text style={{color: '#009bd1', marginTop: 15, fontSize: 15}}>
                Register
              </Text>
            </TouchableOpacity>
            <View style={styles.button}>
              {!isLoginLoading ? (
                <TouchableOpacity
                  style={{width: '100%'}}
                  //activeOpacity={true}
                  onPress={LoginHandler}
                  disabled={disableLogin}>
                  <View style={[styles.signIn, {backgroundColor: '#5db8fe'}]}>
                    <Text style={styles.textSignIn}>Login</Text>
                  </View>
                  {/* <LinearGradient
                    //colors={['#5db8fe', '#39cff2']}
                    style={styles.signIn}>
                    <Text style={styles.textSignIn}>Login</Text>
                  </LinearGradient> */}
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
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },

  textInput: {
    paddingLeft: 10,
    flex: 1,
  },

  button: {
    alignItems: 'center',
    marginTop: 0.02 * height,
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
