import React from 'react';

import { TextInput, StyleSheet } from 'react-native';

const TextInputUI = props => (
  <TextInput
    underlineColorAndroid={props.underlineColor}
    style={
      props.field.valid || !props.field.touched
        ? styles.textinput
        : styles.textinput2
    }
    placeholder={props.placeholder}
    keyboardType={props.keyboardType}
    onChangeText={props.onChangeText}
    value={props.field.value}
  />
);

const styles = StyleSheet.create({
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

export default TextInputUI;
