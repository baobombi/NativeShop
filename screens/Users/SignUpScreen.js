import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as authActions from '../../store/actions/auth';
import {useDispatch} from 'react-redux';

FontAwesome.loadFont();
Feather.loadFont();

const SignUpScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const singUpHandler = () => {
    dispatch(authActions.signup(email, password));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Register</Text>
        </View>
        <Animatable.View
          duration={1000}
          animation="fadeInUpBig"
          style={styles.footer}>
          <Text style={styles.textFooter}>E-Mail</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={Colors.default} size={20} />
            <TextInput
              placeholder="Enter your email..."
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={email => setEmail(email)}
            />
            <Feather name="check-circle" color={Colors.default} size={20} />
          </View>

          <Text style={[styles.textFooter, {marginTop: 35}]}>Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color={Colors.default} size={20} />
            <TextInput
              placeholder="Enter your password..."
              autoCapitalize="none"
              onChangeText={password => setPassword(password)}
              style={styles.textInput}
            />
            <Feather name="eye-off" color="gray" size={20} />
          </View>

          <Text style={[styles.textFooter, {marginTop: 35}]}>Phone Number</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color={Colors.default} size={20} />
            <TextInput
              keyboardType="numeric"
              placeholder="Enter your Phone Number..."
              autoCapitalize="none"
              onChangeText={password => setPassword(password)}
              style={styles.textInput}
            />
            <Feather name="eye-off" color="gray" size={20} />
          </View>

          <TouchableOpacity>
            <Text style={{color: '#009bd1', marginTop: 15}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity style={{width: '100%'}} onPress={singUpHandler}>
              <LinearGradient
                colors={['#5db8fe', '#39cff2']}
                style={styles.signIn}>
                <Text style={styles.textSignIn}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  borderColor: '#4dc2f8',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={() => props.navigation.navigate('SignInScreen')}>
              <Text style={[styles.textSignIn, {color: '#4dc2f8'}]}>Login</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
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
    marginTop: 50,
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
});

export default SignUpScreen;
