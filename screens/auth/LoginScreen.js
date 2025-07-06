import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Setup')}
      >
        <Text style={styles.buttonText}>Go to Setup</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.buttonText}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});