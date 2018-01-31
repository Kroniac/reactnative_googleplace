//Component handling the fetching to data to find companies
//and show the list of the companies according to the given conditions

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  FlatList,
  ScrollView
} from 'react-native';
import ListItem from '../component/ListItem/ListItem';
import axios from 'axios';
import { updateObject, checkValidity, onChange } from '../utility/utility';
import GoogleAutoComplete from '../component/GoogleAutoComplete/GoogleAutoComplete.js';

class Screen2 extends Component {
  state = {
    truckingDetails: {
      loadingp: {
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      unloadingp: {
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      goodType: {
        value: 'steel',
        valid: true
      },
      check: {
        value: 'one'
      }
    },
    fetchedData: '',
    isValid: false,
    goodList: ['steel', 'cars', 'boxes', 'glass material', 'coal']
  };

  //on change of text in an input box
  // call onChnage function which immutabily set the value state
  // in onChange function text is also verfied by calling checkValidity function
  onChangeHandler = (val, key) => {
    this.setState(onChange(val, key, this.state));
  };

  setFetchData = res => {
    let fetchedData = [];
    for (let key in res.data) {
      place2l =
        res.data[key].loadingp[res.data[key].loadingp.length - 2].long_name;
      place2u =
        res.data[key].unloadingp[res.data[key].unloadingp.length - 2].long_name;
      if (this.state.truckingDetails.check.value === 'two') {
        if (
          place2l === this.state.truckingDetails.loadingp.value &&
          place2u === this.state.truckingDetails.unloadingp.value &&
          res.data[key].goodType === this.state.truckingDetails.goodType.value
        )
          fetchedData.push({
            ...res.data[key]
          });
      } else {
        if (
          place2l === this.state.truckingDetails.loadingp.value &&
          res.data[key].goodType === this.state.truckingDetails.goodType.value
        )
          fetchedData.push({
            ...res.data[key]
          });
      }
    }
    this.setState({ fetchedData: fetchedData });
    this.setState({ isValid: true });
  };

  //to fetch and show the list of the company with contact and price range
  onShowHandler = () => {
    this.setState({ isValid: false });
    axios
      .get('https://truckingdetails.firebaseio.com/details.json')
      .then(res => {
        this.setFetchData(res);
      })
      .catch(err => alert('Error Occured' + err));
  };

  render() {
    //mapping goods to the picker component
    let goodList = this.state.goodList.map((good, index) => {
      return <Picker.Item key={index} label={good} value={good} />;
    });

    //if any data is fetched then data is showed in a list otherwise null
    let fetchData = this.state.fetchedData ? (
      <FlatList
        style={styles.lists}
        data={this.state.fetchedData}
        renderItem={fetchedData => (
          <ListItem
            companyName={fetchedData.item.companyName}
            contactNumber={fetchedData.item.companyNumber}
            priceLower={fetchedData.item.priceLower}
            priceUpper={fetchedData.item.priceUpper}
            placel={fetchedData.item.loadingp[0].long_name}
            placeu={fetchedData.item.unloadingp[0].long_name}
          />
        )}
        keyExtractor={(data, index) => index}
      />
    ) : null;
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{ flex: 1, backgroundColor: '#B3E5FC', padding: 5 }}
      >
        <View style={styles.container}>
          <View style={styles.input}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Pickup and Drop Points
            </Text>
            <View style={styles.inputinner}>
              <GoogleAutoComplete
                placeholder="Loading Point"
                changed={(data, details) =>
                  this.onChangeHandler(
                    details.address_components[
                      details.address_components.length - 2
                    ].long_name,
                    'loadingp'
                  )
                }
              />
            </View>
          </View>
          <View style={styles.input}>
            <View style={styles.inputinner}>
              <GoogleAutoComplete
                placeholder="UnLoading Point"
                changed={(data, details) =>
                  this.onChangeHandler(
                    details.address_components[
                      details.address_components.length - 2
                    ].long_name,
                    'unloadingp'
                  )
                }
              />
            </View>
          </View>

          <View style={styles.input}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Type Of Goods
            </Text>
            <View style={styles.inputinner}>
              <Picker
                style={{
                  width: '100%'
                }}
                selectedValue={this.state.truckingDetails.goodType.value}
                onValueChange={val => this.onChangeHandler(val, 'goodType')}
              >
                {goodList}
              </Picker>
            </View>
          </View>

          <View style={styles.input}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Number Of Specified Location for Search
            </Text>
            <View style={styles.inputinner}>
              <Picker
                style={{
                  width: '100%'
                }}
                selectedValue={this.state.truckingDetails.check.value}
                onValueChange={val => this.onChangeHandler(val, 'check')}
              >
                <Picker.Item label="one" value="one" />
                <Picker.Item label="two" value="two" />
              </Picker>
            </View>
          </View>
          <View style={{ marginBottom: 20, marginTop: 10 }}>
            <Button
              style={{ marginTop: 10 }}
              title="Show Data"
              disabled={this.state.truckingDetails.loadingp.value === ''}
              onPress={this.onShowHandler}
            />
          </View>
          {fetchData}
        </View>
      </ScrollView>
    );
  }
}

export default Screen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 15
  },

  input: {
    width: '98%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#E1F5FE',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 7
  },
  inputinner: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%'
  },
  lists: {
    width: '100%'
  }
});
