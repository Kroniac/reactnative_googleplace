//in this screen data is entered and stored to the database
//which can be used to find companies

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  Picker,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import { updateObject, checkValidity, onChange } from '../utility/utility';
import axios from 'axios';
import TextInputUI from '../UI/TextInputUI/TextInputUI.js';
import GoogleAutoComplete from '../component/GoogleAutoComplete/GoogleAutoComplete.js';

export default class EnterData extends Component {
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
        valid: false,
        touched: false,
        required: true
      },
      priceUpper: {
        value: '',
        validation: {
          required: false,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      companyName: {
        value: '',
        validation: {
          required: true,
          minLength: 3
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
      },
      truckCapacity: {
        value: [],
        validation: { required: false },
        valid: false,
        touched: false
      },
      numberOfTrucks: {
        value: [],
        validation: { required: false },
        valid: false,
        touched: false
      }
    },
    isValid: false,
    goodList: [
      'steel',
      'paper',
      'plastic',
      'cars',
      'boxes',
      'glass material',
      'coal'
    ],
    truckFields: 0,
    backButtonCounter: 0
  };

  componentWillMount() {
    BackHandler.addEventListener('enter page', this.backButtonHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('enter page', this.backButtonHandler);
  }

  backButtonHandler = () => {
    if (this.state.backButtonCounter < 1) {
      ToastAndroid.show('Tap again to exit', ToastAndroid.SHORT);
      this.state.backButtonCounter += 1;
      this.backButtonTimeout = setTimeout(() => {
        ToastAndroid.show(`Hey I'm running`, ToastAndroid.SHORT);
        this.state.backButtonCounter = 0;
      }, 2000);
    } else {
      clearTimeout(this.backButtonTimeout);
      ToastAndroid.show('App exited', ToastAndroid.SHORT);
      BackHandler.exitApp();
    }
    return true;
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
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, backgroundColor: '#00BFA5', padding: 5 }}
      >
        <View style={styles.container}>
          {/* <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            Complete Form To Store Data
          </Text> */}
          <View style={styles.input}>
            <View
              style={[styles.inputinner, { justifyContent: 'space-between' }]}
            >
              <Text
                style={{ fontSize: 16, fontWeight: 'bold', color: '#FFCDD2' }}
              >
                _______
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ccc' }}>
                _______
              </Text>
            </View>
            <View
              style={[styles.inputinner, { justifyContent: 'space-between' }]}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Mandatory Fields
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Optional Fields
              </Text>
            </View>
          </View>
          <View style={styles.input}>
            <View style={styles.inputinner}>
              <GoogleAutoComplete
                placeholders="Enter Loading Point"
                changed={(data, details) =>
                  this.onChangeHandler(details.address_components, 'loadingp')
                }
              />
            </View>

            <View style={styles.inputinner}>
              <GoogleAutoComplete
                placeholders="Enter UnLoading Point"
                changed={(data, details) =>
                  this.onChangeHandler(details.address_components, 'unloadingp')
                }
              />
            </View>
          </View>

          <View style={styles.input}>
            <View style={styles.inputinner}>
              <TextInputUI
                underlineColor="#FFCDD2"
                field={this.state.truckingDetails.companyName}
                keyboardType="default"
                placeholder="Company Name"
                onChangeText={val => this.onChangeHandler(val, 'companyName')}
              />
              <TextInputUI
                underlineColor="#ccc"
                field={this.state.truckingDetails.companyNumber}
                keyboardType="numeric"
                placeholder="Mobile No."
                onChangeText={val => this.onChangeHandler(val, 'companyNumber')}
              />
            </View>
          </View>

          <View style={styles.input}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Price Range In INR(₹)
            </Text>
            <View style={styles.inputinner}>
              <TextInputUI
                underlineColor="#ccc"
                field={this.state.truckingDetails.priceLower}
                keyboardType="numeric"
                placeholder="Lower Range"
                onChangeText={val => this.onChangeHandler(val, 'priceLower')}
              />
              <TextInputUI
                underlineColor="#ccc"
                field={this.state.truckingDetails.priceUpper}
                keyboardType="numeric"
                placeholder="Upper Range"
                onChangeText={val => this.onChangeHandler(val, 'priceUpper')}
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

          <View style={{ width: '80%', marginTop: 20 }}>
            <Button
              title="Submit"
              color="#009688"
              disabled={
                !(
                  this.state.truckingDetails.loadingp.valid &&
                  this.state.truckingDetails.companyName.valid &&
                  (this.state.truckingDetails.companyNumber.valid ||
                    !this.state.truckingDetails.companyNumber.touched)
                )
              }
              onPress={this.onSubmitHandler}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

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
    backgroundColor: '#E0F2F1',
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
  inputinner1: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  textinput: {
    width: '45%',
    textAlign: 'center'
  },
  textinput2: {
    width: '45%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#FF8A80'
  }
});
