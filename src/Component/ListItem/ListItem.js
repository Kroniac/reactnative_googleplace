//returns list according the provided fetched data

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
class listItem extends Component {


  render() {
    let contactNumber = this.props.contactNumber ? (
      <View style={styles.listItem}>
        <Text style={{ marginRight: 5 }}>Contact Number</Text>
        <Text>{this.props.contactNumber}</Text>
      </View>
    ) : null;
    let loadingPrice =
      this.props.priceLoading ? (
        <View style={styles.listItem}>
          <Text style={{ marginRight: 5 }}>Loading Price</Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>
            ₹{this.props.priceLoading}
          </Text>
        </View>
      ) : null;
    let truckCount =
      this.props.truckCount ? (
        <View style={styles.listItem}>
          <Text style={{ marginRight: 5 }}>Truck Per Week: </Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>
            {this.props.truckCount}
          </Text>
        </View>
      ) : null;
    let goods =
      this.props.goods ? (
        <View style={styles.listItem}>
          <Text style={{ marginRight: 5 }}>Goods: </Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>
            ₹{this.props.goods}
          </Text>
        </View>
      ) : null;
    let mdName =
      this.props.mdName ? (
        <View style={styles.listItem}>
          <Text style={{ marginRight: 5 }}>MD/GM Name: </Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>
            ₹{this.props.mdName}
          </Text>
        </View>
      ) : null;
    let email =
      this.props.email ? (
        <View style={styles.listItem}>
          <Text style={{ marginRight: 5 }}>Email: </Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>
            ₹{this.props.email}
          </Text>
        </View>
      ) : null;
    let address =
      this.props.address ? (
        <View style={styles.listItem}>
          <Text style={{ marginRight: 5 }}>Address: </Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>
            ₹{this.props.address}
          </Text>
        </View>
      ) : null;
    let marketPrice =
      this.props.marketPrice ? (
        <View style={styles.listItem}>
          <Text style={{ marginRight: 5 }}>Market Price: </Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>
            ₹{this.props.marketPrice}
          </Text>
        </View>
      ) : null;
    let unloadingPrice =
      this.props.priceUnloading ? (
        <View style={styles.listItem}>
          <Text style={{ marginRight: 5 }}>Unloading Price</Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>
            ₹{this.props.priceUnloading}
          </Text>
        </View>
      ) : null;
    return (
      <View style={styles.listItems}>
        <View style={styles.mainList}>
          <View style={[styles.listItem, { justifyContent: 'center' }]}>
            <Text>
              {this.props.placel} - {this.props.placeu}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ marginRight: 5 }}  >Company Name: </Text>
            <Text style={{ flex: 1, textAlign: 'right' }} >{this.props.companyName}</Text>
          </View>
          {mdName}
          {contactNumber}
          {email}
          {goods}
          {loadingPrice}
          {unloadingPrice}
          {marketPrice}
          {truckCount}
          {address}
        </View>
      </View>
    )
  }

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
