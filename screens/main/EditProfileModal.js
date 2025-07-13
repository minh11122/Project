import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const EditProfileScreen = ({ navigation, route }) => {
  const { colors, userData } = route.params;
  const [fullname, setFullname] = useState(userData.fullname);
  const [phone, setPhone] = useState(userData.phone);
  const [avatar, setAvatar] = useState(userData.picture);
  const [errors, setErrors] = useState({});

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!fullname.trim()) {
      newErrors.fullname = 'Họ tên không được để trống';
    } else if (fullname.trim().length < 2) {
      newErrors.fullname = 'Họ tên phải có ít nhất 2 ký tự';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^[0-9]{10,11}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const updated = { fullname, phone, picture: avatar, email: userData.email };
    navigation.navigate('MainTabs', {
      screen: 'Profile',
      params: { updatedUser: updated },
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Custom Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Chỉnh sửa hồ sơ
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            Cập nhật thông tin cá nhân
          </Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Picture Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'transparent']}
                style={styles.avatarOverlay}
              />
              <TouchableOpacity 
                onPress={pickImage}
                style={[styles.editAvatarButton, { backgroundColor: colors.primary }]}
                activeOpacity={0.8}
              >
                <Ionicons name="camera" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={pickImage} style={styles.changePhotoContainer}>
              <Text style={[styles.changePhotoText, { color: colors.primary }]}>
                Thay đổi ảnh đại diện
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Personal Information Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Thông tin cá nhân
            </Text>
          </View>

          {/* Full Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.text }]}>
              Họ và tên *
            </Text>
            <View style={[
              styles.inputWrapper, 
              { 
                backgroundColor: colors.background,
                borderColor: errors.fullname ? '#ff4757' : colors.border 
              }
            ]}>
              <Ionicons 
                name="person-outline" 
                size={20} 
                color={errors.fullname ? '#ff4757' : colors.muted} 
                style={styles.inputIcon} 
              />
              <TextInput
                value={fullname}
                onChangeText={(text) => {
                  setFullname(text);
                  if (errors.fullname) {
                    setErrors(prev => ({ ...prev, fullname: null }));
                  }
                }}
                placeholder="Nhập họ và tên"
                placeholderTextColor={colors.muted}
                style={[styles.textInput, { color: colors.text }]}
              />
            </View>
            {errors.fullname && (
              <Text style={styles.errorText}>{errors.fullname}</Text>
            )}
          </View>

          {/* Phone Field */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.text }]}>
              Số điện thoại *
            </Text>
            <View style={[
              styles.inputWrapper, 
              { 
                backgroundColor: colors.background,
                borderColor: errors.phone ? '#ff4757' : colors.border 
              }
            ]}>
              <Ionicons 
                name="call-outline" 
                size={20} 
                color={errors.phone ? '#ff4757' : colors.muted} 
                style={styles.inputIcon} 
              />
              <TextInput
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  if (errors.phone) {
                    setErrors(prev => ({ ...prev, phone: null }));
                  }
                }}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                placeholderTextColor={colors.muted}
                style={[styles.textInput, { color: colors.text }]}
              />
            </View>
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>
        </View>

        {/* Account Information Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Thông tin tài khoản
            </Text>
          </View>

          {/* Email Field (Read-only) */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.text }]}>
              Email
            </Text>
            <View style={[styles.inputWrapper, styles.disabledInput]}>
              <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                value={userData.email}
                editable={false}
                style={[styles.textInput, { color: '#999' }]}
              />
              <View style={styles.lockContainer}>
                <Ionicons name="lock-closed" size={16} color="#999" />
              </View>
            </View>
            <Text style={[styles.helperText, { color: colors.muted }]}>
              Email không thể thay đổi
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveButtonContainer}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[colors.primary, colors.primary + 'CC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.saveButton}
            >
              <Ionicons name="checkmark-circle" size={22} color="#fff" />
              <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGoBack}
            style={[styles.cancelButton, { borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.cancelButtonText, { color: colors.text }]}>
              Hủy bỏ
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
    opacity: 0.7,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarSection: {
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  changePhotoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 52,
  },
  disabledInput: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e9ecef',
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  lockContainer: {
    marginLeft: 8,
  },
  errorText: {
    color: '#ff4757',
    fontSize: 14,
    marginTop: 6,
    marginLeft: 4,
  },
  helperText: {
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
    opacity: 0.7,
  },
  actionContainer: {
    marginTop: 20,
  },
  saveButtonContainer: {
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 8,
  },
  cancelButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});

export default EditProfileScreen;