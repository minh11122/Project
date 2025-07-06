import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GenderScreen from '../screens/setup/GenderScreen';
import FocusAreaScreen from '../screens/setup/FocusAreaScreen';
import GoalScreen from '../screens/setup/GoalScreen';
import MotivationScreen from '../screens/setup/MotivationScreen';
import ActivityLevelScreen from '../screens/setup/ActivityLevelScreen';
import TrainingLevelScreen from '../screens/setup/TrainingLevelScreen';
import SetGoalScreen from '../screens/setup/SetGoalScreen';
import HeightWeightScreen from '../screens/setup/HeightWeightScreen';
import LoadingScreen from '../screens/setup/LoadingScreen';

const Stack = createStackNavigator();

export default function SetupNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Gender"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="FocusArea" component={FocusAreaScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Motivation" component={MotivationScreen} />
      <Stack.Screen name="ActivityLevel" component={ActivityLevelScreen} />
      <Stack.Screen name="TrainingLevel" component={TrainingLevelScreen} />
      <Stack.Screen name="SetGoal" component={SetGoalScreen} />
      <Stack.Screen name="HeightWeight" component={HeightWeightScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
    </Stack.Navigator>
  );
}