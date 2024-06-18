import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('Tudo');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos das permissões da câmera para fazer isso funcionar!');
        }
      }
    })();
  }, []);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      // Aqui você pode lidar com a imagem capturada, por exemplo, exibir em uma imagem ou enviá-la para o servidor.
    }
  };

  // Método para criar um PaymentMethod
  const createPaymentMethod = async () => {
    try {
      const response = await axios.post('http://localhost:3000/create-payment-method', {
        number: '4242424242424242',
        exp_month: 8,
        exp_year: 2026,
        cvc: '314',
      });
      console.log('CREATE PAYMENT METHOD RESPONSE:', response.data);
    } catch (error) {
      console.error('Error creating payment method:', error);
    }
  };

  // Método para atualizar um PaymentMethod
  const updatePaymentMethod = async (paymentMethodId) => {
    try {
      const response = await axios.post(`http://localhost:3000/update-payment-method/${paymentMethodId}`, {
        order_id: '6735',
      });
      console.log('UPDATE PAYMENT METHOD RESPONSE:', response.data);
    } catch (error) {
      console.error('Error updating payment method:', error);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Implemente a lógica para exibir o conteúdo de acordo com a opção selecionada
  };

  return (
    <View>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/perfil.png')}
          style={styles.image}
        />
        <Text style={styles.text}>Seguidores: 100</Text>
        <Text style={styles.text}>Seguindo: 50</Text>
        <Text style={styles.text}>@SeuNome</Text>
        <Text style={styles.text}>Breve descrição sobre você</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PlanSelection')}>
          <Text style={styles.buttonText}>Escolher Plano</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Câmera</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => handleOptionChange('Tudo')} style={{ marginRight: 10 }}>
          <Text style={{ color: selectedOption === 'Tudo' ? 'blue' : 'black' }}>Tudo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionChange('Fotos')} style={{ marginRight: 10 }}>
          <Text style={{ color: selectedOption === 'Fotos' ? 'blue' : 'black' }}>Fotos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionChange('Vídeos')}>
          <Text style={{ color: selectedOption === 'Vídeos' ? 'blue' : 'black' }}>Vídeos</Text>
        </TouchableOpacity>
      </View>

      {/* Restante do seu código */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    // Estilos para o texto
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  contentBox: {
    // Estilos para a caixa de conteúdo
  },
});

export default ProfileScreen;
