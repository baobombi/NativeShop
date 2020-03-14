import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const productWidthView = width / 3.2;
const productHeightView = height / 6;

const ProductItem = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonRect, setButtonRect] = useState({});

  return (
    <>
      <TouchableOpacity
        onPress={props.onSelect}
        onLongPress={() => setIsVisible(true)}>
        <View style={styles.container}>
          <ImageBackground style={styles.image} source={{uri: props.image}}>
            <View style={styles.priceStyle}>
              <Text style={styles.textStyle}>{props.price}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.modalView}>
            <View style={styles.modalDetail}>
              <TouchableWithoutFeedback
                onPressOut={() => setIsVisible(false)}
                onPress={props.onSelect}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={styles.modalImage}
                    source={{uri: props.image}}
                    resizeMode="stretch"
                  />
                </View>
              </TouchableWithoutFeedback>
              <Text style={{fontSize: 20, marginBottom: 10}}>
                {props.title}
              </Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {props.price}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#808080',
                width: (width * 2) / 3,
                height: 40,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 20}}>出品者を見る</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 3,
    backgroundColor: 'white',
    shadowColor: '#2E272B',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    width: productWidthView,
    height: productHeightView,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  priceStyle: {
    backgroundColor: '#1C1C1C',
    opacity: 0.55,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 109,
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: 5,
  },

  textStyle: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },

  modalImage: {
    width: '75%',
    height: '70%',
  },

  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  modalDetail: {
    backgroundColor: 'white',
    width: width - 20,
    height: height / 2,
    borderRadius: 20,
  },
});
export default ProductItem;
