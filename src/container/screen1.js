//in this screen data is entered and stored to the database
//which can be used to find companies

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { updateObject, checkValidity, onChange } from '../utility/utility';
import axios from 'axios';
import GoogleAutoComplete from '../Component/GoogleAutoComplete/GoogleAutoComplete.js';

export default class App extends Component {
  state = {
    truckingDetails: {
      loadingp: {
        value: '',

        valid: false,
        touched: false,
        required: false
      },
      unloadingp: {
        value: '',
        valid: false,
        touched: false,
        required: true
      },
      priceLower: {
        value: '',
        validation: {
          isNumeric: true
        },
        valid: true,
        touched: false,
        required: true
      },
      priceUpper: {
        value: '',
        validation: {
          required: false,
          isNumeric: true
        },
        valid: true,
        touched: false
      },
      companyName: {
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 12
        },
        valid: false,
        touched: false
      },
      companyNumber: {
        value: '',
        validation: {
          required: false,
          minLength: 10,
          maxLength: 10,
          isNumeric: true
        },
        valid: true,
        touched: false
      },
      goodType: {
        value: 'steel',
        valid: true,
        required: true
      }
    },
    isValid: false,
    goodList: ['steel', 'cars', 'boxes', 'glass material', 'coal']
  };

  baseState = this.state;
  onChangeHandler = (val, key) => {
    this.setState(onChange(val, key, this.state));
  };

  onSubmitHandler = () => {
    if (
      Number(this.state.truckingDetails.priceLower.value) <=
        Number(this.state.truckingDetails.priceUpper.value) ||
      this.state.truckingDetails.priceLower === '' ||
      this.state.truckingDetails.priceUpper === ''
    ) {
      this.setState({ isValid: false });
      let submitTruckingDetails = {};
      for (let key in this.state.truckingDetails) {
        submitTruckingDetails[key] = this.state.truckingDetails[key].value;
      }
      axios
        .post(
          'https://truckingdetails.firebaseio.com/details.json',
          submitTruckingDetails
        )
        .then(res => {
          alert('Data Successfully Stored');
          this.setState(this.baseState);
          this.setState({ isValid: true });
        })
        .catch(err => alert('Error Occured' + err));
    } else {
      alert('Enter Valid Price Range');
    }
  };

  render() {
    let goodList = this.state.goodList.map((good, index) => {
      return <Picker.Item key={index} label={good} value={good} />;
    });
    return (
      <KeyboardAvoidingView style={styles.container} behaviour="padding">
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Complete Form To Store Data
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Pickup and Drop Points
        </Text>
        <View style={styles.input}>
          <View style={styles.inputinner}>
            <GoogleAutoComplete
              placeholders="Loading"
              changed={(data, details) =>
                this.onChangeHandler(details.address_components, 'loadingp')
              }
            />
          </View>
        </View>
        <View style={styles.input}>
          <View style={styles.inputinner}>
            <GoogleAutoComplete
              placeholders="UnLoading"
              changed={(data, details) =>
                this.onChangeHandler(details.address_components, 'unloadingp')
              }
            />
          </View>
        </View>

        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Company Details
        </Text>
        <View style={styles.input}>
          <View style={styles.inputinner}>
            <TextInput
              style={
                this.state.truckingDetails.companyName.valid ||
                !this.state.truckingDetails.companyName.touched
                  ? styles.textinput
                  : styles.textinput2
              }
              keyboardType="default"
              placeholder="Company Name"
              onChangeText={val => this.onChangeHandler(val, 'companyName')}
              value={this.state.truckingDetails.companyName.value}
            />
            <TextInput
              style={
                this.state.truckingDetails.companyNumber.valid ||
                !this.state.truckingDetails.companyNumber.touched
                  ? styles.textinput
                  : styles.textinput2
              }
              keyboardType="numeric"
              placeholder="Mobile No."
              onChangeText={val => this.onChangeHandler(val, 'companyNumber')}
              value={this.state.truckingDetails.companyNumber.value}
            />
          </View>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Price Range In INR(₹)
        </Text>
        <View style={styles.input}>
          <View style={styles.inputinner}>
            <TextInput
              style={
                this.state.truckingDetails.priceLower.valid ||
                !this.state.truckingDetails.priceLower.touched
                  ? styles.textinput
                  : styles.textinput2
              }
              keyboardType="numeric"
              placeholder="Lower Range"
              onChangeText={val => this.onChangeHandler(val, 'priceLower')}
              value={this.state.truckingDetails.priceLower.value}
            />
            <TextInput
              style={
                this.state.truckingDetails.priceUpper.valid ||
                !this.state.truckingDetails.priceUpper.touched
                  ? styles.textinput
                  : styles.textinput2
              }
              keyboardType="numeric"
              placeholder="Upper Range"
              onChangeText={val => this.onChangeHandler(val, 'priceUpper')}
              value={this.state.truckingDetails.priceUpper.value}
            />
          </View>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Type Of Goods</Text>
        <View style={styles.input}>
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

        <View style={{ width: '100%', marginTop: 20 }}>
          <Button
            title="Submit"
            disabled={
              !(
                this.state.truckingDetails.companyName.valid &&
                !this.state.truckingDetails.companyNumber.touched
              )
            }
            onPress={this.onSubmitHandler}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 10
  },

  input: {
    width: '98%',
    alignItems: 'center',
    justifyContent: 'space-around',

    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 1
  },
  inputinner: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%'
  },
  inputinner1: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  textinput: {
    width: '45%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  textinput2: {
    width: '45%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#FF8A80'
  }
});
