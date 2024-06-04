import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
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

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Implemente a lógica para exibir o conteúdo de acordo com a opção selecionada
  };

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

  return (
    <View>
      {/* Bloco com informações do perfil */}
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Image
          source={require('../../../assets/perfil.png')}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text>Seguidores: 100</Text>
        <Text>Seguindo: 50</Text>
        <Text>@SeuNome</Text>
        <Text>Breve descrição sobre você</Text>
        <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 5, marginTop: 10 }}>
          <Text style={{ color: 'white' }}>Seguir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'green', borderRadius: 5, marginTop: 10 }}>
          <Text style={{ color: 'white' }}>Mensagem</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera} style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'green', borderRadius: 5, marginTop: 10 }}>
          <Text style={{ color: 'white' }}>Câmera</Text>
        </TouchableOpacity>
      </View>

      {/* Botões de segmentação */}
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

      {/* Conteúdo a ser exibido */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Aqui você pode mapear e exibir até 6 quadros de conteúdo */}
        <View style={{ width: '30%', aspectRatio: 1, backgroundColor: 'lightgray', margin: 5 }} />
        <View style={{ width: '30%', aspectRatio: 1, backgroundColor: 'lightgray', margin: 5 }} />
        <View style={{ width: '30%', aspectRatio: 1, backgroundColor: 'lightgray', margin: 5 }} />
        <View style={{ width: '30%', aspectRatio: 1, backgroundColor: 'lightgray', margin: 5 }} />
        <View style={{ width: '30%', aspectRatio: 1, backgroundColor: 'lightgray', margin: 5 }} />
        <View style={{ width: '30%', aspectRatio: 1, backgroundColor: 'lightgray', margin: 5 }} />
      </View>
    </View>
  );
};

export default ProfileScreen;
