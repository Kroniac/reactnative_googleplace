import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class TextInputUI extends Component {
  render() {
    let clearButton =
      this.props.field.value === '' ? null : (
        <TouchableOpacity
          onPress={this.props.clearAutoComplete}
          style={styles.closeButton}
        >
          <Icon name="md-close" size={7} color="#fff" />
        </TouchableOpacity>
      );
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          underlineColorAndroid={this.props.underlineColor}
          style={
            this.props.field.valid || !this.props.field.touched
              ? [styles.textinput, this.props.style]
              : [styles.textinput2, this.props.style]
          }
          placeholder={this.props.placeholder}
          keyboardType={this.props.keyboardType}
          onChangeText={this.props.onChangeText}
          value={this.props.field.value}
        />
        {clearButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    width: '85%',
    textAlign: 'center'
  },
  textinput2: {
    width: '85%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#FF8A80'
  },
  closeButton: {
    height: 18,
    width: 18,
    borderRadius: 9,
    marginTop: 15,
    marginLeft: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BFA5'
  }
});

export default TextInputUI;
