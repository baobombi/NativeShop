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
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native'; //ScrollView
import bannerImage from '../assets/temp/banner.jpg'
import Swiper from 'react-native-swiper';
import Colors from '../constants/Colors'

import littleIcon from '../assets/temp/little.jpg'
import maxiIcon from '../assets/temp/maxi.jpg'
import midiIcon from '../assets/temp/midi.jpg'
import partyIcon from '../assets/temp/party.jpg'
const { height, width } = Dimensions.get('window')
const imageWidth = width - 40
const imageHeight = (imageWidth / 933) * 465


const Category = (props) => {
    //const { navigate } = this.props.navigation
    return (

        <View style={styles.wapper}>
            <View style={styles.textView}>
                <Text style={styles.textStyle}>{props.title}</Text>
            </View>
            <View style={styles.imageStyleView}>

                <Swiper style={styles.imageView} autoplay={true} activeDotColor={Colors.default} autoplayTimeout={2} >
                    <TouchableOpacity onPress={props.onSelect}
                    >
                        <ImageBackground style={styles.imageStyle} source={littleIcon} >
                            <Text style={styles.imageTextStyle}>Little Dress</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <ImageBackground style={styles.imageStyle} source={maxiIcon} >
                            <Text style={styles.imageTextStyle}>Maxi Dress</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <ImageBackground style={styles.imageStyle} source={midiIcon} >
                            <Text style={styles.imageTextStyle}>Midi Dress</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <ImageBackground style={styles.imageStyle} source={partyIcon} >
                            <Text style={styles.imageTextStyle}>Party Dress</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </Swiper>
            </View>
        </View >


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
        // flex: 4,
        //padding: 10,
    },

    imageStyle: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textStyle: {

        fontSize: 25,
        color: '#AFAEAF'
    },

    imageTextStyle: {
        fontSize: 15,
        fontFamily: 'Avenir',
        color: '#9A9A9A'
    },

    imageStyleView: {
        flex: 4,
        justifyContent: 'flex-end'
    }
})


export default Category