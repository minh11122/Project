import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
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
      {/* Fixed Header */}
      <View style={styles.fixedHeaderContainer}>
        <Header />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar & Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>Nguyễn Văn A</Text>
          <Text style={styles.email}>nguyenvana@example.com</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
            <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.goalButton]}>
            <Text style={styles.buttonText}>Mục tiêu của tôi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
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