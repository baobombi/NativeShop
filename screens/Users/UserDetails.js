import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconHeader from '../../components/UI/IconHeader';
import {useSelector, useDispatch} from 'react-redux';
import UserInfor from './UserInformation/UserInfor'
const UserDetails = props => {
  const checkLogin = useSelector(state => state.auth.userId);
  const changeLoginScreen = () => {
    props.navigation.navigate('LoginNavigator');
  };
  const Details = () => {
    if (!checkLogin) {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={changeLoginScreen}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              会員登録・ログインへ
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <View />;
    }
  };
  return <UserInfor/>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

UserDetails.navigationOptions = navData => {
  return {
    headerTitle: '個人情報',
    headerLeft: (
      <IconHeader
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onTapped={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),
  };
};

export default UserDetails;
