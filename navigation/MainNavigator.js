import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkoutScreen from '../screens/main/WorkoutScreen';
import DiscoverScreen from '../screens/main/DiscoverScreen';
import ReportScreen from '../screens/main/ReportScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import LayOutHome from '../screens/layout/LayOutHome';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Workout"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <LayOutHome {...props} />}
    >
      <Tab.Screen name="Workout" component={WorkoutScreen} options={{ tabBarLabel: 'Tập luyện' }} />
      <Tab.Screen name="Discover" component={DiscoverScreen} options={{ tabBarLabel: 'Khám phá' }} />
      <Tab.Screen name="Report" component={ReportScreen} options={{ tabBarLabel: 'Báo cáo' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Cài đặt' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Cá nhân' }} />
    </Tab.Navigator>
  );
}
