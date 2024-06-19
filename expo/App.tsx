import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import ProfileScreen from './src/pages/ProfileScreen';
import PlanSelectionScreen from './src/pages/PlanSelectionScreen';
import PaymentScreen from './src/pages/PaymentScreen';
import { createClient } from '@supabase/supabase-js';

const Stack = createStackNavigator();

// Configuração do Supabase
const supabaseUrl = 'https://pgatjmymbnwqegcwbmgk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYXRqbXltYm53cWVnY3dibWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NTA3ODQsImV4cCI6MjAzNDMyNjc4NH0.2PxGLUfPCPAs4TIHj8rPfaeu78f1uWiFZf-3_3MaYj4';
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51PPF5fB6fHgKpaVPONYhb9TNPjIAw6ShyQfNMLmYIfw8RK1jvvlttteaDrCrFJKPWMaux0Ej9UlscEUFhsIuZqPl00REaP4cit">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Profile">
          <Stack.Screen name="Profile">
            {props => <ProfileScreen {...props} supabase={supabase} />}
          </Stack.Screen>
          <Stack.Screen name="PlanSelection" component={PlanSelectionScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
