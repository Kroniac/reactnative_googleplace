import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as key from '../config/Keys/Keys';
const GoogleAutoComplete = props => (
  <GooglePlacesAutocomplete
    placeholder={props.placeholders}
    minLength={2}
    autoFocus={false}
    returnKeyType={'default'}
    fetchDetails={true}
    onPress={(data, details = null) =>
      // 'details' is provided when fetchDetails = true
      props.changed(data, details)
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
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
        textAlign: 'center'
      }
    }}
    currentLocation={false}
  />
);

export default GoogleAutoComplete;
