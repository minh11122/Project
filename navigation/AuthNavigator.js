import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import SetupNavigator from './SetupNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Setup" component={SetupNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
}