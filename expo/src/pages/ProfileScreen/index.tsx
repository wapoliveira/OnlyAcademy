import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ProfileScreen = ({ navigation, supabase }) => {
  const [selectedOption, setSelectedOption] = useState('Tudo');
  const [profileImage, setProfileImage] = useState(null); // Estado para a imagem do perfil
  const [userInfo, setUserInfo] = useState({
    name: '@Wellington', // Nome do usuário
    bio: 'Breve descrição sobre você', // Bio do usuário
    profile_picture: require('../../../assets/perfil.png'), // Imagem padrão do perfil
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      // Salvando a imagem do perfil no estado
      setProfileImage(result.uri);
      uploadProfileImage(result.uri); // Chama a função para fazer upload da imagem
    }
  };

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // Salvando a imagem do perfil no estado
      setProfileImage(result.uri);
      uploadProfileImage(result.uri); // Chama a função para fazer upload da imagem
    }
  };

  const uploadProfileImage = async (imageUri) => {
    try {
      // Implemente a lógica para fazer upload da imagem para o Supabase
      const { data, error } = await supabase.storage
        .from('profiles')
        .upload(`profile/${Date.now()}`, imageUri, {
          contentType: 'image/jpeg', // Tipo de conteúdo da imagem
        });

      if (error) {
        throw error;
      }

      // Atualizar o perfil no banco de dados com o URL da imagem
      const updateProfile = await supabase.from('profiles').update({
        profile_picture: data.Key,
      }).eq('id', 'user-id'); // Substitua 'user-id' pelo ID do usuário

      if (updateProfile.error) {
        throw updateProfile.error;
      }

      // Atualizar as informações do usuário no estado local
      setUserInfo(prevState => ({
        ...prevState,
        profile_picture: { uri: data.Key }, // Atualiza a imagem de perfil no estado
      }));

      // Se tudo ocorrer bem, mostrar mensagem de sucesso
      alert('Imagem de perfil atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload da imagem de perfil:', error.message);
      alert('Erro ao fazer upload da imagem de perfil. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {/* Renderização da imagem de perfil */}
        <Image
          source={profileImage ? { uri: profileImage } : userInfo.profile_picture}
          style={styles.image}
        />
        <Text style={styles.text}>Seguidores: 100</Text>
        <Text style={styles.text}>Seguindo: 50</Text>
        <Text style={styles.text}>{userInfo.name}</Text>
        <Text style={styles.text}>{userInfo.bio}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PlanSelection')}>
          <Text style={styles.buttonText}>Escolher Plano</Text>
        </TouchableOpacity>
        {/* Botão para abrir a câmera */}
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
        {/* Botão para abrir a galeria de imagens */}
        <TouchableOpacity style={styles.button} onPress={openImagePicker}>
          <Text style={styles.buttonText}>Alterar Imagem de Perfil</Text>
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
