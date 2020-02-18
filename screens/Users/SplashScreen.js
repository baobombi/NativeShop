import React, { useEffect } from 'react'

import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import * as authActions from '../../store/actions/auth';

import Colors from '../../constants/Colors'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from 'react-redux';
const { height } = Dimensions.get('screen')
const height_logo = height * 0.7 * 0.4

console.disableYellowBox = true

const SplashScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                //props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);
Î
            if (expirationDate <= new Date() || !token || !userId) {
                //props.navigation.navigate('Auth');
                return;
            }
            const exTime = expirationDate.getTime() - new Date().getTime();
            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, exTime));
        };
        tryLogin();
    }, [dispatch]);


    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    source={require('../../assets/appIcon/logo.png')}
                    style={styles.logo}
                    resizeMode='stretch'
                />
            </View>
            <Animatable.View
                style={styles.footer}
                animation='fadeInUpBig'
            >
                <Text style={styles.title}>Stay connect with Every One</Text>
                <Text style={styles.text}>Sign in with Account</Text>
                <View style={styles.button}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Shop')}>
                        <LinearGradient colors={['#5db8fe', '#39cff2']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Shop</Text>
                            <MaterialIcons name='navigate-next' size={20} color='white' />
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('SignInScreen')}>
                        <LinearGradient colors={['#5db8fe', '#39cff2']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get Start!</Text>
                            <MaterialIcons name='navigate-next' size={20} color='white' />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.default
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
        paddingHorizontal: 30

    },

    logo: {
        width: height_logo,
        height: height_logo
    },

    title: {
        color: Colors.default,
        fontWeight: 'bold',
        fontSize: 20
    },

    text: {
        color: 'gray',
        marginTop: 5
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
        flexDirection: 'row'
    },

    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default SplashScreen;