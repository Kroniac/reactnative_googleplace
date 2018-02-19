//returns list according the provided fetched data

import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
class listItem extends Component {
  state = {
    _animated: new Animated.Value(0)
  }
  componentDidMount() {
    Animated.timing(this.state._animated, {
      toValue: 1,
      duration: 500,
    }).start();
    setTimeout(() => {
      this.setState({
        _animated: new Animated.Value(0)
      })
    }, 500);
  }
  render() {
    let contactNumber = this.props.contactNumber ? (
      <View style={styles.listItem}>
        <Text style={{ marginRight: 5 }}>Contact Number</Text>
        <Text>{this.props.contactNumber}</Text>
      </View>
    ) : null;
    let loadingPrice =
      this.props.priceLower ? (
        <View style={styles.listItem}>
          <Text style={{ marginRight: 5 }}>Loading Price</Text>
          <Text>
            ₹{this.props.priceLower}
          </Text>
        </View>
      ) : null;
    let unloadingPrice =
      this.props.priceUpper ? (
        <View style={styles.listItem}>
          <Text style={{ marginRight: 5 }}>Unloading Price</Text>
          <Text>
            ₹{this.props.priceUpper}
          </Text>
        </View>
      ) : null;
    return (
      <Animated.View style={[styles.listItems, { opacity: this._animated },
      {
        transform: [
          { scale: this.state._animated },
          {
            rotate: this.state._animated.interpolate({
              inputRange: [0, 1],
              outputRange: ['35deg', '0deg'],
              extrapolate: 'clamp',
            })
          }
        ],
      },]}>
        <View style={styles.mainList}>
          <View style={[styles.listItem, { justifyContent: 'center' }]}>
            <Text>
              {this.props.placel} - {this.props.placeu}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ marginRight: 5 }}  >Company Name</Text>
            <Text style={{ flex: 1, textAlign: 'right' }} >{this.props.companyName}</Text>
          </View>
          {contactNumber}
          {loadingPrice}
          {unloadingPrice}
        </View>
      </Animated.View>
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
