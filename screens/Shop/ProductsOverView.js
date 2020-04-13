import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
// //import ProductItem from '../../components/shop/ProductItem'
// import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products';
import IconHeader from '../../components/UI/IconHeader';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/UI/ProductItem';

const {height} = Dimensions.get('window');

const ProductsOverView = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  //console.log(products)

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [loadProducts]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts,
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts, props.navigation]);
  const products = useSelector((state) => state.products.availableProducts);

  //console.log(products)
  const seletectItemHandler = (id) => {
    props.navigation.navigate({
      routeName: 'ProductDetail',
      params: {
        productId: id,
      },
    });
  };
  return (
    <View style={{margin: 3}}>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={(item) => item.id}
        //horizontal={false}
        numColumns={3}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            title={itemData.item.title}
            idItem={itemData.item.id}
            onSelect={() => {
              seletectItemHandler(itemData.item.id);
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
ProductsOverView.navigationOptions = (navData) => {
  return {
    headerTitle: '商品',
    headerRight: (
      <IconHeader
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onTapped={() => {
          navData.navigation.navigate('Cart');
        }}
      />
    ),
    headerLeft: (
      <IconHeader
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onTapped={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),
    headerBackTitle: '戻り',
  };
};
export default ProductsOverView;
