import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import UserService from '../../services/user.services';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.getUserById();
        setUser(userData);
      } catch (err) {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
        Alert.alert('Lỗi', err.message || 'Không thể tải thông tin người dùng');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>TRANG CÁ NHÂN</Text>
      <TouchableOpacity>
        <View style={styles.iconButton}>
          <Ionicons name="settings-outline" size={20} color={colors.text} />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeaderContainer}>
        <Header />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: user?.avatar || 'https://i.pravatar.cc/150?img=3',
              }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>{user?.fullname || 'Đang tải...'}</Text>
          <Text style={styles.email}>{user?.email || '...'}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
            <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.goalButton]}>
            <Text style={styles.buttonText}>Mục tiêu của tôi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const colors = {
  primary: '#2563eb',
  secondary: '#9ca3af',
  background: '#f9fafb',
  card: '#fff',
  text: '#000',
  muted: '#6b7280',
  border: '#e5e7eb',
  accent: '#f9d8a6',
  accentText: '#6b4b00',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fixedHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.background,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  iconButton: {
    padding: 8,
    backgroundColor: colors.border,
    borderRadius: 12,
  },
  scrollContent: {
    paddingTop: 60, // Adjust based on header height
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 24,
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 24,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarContainer: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: colors.primary,
    padding: 4,
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.muted,
  },
  actions: {
    marginTop: 24,
  },
  actionButton: {
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  goalButton: {
    backgroundColor: colors.accent,
  },
  logoutButton: {
    backgroundColor: '#f87171',
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});