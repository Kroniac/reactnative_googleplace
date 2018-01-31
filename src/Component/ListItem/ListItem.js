//returns list according the provided fetched data

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
const listItem = props => {
  let contactNumber = props.contactNumber ? (
    <View style={styles.listItem}>
      <Text>Contact Number</Text>
      <Text>{props.contactNumber}</Text>
    </View>
  ) : null;
  let priceRange =
    props.priceLower && props.priceUpper ? (
      <View style={styles.listItem}>
        <Text>Price Range</Text>
        <Text>
          ₹{props.priceLower} - ₹{props.priceUpper}
        </Text>
      </View>
    ) : null;
  return (
    <View style={styles.listItems}>
      <View style={styles.mainList}>
        <View style={[styles.listItem, { justifyContent: 'center' }]}>
          <Text>
            {props.placel} - {props.placeu}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text>Company Name</Text>
          <Text>{props.companyName}</Text>
        </View>
        {contactNumber}
        {priceRange}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItems: {
    width: '100%',
    padding: 10,
    backgroundColor: '#E1F5FE',
    marginBottom: 5,
    alignItems: 'center',
    borderRadius: 10
  },
  mainList: {
    width: '95%',
    justifyContent: 'space-around'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5
  },
  price: {
    width: '95%',
    justifyContent: 'space-around'
  }
});

export default listItem;
