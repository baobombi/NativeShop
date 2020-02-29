import React, { useState } from 'react'

import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import Popover from 'react-native-popover-view';

const { width, height } = Dimensions.get('window')
const productWidthView = width / 3.2
const productHeightView = height / 6

const ProductItem = props => {
    const [isVisible, setIsVisible] = useState(false)
    const [buttonRect, setButtonRect] = useState({})
    var touchable = React.createRef()

    const showPopover = () => {
        setIsVisible(true)
        touchable.measure((ox, oy, width, height, px, py) => {
            console.log({ ox, oy, width, height, px, py });
            //setButtonRect({ x: px, y: py, width: width, height: height })
        })
    };
    const closePopove = () => {
        setIsVisible(false)
    }
    return (
        <>
            <TouchableOpacity onPress={props.onSelect} ref={ref => touchable = ref} onLongPress={showPopover}>
                <View style={styles.container}>
                    <ImageBackground style={styles.image} source={{ uri: props.image }} >
                        <View style={styles.priceStyle}>
                            <Text style={styles.textStyle}>{props.price}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
            <Popover
                isVisible={isVisible}
                fromView={touchable}
                onRequestClose={closePopove}>
                <Text>I'm the content of this popover!</Text>
            </Popover>
        </>
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