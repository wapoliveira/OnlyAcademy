import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import ProfileScreen from './src/pages/ProfileScreen';
import PlanSelectionScreen from './src/pages/PlanSelectionScreen';
import PaymentScreen from './src/pages/PaymentScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51PPF5fB6fHgKpaVPONYhb9TNPjIAw6ShyQfNMLmYIfw8RK1jvvlttteaDrCrFJKPWMaux0Ej9UlscEUFhsIuZqPl00REaP4cit">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Profile">
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="PlanSelection" component={PlanSelectionScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
