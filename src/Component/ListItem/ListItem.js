//returns list according the provided fetched data

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
const listItem = props => {
  let contactNumber = props.contactNumber ? (
    <View>
      <Text>Contact Number</Text>
      <Text>{props.contactNumber}</Text>
    </View>
  ) : null;
  let priceRange =
    props.priceLower && props.priceUpper ? (
      <View>
        <Text>Price Range</Text>
        <Text>
          ₹{props.priceLower} - ₹{props.priceUpper}
        </Text>
      </View>
    ) : null;
  return (
    <View style={styles.listItem}>
      <View style={styles.companylist}>
        <View>
          <Text>Company Name</Text>
          <Text>{props.companyName}</Text>
        </View>
        {contactNumber}
        {priceRange}
      </View>
      <View>
        <Text>
          {props.placel} - {props.placeu}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 5,
    alignItems: 'center'
  },
  companylist: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  price: {
    width: '95%',
    justifyContent: 'space-around'
  }
});

export default listItem;
