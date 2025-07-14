// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Load theme from AsyncStorage when app starts
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  // Save theme to AsyncStorage whenever it changes
  const toggleTheme = async (newTheme) => {
    try {
      setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const themeColors = {
    light: {
      primary: '#2563eb',
      secondary: '#9ca3af',
      background: '#f9fafb',
      card: '#fff',
      text: '#000',
      muted: '#6b7280',
      border: '#e5e7eb',
      accent: '#f9d8a6',
      accentText: '#6b4b00',
      success: '#10b981',
      pauseButton: '#2563eb',
      pauseButtonText: '#fff',
      backButton: '#e5e7eb',
      iconButton: '#e5e7eb',
      icon: '#4b5563',
      disabled: '#9ca3af',
      helpText: '#4b5563',
      error: '#ef4444',
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#6b7280',
      background: '#1f2937',
      card: '#374151',
      text: '#f9fafb',
      muted: '#9ca3af',
      border: '#4b5563',
      accent: '#d97706',
      accentText: '#fef3c7',
      success: '#34d399',
      pauseButton: '#60a5fa',
      pauseButtonText: '#fff',
      backButton: '#4b5563',
      iconButton: '#4b5563',
      icon: '#9ca3af',
      disabled: '#6b7280',
      helpText: '#9ca3af',
      error: '#f87171',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};