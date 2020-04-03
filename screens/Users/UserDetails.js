import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import IconHeader from '../../components/UI/IconHeader'
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserDetails = (props) => {
    const checkLogin = useSelector(state => state.auth.userId)

    const Details = () => {
        if (checkLogin === null) {
            return <View style={styles.container}>
                <TouchableOpacity onPress={()=>{}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>会員登録・ログインへ</Text>
                </TouchableOpacity>

            </View>
        } else {
            return <View>

            </View>
        }
    }



    return (
        <Details />

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

UserDetails.navigationOptions = (navData) => {
    return {
        headerTitle: '個人情報',
        // headerRight: (
        //     <IconHeader
        //         name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        //         onTapped={() => {
        //             navData.navigation.navigate('Cart');
        //         }}
        //     />
        // ),
        headerLeft: (
            <IconHeader
                name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onTapped={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        ),
    }
}

export default UserDetails