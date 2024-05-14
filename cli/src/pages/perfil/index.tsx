import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  const [selectedOption, setSelectedOption] = useState('Tudo');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Implemente a lógica para exibir o conteúdo de acordo com a opção selecionada
  };

  return (
    <View>
      {/* Bloco com informações do perfil */}
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Image
          source={require('./caminho/para/sua/foto.jpg')}
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
