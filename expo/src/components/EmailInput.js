import React from 'react';
import { TextInput } from 'react-native-paper';

const EmailInput = ({ value, onChange }) => {
  return (
    <TextInput
      label="Email"
      value={value}
      onChangeText={onChange}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCompleteType="email"
      textContentType="emailAddress"
    />
  );
};

export default EmailInput;
