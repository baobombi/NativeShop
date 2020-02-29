import React, { useState, useEffect, useCallback } from 'react'
import {
    ScrollView,
    Platform,
    ActivityIndicator,
    View,
    StyleSheet,
    Text,
    Dimensions,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    Animated,
    Modal
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import ButtonLogin from '../../components/UI/IconLogin/ButtonLogin'
import Colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
MaterialIcons.loadFont()
Icon.loadFont()
Fontisto.loadFont()
Feather.loadFont()

const { height, width } = Dimensions.get('window')
const HEADER_MAX_HEIGHT = height / 3
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ProductDetail = (props) => {

    //System Properties
    const dispatch = useDispatch();


    //Properties

    const [modalVisible, setModalVisible] = useState(false)

    const productId = props.navigation.getParam('productId')

    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    //console.log(selectedProduct.title)
    const currentFavoriteProduct = useSelector(state => state.products.favoriteProduct.some(prod => prod.id === productId));

    const currentUser = useSelector(state => state.auth.userId)

    //Scroll Header Modal
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    //Check Like button
    const checkUser = useCallback((currentUser) => {
        if (currentUser === null) {
            setModalVisible(true)
        }
        dispatch(productActions.addFavoriteProduct(productId, selectedProduct.likeTotal))
    }, [setModalVisible, dispatch, productId])

    const RenderScrollViewContent = () => {
        return (
            <View style={styles.header}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.modalViewContainer}>
                        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                            <View style={styles.modalViewDetail}>
                                <View style={styles.modalHeader}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Feather name='x' size={30} />
                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: width / 3, fontSize: 20, fontWeight: 'bold' }}>会員登録</Text>
                                </View>
                                <ButtonLogin />
                            </View>
                        </SafeAreaView>

                    </View>
                </Modal>
                <ImageBackground style={styles.image} source={{ uri: selectedProduct?.imageUrl }} >
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={styles.backIcon}
                    >
                        <Icon name='ios-arrow-back' size={30} />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.titleView}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{selectedProduct?.title}</Text>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonDetails} onPress={() => checkUser(currentUser)}>
                            <Icon name={currentFavoriteProduct ? 'ios-heart' : 'ios-heart-empty'} size={25}

                            />
                            <Text> いいね !</Text>
                        </TouchableOpacity>

                        {selectedProduct?.likeTotal > 0 &&
                            <View style={{ justifyContent: 'center', }}>
                                <Text style={{ opacity: 0.5, fontSize: 20 }}>{selectedProduct?.likeTotal}</Text>
                            </View>
                        }

                        <TouchableOpacity style={[styles.buttonDetails, { marginLeft: 10 }]}>
                            <Fontisto name='comment' size={20} />
                            <Text>コメント</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.background,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40,
                                width: 40,
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>...</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 15, padding: 15 }}>
                    <Text style={{ fontSize: 18, opacity: 0.6 }}>商品の説明</Text>
                </View>
                <View style={{ backgroundColor: 'white', width: '100%', padding: 15 }}>
                    <Text style={{ fontSize: 20 }}>{selectedProduct?.description}</Text>
                    <Text>{selectedProduct?.key} </Text>
                </View>

                <View style={{ backgroundColor: 'white', width: '100%', padding: 15 }}>
                    <Text style={{ fontSize: 20 }}>{selectedProduct?.description}</Text>

                    <Text>{selectedProduct?.key} </Text>
                </View>

                <View style={{ backgroundColor: 'white', width: '100%', padding: 15 }}>
                    <Text style={{ fontSize: 20 }}>{selectedProduct?.description}</Text>
                    <Text>{selectedProduct?.key} </Text>
                </View>

                <View style={{ backgroundColor: 'white', width: '100%', padding: 15 }}>
                    <Text style={{ fontSize: 20 }}>{selectedProduct?.description}</Text>
                    <Text>{selectedProduct?.key} </Text>
                </View>

                <View style={{ backgroundColor: 'white', width: '100%', padding: 15 }}>
                    <Text style={{ fontSize: 20 }}>{selectedProduct?.description}</Text>
                    <Text>{selectedProduct?.key} </Text>
                </View>
            </View>
        )
    }
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.background }} />
            <SafeAreaView style={styles.container}>
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }]
                    )}
                    style={styles.scrollHeader}
                >
                    <RenderScrollViewContent />
                </ScrollView>

                <Animated.View style={[styles.viewBar, { height: headerHeight }]}>
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={styles.backIcon}
                    >
                        <Icon name='ios-arrow-back' color='white' size={30} />
                    </TouchableOpacity>
                    <Animated.View style={styles.bar}>
                        <Text style={styles.titleBar}>{selectedProduct?.title}</Text>
                    </Animated.View>
                </Animated.View>


                <View style={styles.footer}>
                    <View style={styles.viewBottom}>
                        <Text style={styles.price}>${selectedProduct?.price.toFixed(2)}</Text>
                        <TouchableOpacity
                            onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
                            style={styles.addButton}>
                            <Text style={styles.addButtonText}>カートに追加</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView >
        </>
    )
}

const styles = StyleSheet.create({

    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,

    },

    modalViewDetail: {
        width: width,
        height: height,
        backgroundColor: 'white',
    },

    modalViewContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: height / 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        //backgroundColor: 'red'
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },

    header: {
        marginTop: 0
    },

    viewBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.default,
        overflow: 'hidden',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'

    },

    bar: {
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: width / 3

    },

    titleBar: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },

    buttonDetails: {
        backgroundColor: Colors.background,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 7,
        borderRadius: 30,
        width: width / 4,
    },

    buttonView: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-around',
    },

    titleView: {
        backgroundColor: 'white',
        padding: 15
    },

    backIcon: {
        marginLeft: 10,
        marginTop: 5
    },

    container: {
        flex: 1,
        backgroundColor: Colors.default
    },
    scrollHeader: {
        flex: 1,
        backgroundColor: Colors.background
    },

    footer: {
        backgroundColor: '#290606',
        width: '100%',
        height: height / 12,
    },
    viewBottom: {
        backgroundColor: Colors.default,
        width: '100%',
        height: height / 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },

    image: {
        width: '100%',
        height: height / 3,
    },

    price: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },

    addButton: {
        backgroundColor: '#290606',
        height: 40,
        width: width / 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    addButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },

    description: {
        fontSize: 15,
        textAlign: 'center',
        marginHorizontal: 20,
    },

    actions: {
        margin: 10,
        textAlign: 'center',
    },

    favoriteView: {
        width: '100%',
        height: height / 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    favoriteViewBox1: {
        flexDirection: 'row',
        borderWidth: 0.5,
        height: 30,
        width: width / 3,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderColor: '#A4A4A4',
        borderRadius: 10
    },

    textStyle: {
        fontSize: 20,
    },
})

export default ProductDetail