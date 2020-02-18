import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const PlaceItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },

  image: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 35,
    borderColor: Colors.primary,
    backgroundColor: '#ccc'
  },

  infoContainer: {
    marginLeft: 25,
    //backgroundColor: 'green',
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },

  address: {
    color: '#666',
    fontSize: 16
  }
});

export default PlaceItem;
