import React, { useState, useEffect, useCallback } from 'react'
import {
    FlatList,
    Platform,
    Button,
    ActivityIndicator,
    View,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
// //import ProductItem from '../../components/shop/ProductItem'
// import * as cartActions from '../../store/actions/cart'
// import * as productsActions from '../../store/actions/products'
import IconHeader from '../../components/UI/IconHeader';
import Colors from '../../constants/Colors'

const { height} = Dimensions.get('window')

const Favorities = () => {
    return (
        <View><Text>Favorites</Text></View>
    )

}

const styles = StyleSheet.create({

})
Favorities.navigationOptions = navData => {
    return {
        headerTitle: 'Wearing a Dress',
        headerRight: <IconHeader
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onTapped={() => {
                
            }}
        />,
        headerLeft: <IconHeader
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onTapped={() => {
              
            }}

        />,
        headerBackTitle: 'Back'

    };
}
export default Favorities