import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';

//Store
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
//Font
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
//Component
import ImageModal from '../../components/UI/Product/ImageModal';
import RegisterModal from '../../components/UI/Product/RegisterModal';

const {height, width} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height / 3;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
//console.log(HEADER_SCROLL_DISTANCE)

const ProductDetail = props => {
  //System Properties
  const dispatch = useDispatch();
  //Properties
  const [imageModal, setImageModal] = useState(false);
  // var likeTotal;
  const [modalVisible, setModalVisible] = useState(false);

  const productId = props.navigation.getParam('productId');

  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  //console.log(selectedProduct)

  const currentFavoriteProduct = useSelector(state =>
    state.products.favoriteProduct.some(prod => prod.id === productId),
  );

  const setFavoriteHandle = useCallback(() => {
    //console.log('da di vao day')
    dispatch(
      productActions.addFavoriteProduct(
        productId,
        selectedProduct.imageUrl,
        selectedProduct.price,
      ),
    );
  }, [dispatch, productId, selectedProduct.imageUrl, selectedProduct.price]);

  const deleteFavorite = useCallback(() => {
    dispatch(productActions.deleteFavoriteProduct(productId));
  }, [dispatch, productId]);

  //Animation
  // const opacity =  position.
  const scrollY = new Animated.Value(0);
  const isTop = 0;
  const isDisapearing = -HEADER_MIN_HEIGHT;
  const position = new Animated.subtract(HEADER_MIN_HEIGHT, scrollY);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    inputRange: [isDisapearing, isTop],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });
  const images = [
    {
      url: '',
      props: {
        source: {uri: selectedProduct?.imageUrl},
      },
      width: width,
      height: 450,
      //resizeMode: 'center',
    },
    {
      url: '',
      props: {
        source: {uri: selectedProduct?.imageUrl},
      },
      width: width,
      height: 450,
    },
  ];
  //Image Modal Handle
  const imageModalHideHandle = () => setImageModal(value => !value);
  const registerModalHandle = () => setModalVisible(false);

  const RenderScrollViewContent = () => {
    return (
      <View style={styles.header}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <RegisterModal registerModalHandle={registerModalHandle} />
        </Modal>
        <TouchableOpacity onLongPress={imageModalHideHandle}>
          <ImageBackground
            style={styles.image}
            source={{uri: selectedProduct?.imageUrl}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backIconImage}>
          <Icon name="ios-arrow-back" size={30} />
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {selectedProduct?.title}
          </Text>
          <View style={styles.buttonView}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.buttonDetails}
                onPress={
                  currentFavoriteProduct ? deleteFavorite : setFavoriteHandle
                }>
                <Icon
                  name={
                    currentFavoriteProduct ? 'ios-heart' : 'ios-heart-empty'
                  }
                  size={25}
                />
                <Text> いいね !</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonDetails, {marginLeft: 10}]}>
                <Fontisto name="comment" size={20} />
                <Text>コメント</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.background,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
              }}>
              <Text style={{fontSize: 18}}>...</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 15, padding: 15}}>
          <Text style={{fontSize: 18, opacity: 0.6}}>商品の説明</Text>
        </View>
        <View style={{backgroundColor: 'white', width: '100%', padding: 15}}>
          <Text style={{fontSize: 20}}>{selectedProduct?.description}</Text>
          <Text>{selectedProduct?.key} </Text>
        </View>
        <View style={{backgroundColor: 'white', width: '100%', padding: 15}}>
          <Text style={{fontSize: 20}}>{selectedProduct?.description}</Text>
          <Text>{selectedProduct?.key} </Text>
        </View>
        <View style={{backgroundColor: 'white', width: '100%', padding: 15}}>
          <Text style={{fontSize: 20}}>{selectedProduct?.description}</Text>
          <Text>{selectedProduct?.key} </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <Modal visible={imageModal} transparent={false} animationType="slide">
        <ImageModal
          imageDetail={selectedProduct?.imageUrl}
          imageModalHideHandle={imageModalHideHandle}
          images={images}
        />
      </Modal>
      <SafeAreaView style={{flex: 0, backgroundColor: Colors.background}} />
      <SafeAreaView style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: scrollY},
              },
              useNativeDrive: true,
            },
          ])}
          style={styles.scrollHeader}>
          <RenderScrollViewContent />
        </ScrollView>

        <Animated.View
          style={[styles.viewBar, {opacity, height: headerHeight}]}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.backIcon}>
            <Icon name="ios-arrow-back" color="white" size={30} />
          </TouchableOpacity>
          <View style={styles.bar}>
            <Text style={styles.titleBar}>{selectedProduct?.title}</Text>
          </View>
        </Animated.View>

        <View style={styles.footer}>
          <View style={styles.viewBottom}>
            <Text style={styles.price}>¥ {selectedProduct?.price}</Text>
            <TouchableOpacity
              onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
              style={styles.addButton}>
              <Text style={styles.addButtonText}>カートに追加</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
    marginTop: 0,
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
  },

  bar: {
    height: 32,
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 8.5,
  },
  backIcon: {
    // marginLeft: 10,
    // marginTop: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    flex: 1.5,
  },
  backIconImage: {
    marginHorizontal: 10,
    justifyContent: 'center',
    position: 'absolute',
  },

  titleBar: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  titleView: {
    backgroundColor: 'white',
    padding: 15,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.default,
  },
  scrollHeader: {
    flex: 1,
    backgroundColor: Colors.background,
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
    padding: 10,
  },

  image: {
    width: '100%',
    height: height / 2,
    resizeMode: 'contain',
  },

  price: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },

  addButton: {
    backgroundColor: '#290606',
    height: 50,
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },

  addButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
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
    justifyContent: 'space-around',
  },
  favoriteViewBox1: {
    flexDirection: 'row',
    borderWidth: 0.5,
    height: 30,
    width: width / 3,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: '#A4A4A4',
    borderRadius: 10,
  },

  textStyle: {
    fontSize: 20,
  },
});

export default ProductDetail;
