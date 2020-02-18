import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image

} from 'react-native'

import Colors from '../../../constants/Colors'
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Dropdown } from 'react-native-material-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../../store/actions/cart'

const { height, width } = Dimensions.get('screen')

const CartItem = (props) => {

    const dispatch = useDispatch()

    const Line = (props) => {
        return (
            <View style={styles.line}></View>
        )
    }
    const [data, setData] = useState(
        [{
            value: '0',
            label: '削除'
        },
        {
            value: '1',
            label: '1'
        }, {
            value: '2',
            label: '2'
        }, {
            value: '3',
            label: '3'
        }, {
            value: '4',
            label: '4'
        }, {
            value: '5',
            label: '5'
        }, {
            value: '6',
            label: '6'
        }, {
            value: '7',
            label: '7'
        }, {
            value: '8',
            label: '8'
        }, {
            value: '9',
            label: '9'
        }, {
            value: '10',
            label: '10'
        },

        ])

    return (
        <View style={styles.container}>
            <View style={styles.imageTitle}>
                <TouchableOpacity onPress={props.onClick}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                </TouchableOpacity>
                <View style={{ marginLeft: 5 }}>
                    <TouchableOpacity onPress={props.onClick}>
                        <Text style={{ fontSize: 25 }}>{props.title}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 25, opacity: 0.5 }}>Add description here!!</Text>
                </View>
            </View>

            <View style={styles.details}>
                <Dropdown
                    fontSize={20}
                    labelFontSize={18}
                    value={props.quantity}
                    containerStyle={styles.dropDown}
                    label='数量'
                    data={data}
                    pickerStyle={{ borderBottomColor: 'transparent', borderWidth: 0 }}
                    dropdownOffset={{ 'top': 30 }}
                    onChangeText={(value) => props.changeDetails(props.idRemove, value)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>¥ {Math.round(props.amount.toFixed(2) * 100) / 100}</Text>
            </View>
            <Line />
        </View>
    )
}

const styles = StyleSheet.create({

    textStyle: {
        fontSize: 20,

    },

    total: {
        //marginTop: 10,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },

    dropDown: {
        width: '50%',
    },

    headerText: {
        fontSize: 20,
        margin: 10,
        fontWeight: "bold"
    },
    menuContent: {
        color: "#000",
        fontWeight: "bold",
        padding: 2,
        fontSize: 20
    },

    details: {
        flexDirection: 'row',
        justifyContent: 'space-between'
        // backgroundColor: 'red'
    },

    imageTitle: {
        flexDirection: 'row',
        //backgroundColor: 'green'

    },

    image: {
        height: height / 7,
        width: width / 4,
    },

    container: {
        padding: 20,

    },

    line: {
        borderWidth: 1,
        borderColor: Colors.background,
        marginTop: 10
    }
})
export default CartItem