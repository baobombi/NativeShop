import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import Colors from '../../../constants/Colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as authActions from '../../../store/actions/auth'
import { useSelector, useDispatch } from 'react-redux'
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
FontAwesome.loadFont()
const { height, width } = Dimensions.get('window')


const ButtonLogin = (props) => {
    const dispath = useDispatch()
    const loginFacebook = async () => {
        try {
            let result = await LoginManager.logInWithPermissions(["public_profile"])
            //console.log(result)
            if (result.isCancelled) {
                console.log("Login cancelled");
            } else {
                const data = await AccessToken.getCurrentAccessToken()
                const accessToken = data.accessToken
                try {
                    await dispath(authActions.loginFacebook(accessToken))
                    props.navigation.navigate('Shop')
                } catch (err) {
                    console.log('Login failed with error' + err)
                }

            }
        } catch (error) {
            console.log('Login failed with error' + error)
        }

    }


    return (
        <View style={{ backgroundColor: Colors.background, flex: 1, }} >
            <View style={{ marginLeft: 20, marginRight: 20, height: 40, marginTop: 20 }}>
                <Text style={{ fontSize: 15, opacity: 0.5 }}>お互いに安心取引するためにまずは会員登録をよろしくお願いします</Text>
            </View>
            <View style={styles.down}>

                <TouchableOpacity style={styles.facebookButton} onPress={loginFacebook}>
                    <FontAwesome name='facebook' size={20} color='white' />
                    <Text style={styles.textButton}>Facebookで登録</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.facebookButton}>
                    <FontAwesome name='google' size={20} />
                    <Text style={styles.textButton}>Facebookで登録</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    textButton: {
        fontSize: 20,
        color: 'white'
    },

    down: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        //backgroundColor: 'red',
        //overflow:'hidden'
        //flex: 1
    },

    facebookButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: width * 2 / 3,
        marginBottom: 15,
        backgroundColor: Colors.facebook,



    },
    loginButtonTitle: {

        color: 'white',
        fontSize: 18
    },
})

export default ButtonLogin;