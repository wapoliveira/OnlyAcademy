import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper'; // Importando componentes necessários do react-native-paper
import { useNavigation } from '@react-navigation/native'; // Importando o hook de navegação
import { supabase } from '../../../supabase';

const LoginScreen = () => {
  const navigation = useNavigation(); // Hook de navegação

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Implementar lógica de login aqui
    console.log('Email:', email);
    console.log('Password:', password);

    
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    

    
    // Exemplo de navegação para a próxima tela após o login
    navigation.navigate('Profile'); // Substitua 'Home' pelo nome correto da tela após o login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  forgotPassword: {
    marginTop: 10,
    color: 'blue',
  },
});

export default LoginScreen;
