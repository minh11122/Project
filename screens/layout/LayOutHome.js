import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';

export default function LayOutHome({ state, descriptors, navigation }) {
  return (
    <View style={styles.nav}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : route.name;

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
            style={styles.button}
          >
            <FontAwesome5
              name={icons[route.name]}
              size={20}
              solid={route.name === 'Report'} // chỉ 'Report' dùng solid icon
              color={isFocused ? '#2563eb' : '#9ca3af'}
            />
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
  },
  button: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
    marginTop: 4,
  },
  activeLabel: {
    color: '#2563eb',
  },
});
