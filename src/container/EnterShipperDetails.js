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
import goodsList from '../config/GoodList/GoodList'
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
      address: {
        value: '',
        validation: {
          required: false,
          minLength: 4
        },
        valid: false,
        touched: false
      },
      notes: {
        value: '',
        validation: {
          required: false,
        },
        valid: false,
        touched: false
      },
      email: {
        value: '',
        validation: {
          required: false,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      priceLoading: {
        value: '',
        validation: {
          isNumeric: true
        },
        valid: false,
        touched: false,
        required: true
      },
      priceUnloading: {
        value: '',
        validation: {
          required: false,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      marketPrice: {
        value: '',
        validation: {
          required: false,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      truckCount: {
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
      mdName: {
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
        value: goodsList[0],
        valid: true,
        required: true
      }
    },
    isValid: false,
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
    {
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
    }
  };

  clearAutoComplete = key => {
    console.log('Hello');
    this.setState(prevState => {
      return {
        ...prevState,
        truckingDetails: {
          ...prevState.truckingDetails,
          [key]: {
            ...prevState.truckingDetails[key],
            value: '',
            valid: false,
            touched: false
          }
        }
      };
    });
  };

  render() {
    // let sortedgoodList = this.state.goodList.slice();
    // sortedgoodList.sort();
    let goodList = goodsList.map((good, index) => {
      return <Picker.Item key={index} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} label={good} value={good} />;
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
                style={{ fontSize: 14, fontWeight: 'bold', color: '#EF9A9A' }}
              >
                _______
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#ccc' }}>
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
                underlineColor="#EF9A9A"
                clearAutoComplete={() => this.clearAutoComplete('loadingp')}
                changed={(data, details) =>
                  this.onChangeHandler(details.address_components, 'loadingp')
                }
              />
            </View>

            <View style={styles.inputinner}>
              <GoogleAutoComplete
                placeholders="Enter UnLoading Point"
                underlineColor="#ccc"
                clearAutoComplete={() => this.clearAutoComplete('unloadingp')}
                changed={(data, details) =>
                  this.onChangeHandler(details.address_components, 'unloadingp')
                }
              />
            </View>
          </View>

          <View style={styles.input}>
            <View style={styles.inputinner}>
              <TextInputUI
                underlineColor="#EF9A9A"
                clearAutoComplete={() => this.clearAutoComplete('companyName')}
                field={this.state.truckingDetails.companyName}
                keyboardType="default"
                placeholder="Company Name"
                onChangeText={val => this.onChangeHandler(val, 'companyName')}
              />

              <TextInputUI
                underlineColor="#ccc"
                clearAutoComplete={() => this.clearAutoComplete('mdName')}
                field={this.state.truckingDetails.mdName}
                keyboardType="default"
                placeholder="Owner Name"
                onChangeText={val => this.onChangeHandler(val, 'mdName')}
              />

            </View>
            <View style={styles.inputinner}>
              <TextInputUI
                underlineColor="#ccc"
                clearAutoComplete={() =>
                  this.clearAutoComplete('companyNumber')
                }
                field={this.state.truckingDetails.companyNumber}
                keyboardType="numeric"
                placeholder="Mobile No."
                onChangeText={val => this.onChangeHandler(val, 'companyNumber')}
              />
              <TextInputUI
                autoCapitalize="none"
                underlineColor="#ccc"
                clearAutoComplete={() => this.clearAutoComplete('email')}
                field={this.state.truckingDetails.email}
                keyboardType="default"
                placeholder="Email Address"
                onChangeText={val => this.onChangeHandler(val, 'email')}
              />
            </View>
            <View style={styles.inputinner}>
              <TextInputUI
                style={{ width: '90%' }}
                underlineColor="#ccc"
                clearAutoComplete={() => this.clearAutoComplete('address')}
                field={this.state.truckingDetails.address}
                keyboardType="default"
                placeholder="Company Address"
                onChangeText={val => this.onChangeHandler(val, 'address')}
              />
            </View>
          </View>

          <View style={styles.input}>

            <View style={styles.inputinner}>
              <TextInputUI
                underlineColor="#ccc"
                clearAutoComplete={() => this.clearAutoComplete('priceLoading')}
                field={this.state.truckingDetails.priceLoading}
                keyboardType="numeric"
                placeholder="Loading Price"
                onChangeText={val => this.onChangeHandler(val, 'priceLoading')}
              />
              <TextInputUI
                underlineColor="#ccc"
                clearAutoComplete={() => this.clearAutoComplete('priceUnloading')}
                field={this.state.truckingDetails.priceUnloading}
                keyboardType="numeric"
                placeholder="Unloading Price"
                onChangeText={val => this.onChangeHandler(val, 'priceUnloading')}
              />
            </View>
            <View style={styles.inputinner}>
              <TextInputUI
                underlineColor="#ccc"
                clearAutoComplete={() => this.clearAutoComplete('marketPrice')}
                field={this.state.truckingDetails.marketPrice}
                keyboardType="numeric"
                placeholder="Market Price"
                onChangeText={val => this.onChangeHandler(val, 'marketPrice')}
              />
              <TextInputUI
                underlineColor="#ccc"
                clearAutoComplete={() => this.clearAutoComplete('truckCount')}
                field={this.state.truckingDetails.truckCount}
                keyboardType="numeric"
                placeholder="Trucks Per Week"
                onChangeText={val => this.onChangeHandler(val, 'truckCount')}
              />
            </View>
          </View>

          <View style={[styles.input, { paddingTop: 3, paddingBottom: 3 }]}>

            <View style={styles.inputinner}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Goods:
            </Text>
              <Picker
                mode="dropdown"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '80%',

                }}
                selectedValue={this.state.truckingDetails.goodType.value}
                onValueChange={val => this.onChangeHandler(val, 'goodType')}
              >
                {goodList}
              </Picker>
            </View>
          </View>

          <View style={styles.input}>
            <View style={styles.inputinner}>
              <TextInputUI
                style={{ width: '80%' }}
                underlineColor="#ccc"
                clearAutoComplete={() => this.clearAutoComplete('notes')}
                field={this.state.truckingDetails.notes}
                keyboardType="default"
                placeholder="Any Other Notes"
                onChangeText={val => this.onChangeHandler(val, 'notes')}
              />
            </View>
          </View>

          <View style={{ width: '80%', marginTop: 10, marginBottom: 10 }}>
            <Button
              title="Submit"
              color="#009688"
              disabled={
                !(
                  this.state.truckingDetails.loadingp.valid &&
                  this.state.truckingDetails.companyName.valid &&
                  (this.state.truckingDetails.companyNumber.valid ||
                    !this.state.truckingDetails.companyNumber.touched) &&
                  (this.state.truckingDetails.address.valid ||
                    !this.state.truckingDetails.address.touched) &&
                  (this.state.truckingDetails.mdName.valid ||
                    !this.state.truckingDetails.mdName.touched) &&
                  (this.state.truckingDetails.email.valid ||
                    !this.state.truckingDetails.email.touched)
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
    marginBottom: 7,
    marginTop: 7
  },

  input: {
    width: '98%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#E0F2F1',
    marginTop: 3,
    marginBottom: 3,
    padding: 5,
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
