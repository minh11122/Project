// MainNavigator.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkoutStack from './WorkoutStack';
import DiscoverScreen from '../screens/main/DiscoverScreen';
import ReportScreen from '../screens/main/ReportScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import LayOutHome from '../screens/layout/LayOutHome';
import ChatGemeni from '../screens/main/ChatGemeni';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Workout"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <LayOutHome {...props} />}
    >
      <Tab.Screen name="Workout" component={WorkoutStack} options={{ tabBarLabel: 'Workout' }} />
      <Tab.Screen name="Discover" component={DiscoverScreen} options={{ tabBarLabel: 'Discover' }} />
      <Tab.Screen name="Report" component={ReportScreen} options={{ tabBarLabel: 'Report' }} />
      <Tab.Screen name="Chat" component={ChatGemeni} options={{ tabBarLabel: 'Chat' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}