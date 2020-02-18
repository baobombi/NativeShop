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
    ScrollView,
    TouchableOpacity,
    Modal,
    TouchableHighlight
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import IconHeader from '../../components/UI/IconHeader';
import Colors from '../../constants/Colors'
import CartItem from '../../components/UI/Cart/CartItem'
import * as ordersActions from '../../store/actions/orders'
import * as cartActions from '../../store/actions/cart'

const { height, width } = Dimensions.get('screen')

const Cart = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    //const [total, setTotal] = useState('')
    const dispatch = useDispatch()
    const cartToAmount = useSelector(state => state.cart.totalAmount)
    const quantityTotal = useSelector(state => state.cart.totalQuantity)
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push(
                {
                    productId: key,
                    productTitle: state.cart.items[key].productTitle,
                    productPrice: state.cart.items[key].productPrice,
                    quantity: state.cart.items[key].quantity,
                    sum: state.cart.items[key].sum,
                    imageProduct: state.cart.items[key].imageProduct

                }
            )

        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
        return;
    })
    if (cartItems.length == 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, opacity: 0.5, fontWeight: 'bold' }}>Nothing In Your Eyes</Text>
            </View>
        )
    }
    const Line = (props) => {
        return (
            <View style={styles.line}></View>
        )
    }
    const seletectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title,
            }
        })
    }
    const sendOrderHandle = async () => {
        setIsLoading(true)
        await dispatch(ordersActions.addOrder(cartItems, cartToAmount))
        setIsLoading(false)
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.header}>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData => (
                        <CartItem
                            onClick={() => seletectItemHandler(itemData.item.productId, itemData.item.productTitle)}
                            image={itemData.item.imageProduct}
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            amount={itemData.item.sum}
                            idRemove={itemData.item.productId}
                            changeDetails={(key, value) => dispatch(cartActions.changeCartItem(key, value))}
                            deletable
                        />
                    )}
                />

                <View style={styles.totalDetails}>
                    <View style={styles.total}>
                        <Text style={styles.textStyle}>小計</Text>
                        <Text style={styles.textStyle}>¥ {cartToAmount.toFixed(2)}</Text>
                    </View>

                    <View style={styles.total}>
                        <Text style={styles.textStyle}>配送</Text>
                        <Text style={styles.textStyle}>通常-無料</Text>
                    </View>
                    <View style={styles.total}>
                        <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>合計　(税込)</Text>
                        <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>¥ {cartToAmount.toFixed(2)}</Text>
                    </View>

                </View>
            </ScrollView>
            <Line />
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => {
                    setModalVisible(true)
                }}>
                    <View style={styles.buttonView}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>ご購入の手続き</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalViewContainer}>
                    {isLoading ? <View style={styles.viewLoad}>
                        <ActivityIndicator size='small' color={Colors.primary} />
                    </View> :
                        <View style={styles.modalViewDetail}>
                            <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ご購入の手続き</Text>
                                <Text style={{ marginTop: 5, fontSize: 17, opacity: 0.8 }}>{quantityTotal}件の商品</Text>
                            </View>
                            <Line />
                            <TouchableOpacity onPress={() => { sendOrderHandle }}>
                                <View style={styles.buttonView}>
                                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>お支払いを確定</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)
                            }}>
                                <View style={styles.buttonView}>
                                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>戻り</Text>
                                </View>
                            </TouchableOpacity>
                        </View>}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({

    modalViewContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: height / 2,
        backgroundColor: 'rgba(0,0,0,0.5)',

    },

    modalViewDetail: {
        width: width,
        height: (height * 2) / 3,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'

    },

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
    totalDetails: {
        //flexDirection: 'row',
        padding: 20,
    },

    container: {
        flex: 1
    },
    header: {
        //backgroundColor: 'red'
    },

    footer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonView: {
        backgroundColor: 'black',
        height: height / 15,
        width: (width * 4) / 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },

    line: {
        borderWidth: 1,
        width: width,
        borderColor: Colors.background
    }
})
Cart.navigationOptions = navData => {
    return {
        headerTitle: 'カート',
        headerBackTitle: 'Back'

    };
}
export default Cart