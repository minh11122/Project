import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
} from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [contact, setContact] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSendCode = () => {
    if (!contact) {
      setMessage('❗ Vui lòng nhập email hoặc số điện thoại.');
    } else {
      setMessage(`✅ Đã gửi mã xác minh đến ${contact}`);
    }
  };

  const handleReset = () => {
    if (!verifyCode || !newPassword) {
      setMessage('❗ Vui lòng nhập đầy đủ mã và mật khẩu mới.');
    } else {
      setMessage('🎉 Mật khẩu đã được cập nhật!');
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://c4.wallpaperflare.com/wallpaper/206/268/839/pose-muscle-muscle-rod-press-hd-wallpaper-preview.jpg',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Khôi phục mật khẩu</Text>

        {message !== '' && <Text style={styles.alert}>{message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email hoặc Số điện thoại"
          placeholderTextColor="#ccc"
          value={contact}
          onChangeText={setContact}
        />

        <TouchableOpacity style={styles.verifyButton} onPress={handleSendCode}>
          <Text style={styles.verifyText}>Gửi mã xác minh</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nhập mã xác minh"
          placeholderTextColor="#ccc"
          value={verifyCode}
          onChangeText={setVerifyCode}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Đặt lại mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  alert: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: 14,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 12,
  },
  verifyButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  verifyText: {
    color: '#1E90FF',
    fontSize: 14,
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    marginBottom: 16,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 10,
  },
  backText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
});
