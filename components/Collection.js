import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image
    //ScrollView
} from 'react-native';
import bannerImage from '../assets/temp/banner.jpg'

const { height, width } = Dimensions.get('window')
const imageWidth = width - 40
const imageHeight = (imageWidth / 933) * 465

const Collection = (props) => {
    return (
        <View style={styles.wapper}>
            <View style={styles.textView}>
                <Text style={styles.textStyle}>{props.title}</Text>
            </View>
            <View style={styles.imageView}>
                <Image style={styles.imageStyle} source={bannerImage} />
            </View>

        </View>
    )

}

const styles = StyleSheet.create({

    wapper: {
        height: height * 0.3,
        backgroundColor: '#FFF',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0,
    },

    textView: {
        flex: 1,
        justifyContent: 'center'
        // backgroundColor: 'green'
    },

    imageView: {
        flex: 4,
        justifyContent:'flex-end'
        //padding: 10,
    },

    imageStyle: {
        height: imageHeight,
        width: imageWidth
    },

    textStyle: {

        fontSize: 25,
        color: '#AFAEAF'
    }
})


export default Collection