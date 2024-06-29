import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../../supabase'; // Verifique se o caminho está correto

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '@Wellington',
    bio: 'Breve descrição sobre você',
    profile_picture: require('../../../assets/perfil.png'),
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
      setProfileImage(result.uri);
      uploadProfileImage(result.uri);
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
      setProfileImage(result.uri);
      uploadProfileImage(result);
    }
  };

  const uploadProfileImage = async (imageUri) => {
    try {
      // const response = await fetch(imageUri);
      // const blob = await response.blob();
const {data: user, error: e}: any = await supabase.auth.getUser();
      console.log('Usuário autenticado:', user); // Log para verificar se o usuário está autenticado
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const imageName = `${user.user.id}/avatar-${Date.now()}`

      const { data, error } = await supabase.storage
        .from('images')
        .upload(imageName, imageUri, {
          contentType: 'image/jpeg',
        });

      if (error) {
        console.error('upload', error)
        throw error;
      }

      

      const {data: profileData, error: updateProfileError} = await supabase.from('profiles').update({
        profile_picture: imageName,
      }).eq('id', user.user.id);

      console.log({profileData})

      if (updateProfileError) {
        console.error('updateProfile', updateProfileError)
        throw updateProfileError;
      }

      setUserInfo(prevState => ({
        ...prevState,
        profile_picture: { uri: user.user.id },
      }));

      alert('Imagem de perfil atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload da imagem de perfil:', error.message);
      alert('Erro ao fazer upload da imagem de perfil. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openImagePicker}>
        <Text style={styles.buttonText}>Alterar Imagem de Perfil</Text>
      </TouchableOpacity>
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
});

export default ProfileScreen;
