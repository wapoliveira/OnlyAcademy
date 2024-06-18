import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const PlanSelectionScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Choose your plan</Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: 'blue',
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={{ color: 'white' }}>FREE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: 'green',
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate('PaymentScreen', { plan: 'Mensal' })}
      >
        <Text style={{ color: 'white' }}>Premium Mensal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: 'orange',
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate('PaymentScreen', { plan: 'Anual' })}
      >
        <Text style={{ color: 'white' }}>Premium Anual</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlanSelectionScreen;
