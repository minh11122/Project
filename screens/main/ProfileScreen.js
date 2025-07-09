import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trang cá nhân</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Avatar & Info */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Nguyễn Văn A</Text>
        <Text style={styles.email}>nguyenvana@example.com</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Mục tiêu của tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#f87171' }]}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  actions: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
