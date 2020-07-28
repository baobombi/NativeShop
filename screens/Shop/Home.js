import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
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
import IconHeader from '../../components/UI/IconHeader';
import Colors from '../../constants/Colors';
import CollectionView from '../../components/Collection';
import Category from '../../components/Category';
import * as productActions from '../../store/actions/products';
const {height} = Dimensions.get('window');
console.disableYellowBox = true;

const Home = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector(state => state.auth.userId);
  const loadFavorites = useCallback(async () => {
    try {
      await dispatch(productActions.fetchFavorites());
      //console.log('da di vao day')
    } catch (err) {
      throw err;
    }
  }, [dispatch]);
  
  useEffect(() => {
    setIsLoading(true);
    loadFavorites().then(() => {
      setIsLoading(false);
    });
  }, [loadFavorites]);
  // const abc = useSelector(state => state.products.favoriteProduct);
  // console.log(abc)
  return (
    <ScrollView>
      <View style={styles.container}>
        <CollectionView title="春コレクション" />
        <Category
          title="項目リスト"
          onSelect={() => props.navigation.navigate('ProductsOverView')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDBD8',
  },
});

Home.navigationOptions = navData => {
  return {
    headerTitle: 'ライフスタイル',
    headerLeft: (
      <IconHeader
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onTapped={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),

    headerRight: (
      <IconHeader
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onTapped={() => {
          navData.navigation.navigate('Cart');
        }}
      />
    ),
    headerBackTitle: '戻り',
  };
};
export default Home;
