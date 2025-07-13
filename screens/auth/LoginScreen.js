import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auServices from '../../services/auth.services';

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  emailOrPhone: Yup.string()
    .required('Email hoặc số điện thoại là bắt buộc')
    .test('email-or-phone', 'Email hoặc số điện thoại không hợp lệ', (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,11}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  password: Yup.string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await auServices.login(values.emailOrPhone, values.password);
      console.log('Login successful:', response);
      await AsyncStorage.setItem('token', response.token);
      navigation.navigate('Setup');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Lỗi đăng nhập',
        error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại'
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.magicdecor.in/com/2023/10/13181733/Heavy-Lifting.jpg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Chào mừng đến với GymFit</Text>
        <Text style={styles.subtitle}>Đăng nhập để bắt đầu tập luyện</Text>

        <Formik
          initialValues={{ emailOrPhone: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.form}>
              <TextInput
                style={[styles.input, touched.emailOrPhone && errors.emailOrPhone && styles.inputError]}
                placeholder="Email hoặc SĐT"
                placeholderTextColor="#aaa"
                onChangeText={handleChange('emailOrPhone')}
                onBlur={handleBlur('emailOrPhone')}
                value={values.emailOrPhone}
                autoCapitalize="none"
              />
              {touched.emailOrPhone && errors.emailOrPhone && (
                <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
              )}

              <TextInput
                style={[styles.input, touched.password && errors.password && styles.inputError]}
                placeholder="Mật khẩu"
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, (loading || isSubmitting) && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading || isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {loading || isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/* <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Quên mật khẩu?</Text>
        </TouchableOpacity> */}

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Hoặc</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonOutlineText}>Tạo tài khoản mới</Text>
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
  form: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 16,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: '#87CEEB',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonOutline: {
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    marginBottom: 12,
  },
  buttonOutlineText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  forgotButton: {
    marginBottom: 24,
  },
  forgotText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#eee',
  },
});