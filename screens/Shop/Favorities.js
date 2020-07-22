import React, {useState, useCallback} from 'react';
import {FlatList, Platform, View, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FavComponent from '../../components/UI/FavComponent';
import IconHeader from '../../components/UI/IconHeader';
import {AsyncStorage} from 'react-native';

const Favorities = props => {

  //const abc = AsyncStorage.getItem('favorite')
  //console.log('thong tin luu vao asycstore:', abc)
  const favorites = useSelector(state => state.products.favoriteProduct);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadFavorites = useCallback(async () => {
    setIsRefreshing(true);
    if (favorites.length > 0) {
      setIsRefreshing(false);
    }
  }, [favorites, setIsRefreshing]);

  if (!favorites.length) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', opacity: 0.8}}>
          空き
        </Text>
      </View>
    );
  } else {
    return (
      <>
        <View style={{padding: 5}}>
          <FlatList
            onRefresh={loadFavorites}
            refreshing={isRefreshing}
            data={favorites}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={itemData => (
              <FavComponent
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                title={itemData.item.title}
                idItem={itemData.item.id}
              />
            )}
          />
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    padding: 5,
    height: 250,
    //backgroundColor: 'green',
  },
});

Favorities.navigationOptions = navData => {
  return {
    headerTitle: 'お気に入り',
    headerLeft: (
      <IconHeader
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onTapped={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),
    headerBackTitle: 'Back',
  };
};
export default Favorities;
