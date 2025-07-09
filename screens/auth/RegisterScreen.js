import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = () => {
    if (!contact) {
      setMessage('Vui lòng nhập email hoặc số điện thoại để xác minh.');
    } else {
      setMessage(`✅ Đã gửi mã xác minh tới ${contact}`);
    }
  };

  const handleRegister = () => {
    if (!name || !contact || !password || !confirmPassword || !verifyCode) {
      setMessage('❗ Vui lòng điền đầy đủ thông tin.');
    } else if (password !== confirmPassword) {
      setMessage('❗ Mật khẩu không khớp.');
    } else {
      setMessage('🎉 Đăng ký thành công!');
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://myindianthings.com/cdn/shop/products/Gym_Yoga_wallpapers-compressed-page-058_fc26df74-522a-478c-b75b-60c42d2a0624_700x.jpg?v=1658401627',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Tạo tài khoản mới</Text>

        {message !== '' && <Text style={styles.alert}>{message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email hoặc Số điện thoại"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={contact}
          onChangeText={setContact}
        />
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
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
          placeholder="Mật khẩu"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
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
  registerButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    marginBottom: 16,
  },
  registerButtonText: {
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
