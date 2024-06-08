import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const PaymentScreen = ({ route }) => {
  const { plan } = route.params;
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/create-payment-method', {
        plan,
        email,
        cardNumber,
        expMonth,
        expYear,
        cvc,
      });
      console.log('Subscription created:', response.data);
      Alert.alert('Success', 'Your subscription is confirmed!');
    } catch (error) {
      console.error('Error creating subscription:', error);
      Alert.alert('Error', 'Failed to create subscription. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento {plan}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Número do Cartão"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="Mês de Expiração"
          value={expMonth}
          onChangeText={setExpMonth}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Ano de Expiração"
          value={expYear}
          onChangeText={setExpYear}
          keyboardType="numeric"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="CVC"
        value={cvc}
        onChangeText={setCvc}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PaymentScreen;
