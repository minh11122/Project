import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Adjust path as needed
import { useTranslation } from 'react-i18next';
import WorkoutScreen from '../screens/main/WorkoutScreen';
import Exe1 from '../screens/OtherExe/exe1';
import Exe2 from '../screens/OtherExe/exe2';
import StartWorkoutScreen from '../screens/OtherExe/StartWorkoutScreen';
import ExerciseScreen from '../screens/OtherExe/ExerciseScreen'; // Add new screen

const Stack = createStackNavigator();

const WorkoutStack = () => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const onLanguageChange = () => {
      console.log('Language changed in WorkoutStack:', i18n.language);
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  return (
    <Stack.Navigator
      initialRouteName="Workout"
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          title: t('home_workout'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Exe1"
        component={Exe1}
        options={{
          title: t('full_body_challenge_7x4'),
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name="Exe2"
        component={Exe2}
        options={{
          title: t('upper_body_challenge_7x4'),
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name="StartWorkout"
        component={StartWorkoutScreen}
        options={{
          title: t('start_workout'),
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          title: t('exercise'),
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
    </Stack.Navigator>
  );
};

export default WorkoutStack;