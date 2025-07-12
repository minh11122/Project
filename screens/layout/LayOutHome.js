// screens/layout/LayOutHome.js
import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust path as needed
import { useTranslation } from 'react-i18next';

export default function LayOutHome({ state, descriptors, navigation }) {
  const { colors } = useContext(ThemeContext); // Get colors from ThemeContext
  const { t } = useTranslation(); // Get translation function

  return (
    <View style={styles(colors).nav}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? t(options.tabBarLabel) // Translate tabBarLabel
            : t(route.name); // Fallback to translated route name

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        // Icon mapping
        const icons = {
          Workout: 'clock',
          Discover: 'compass',
          Report: 'chart-bar',
          Chat: 'comments',
          Settings: 'cog',
          Profile: 'user',
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles(colors).button}
          >
            <FontAwesome5
              name={icons[route.name]}
              size={20}
              solid={route.name === 'Report'} // Only 'Report' uses solid icon
              color={isFocused ? colors.primary : colors.secondary}
            />
            <Text style={[styles(colors).label, isFocused && styles(colors).activeLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = (colors) => StyleSheet.create({
  nav: {
    flexDirection: 'row',
    backgroundColor: colors.card, // Use card color for background
    borderTopWidth: 1,
    borderTopColor: colors.border,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
  },
  button: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: colors.secondary, // Use secondary color for inactive labels
    fontWeight: '600',
    marginTop: 4,
  },
  activeLabel: {
    color: colors.primary, // Use primary color for active labels
  },
});