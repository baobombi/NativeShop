import React, { useState, useEffect, useCallback } from 'react'
import {
    FlatList,
    Platform,
    Button,
    ActivityIndicator,
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
// //import ProductItem from '../../components/shop/ProductItem'
// import * as cartActions from '../../store/actions/cart'
// import * as productsActions from '../../store/actions/products'
import IconHeader from '../../components/UI/IconHeader';
import Colors from '../../constants/Colors'
import Popover from 'react-native-popover-view';

const { height } = Dimensions.get('window')

const Favorities = (props) => {
    const [isVisible, setIsVisible] = useState(false)
    let touchable = React.createRef()
    const showPopover = () => {
        setIsVisible(true)
        console.log(isVisible)
        // touchable.measure((ox, oy, width, height, px, py) => {

        //     //setButtonRect({ x: px, y: py, width: width, height: height })
        // })
    };
    const closePopove = () => {
        setIsVisible(false)
        console.log(isVisible)
    }
    return (
        <>
            <TouchableOpacity onPress={() => { }} ref={ref => touchable = ref} onLongPress={showPopover}>
                <View style={styles.container}>
                    <View style={styles.priceStyle}>
                        <Text style={styles.textStyle}>aaaaaaaaaaaaaaaa</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Popover
                isVisible={isVisible}
                fromView={touchable}
                onRequestClose={() => closePopove()}
            >

                <Text>I'm the content of this popover!</Text>
            </Popover>
        </>
    )

}

const styles = StyleSheet.create({

})
Favorities.navigationOptions = navData => {
 
    return {
        headerTitle: 'お気に入り',
        // headerRight: <IconHeader
        //     name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        //     onTapped={() => {
        //         navData.navigation.navigate('Cart');
        //     }}
        // />,
        headerLeft: <IconHeader
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onTapped={() => {
                navData.navigation.toggleDrawer()
        
            }}

        />,
        headerBackTitle: 'Back'

    };
}
export default Favorities