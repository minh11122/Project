// ProfileScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ProfileScreen = ({ navigation, route }) => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [userData, setUserData] = useState({
    fullname: 'Nguyễn Văn A',
    email: 'user@example.com',
    phone: '0987654321',
    picture: 'https://i.pravatar.cc/150?img=3',
  });

  useEffect(() => {
    const onLanguageChange = () => {
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  // ⬇ Nhận lại dữ liệu từ màn EditProfile
  useEffect(() => {
    if (route.params?.updatedUser) {
      setUserData(route.params.updatedUser);
    }
  }, [route.params?.updatedUser]);

  const Header = () => (
    <View style={styles(colors).header}>
      <Text style={styles(colors).headerTitle}>{t('profile')}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <View style={styles(colors).iconButton}>
          <Ionicons name="settings-outline" size={20} color={colors.text} />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles(colors).container}>
      <View style={styles(colors).fixedHeaderContainer}>
        <Header />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles(colors).scrollContent}>
        <View style={styles(colors).profileSection}>
          <View style={styles(colors).avatarContainer}>
            <Image source={{ uri: userData.picture }} style={styles(colors).avatar} />
          </View>
          <Text style={styles(colors).name}>{userData.fullname}</Text>
          <Text style={styles(colors).email}>{userData.email}</Text>
        </View>
        <View style={styles(colors).actions}>
          <TouchableOpacity
            style={[styles(colors).actionButton, styles(colors).editButton]}
            onPress={() =>
              navigation.navigate('EditProfile', {
                userData,
                colors,
              })
            }
          >
            <Text style={styles(colors).buttonText}>{t('edit_profile')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(colors).actionButton, styles(colors).goalButton]}
            onPress={() => console.log('My goals pressed')}
          >
            <Text style={styles(colors).buttonText}>{t('my_goals')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(colors).actionButton, styles(colors).logoutButton]}
            onPress={() => console.log('Logout pressed')}
          >
            <Text style={styles(colors).buttonText}>{t('logout')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  fixedHeaderContainer: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: colors.text },
  iconButton: { padding: 8, backgroundColor: colors.border, borderRadius: 12 },
  scrollContent: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 40 },
  profileSection: {
    alignItems: 'center', marginTop: 24, padding: 20, backgroundColor: colors.card,
    borderRadius: 24, shadowColor: colors.text, shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  avatarContainer: {
    width: 104, height: 104, borderRadius: 52, borderWidth: 3,
    borderColor: colors.primary, padding: 4, marginBottom: 16,
  },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  name: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 4 },
  email: { fontSize: 14, color: colors.muted },
  actions: { marginTop: 24 },
  actionButton: {
    borderRadius: 24, paddingVertical: 14, paddingHorizontal: 20,
    marginBottom: 16, shadowColor: colors.text, shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  editButton: { backgroundColor: colors.primary },
  goalButton: { backgroundColor: colors.accent },
  logoutButton: { backgroundColor: '#f87171' },
  buttonText: { color: colors.card, fontSize: 16, fontWeight: '600', textAlign: 'center' },
});

export default ProfileScreen;
