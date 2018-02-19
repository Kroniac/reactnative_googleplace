import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as key from '../../config/Keys/Keys';
import Icon from 'react-native-vector-icons/Ionicons';

class GoogleAutoComplete extends Component {
  render() {
    return (
      <View style={styles.inputinner}>
        <GooglePlacesAutocomplete
          ref={autocomplete => {
            this.autocomplete = autocomplete;
          }}
          placeholder={this.props.placeholders}
          minLength={1}
          underlineColorAndroid="#FFCDD2"
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          clearAutoComplete={this.props.clearAutoComplete}
          onPress={(data, details = null) =>
            // 'details' is provided when fetchDetails = true
            this.props.changed(data, details)
          }
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: key.GOOGLE_API_KEY,
            language: 'en', // language of the results
            types: '(regions)', // default: 'geocode'
            components: 'country:ind'
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 35,
              color: '#5d5d5d',
              fontSize: 15,
              textAlign: 'center'
            }
          }}
          currentLocation={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputinner: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%'
  }
});

export default GoogleAutoComplete;
