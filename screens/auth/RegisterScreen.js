import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auServices from '../../services/auth.services';

// Validation schema using Yup
const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required('Họ và tên là bắt buộc'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại là bắt buộc'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Mật khẩu là bắt buộc'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
    .required('Xác nhận mật khẩu là bắt buộc'),
});

export default function RegisterScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await auServices.register({
        email: values.email,
        phone: values.phone,
        fullName: values.fullName,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      Alert.alert('Thành công', response.message || 'Đăng ký thành công!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert(
        'Lỗi đăng ký',
        error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại'
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
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

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.form}>
              <TextInput
                style={[styles.input, touched.fullName && errors.fullName && styles.inputError]}
                placeholder="Họ và tên"
                placeholderTextColor="#ccc"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              <TextInput
                style={[styles.input, touched.email && errors.email && styles.inputError]}
                placeholder="Email"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                style={[styles.input, touched.phone && errors.phone && styles.inputError]}
                placeholder="Số điện thoại"
                placeholderTextColor="#ccc"
                keyboardType="phone-pad"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              <TextInput
                style={[styles.input, touched.password && errors.password && styles.inputError]}
                placeholder="Mật khẩu"
                placeholderTextColor="#ccc"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TextInput
                style={[styles.input, touched.confirmPassword && errors.confirmPassword && styles.inputError]}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#ccc"
                secureTextEntry
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity
                style={[styles.registerButton, (loading || isSubmitting) && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading || isSubmitting}
              >
                <Text style={styles.registerButtonText}>
                  {loading || isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
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
  form: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
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
  registerButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#FF9B4D',
    opacity: 0.7,
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