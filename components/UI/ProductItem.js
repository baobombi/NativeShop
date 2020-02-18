import React from 'react'

import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';


const { width, height } = Dimensions.get('window')
const productWidthView = width / 3.2
const productHeightView = height / 6

const ProductItem = props => {
    return (
        <TouchableOpacity onPress={props.onSelect}>
            <View style={styles.container}>
                <ImageBackground style={styles.image} source={{ uri: props.image }} >
                    <View style={styles.priceStyle}>
                        <Text style={styles.textStyle}>{props.price}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    container: {
        margin: 3,
        backgroundColor: 'white',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        width: productWidthView,
        height: productHeightView,
        
    },

    image: {
        width: '100%',
        height: '100%'
    },

    priceStyle: {
        backgroundColor: '#1C1C1C',
        opacity: 0.55,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 109,
        borderRadius: 5,
        overflow: "hidden",
        marginLeft: 5,

    },

    textStyle: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',

    }

})
export default ProductItem