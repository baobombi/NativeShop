import React, { useState, useEffect, useCallback } from 'react'
import {
    ScrollView,
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
import * as productsActions from '../../store/actions/products'
import IconHeader from '../../components/UI/IconHeader';
import Colors from '../../constants/Colors'
import CollectionView from '../../components/Collection'
import Category from '../../components/Category'


const { height } = Dimensions.get('window')

const Home = (props) => {
    

    return (
        <ScrollView>
            <View style={styles.container}>
                <CollectionView title='春コレクション' />
                <Category title='項目リスト' onSelect={() => props.navigation.navigate('ProductsOverView')} />
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#DBDBD8'
       
    }

})
Home.navigationOptions = navData => {

    return {
        headerTitle: 'ライフスタイル',

        headerLeft: <IconHeader
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onTapped={() => {
                navData.navigation.toggleDrawer();
            }}
        />,

        headerRight: <IconHeader
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onTapped={() => {
                navData.navigation.navigate('Cart')
            }}
        />,

        headerBackTitle: '戻り'

    };
}
export default Home