// screens/main/SettingsScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  StyleSheet,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languages = [
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'en', name: 'English' },
];

const SettingsScreen = () => {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [healthConnectEnabled, setHealthConnectEnabled] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const changeLanguage = async (languageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
      await AsyncStorage.setItem('language', languageCode);
      setLanguageModalVisible(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={styles(colors).languageItem}
      onPress={() => changeLanguage(item.code)}
    >
      <Text style={styles(colors).languageText}>{item.name}</Text>
      {i18n.language === item.code && (
        <Ionicons name="checkmark" size={20} color={colors.primary} />
      )}
    </TouchableOpacity>
  );

  const SettingItem = ({ icon, iconBg, title, subtitle, onPress, hasChevron = true }) => (
    <TouchableOpacity style={styles(colors).settingItem} onPress={onPress}>
      <View style={[styles(colors).iconBg, iconBg]}>
        <Ionicons name={icon} size={16} color={colors.card} />
      </View>
      <View style={styles(colors).settingTextContainer}>
        <Text style={styles(colors).settingTitle}>{t(title)}</Text>
        {subtitle && <Text style={styles(colors).settingSubtitle}>{t(subtitle)}</Text>}
      </View>
      {hasChevron && (
        <Ionicons name="chevron-forward" size={14} color={colors.secondary} />
      )}
    </TouchableOpacity>
  );

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles(colors).menuItem} onPress={onPress}>
      <View style={styles(colors).menuIconWrapper}>
        <Ionicons name={icon} size={16} color={colors.card} />
      </View>
      <Text style={styles(colors).menuTitle}>{t(title)}</Text>
    </TouchableOpacity>
  );

  const SyncItem = ({ icon, title, enabled, onToggle }) => (
    <View style={styles(colors).syncItem}>
      <View style={styles(colors).syncIconBg}>
        <Ionicons name={icon} size={16} color={colors.primary} />
      </View>
      <Text style={styles(colors).syncTitle}>{t(title)}</Text>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={colors.card}
        style={styles(colors).switch}
      />
    </View>
  );

  const Header = () => (
    <View style={styles(colors).header}>
      <Text style={styles(colors).headerTitle}>{t('SETTINGS')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles(colors).container}>
      <View style={styles(colors).fixedHeaderContainer}>
        <Header />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles(colors).scrollContent}
      >
        <View style={styles(colors).backupRestore}>
          <View style={styles(colors).backupText}>
            <View style={styles(colors).backupTitle}>
              <Text style={styles(colors).sectionTitle}>{t('Backup & Restore')}</Text>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png',
                }}
                style={styles(colors).googleLogo}
              />
            </View>
            <Text style={styles(colors).backupDesc}>{t('Sign in and synchronize your data')}</Text>
          </View>
          <TouchableOpacity style={styles(colors).refreshButton}>
            <Ionicons name="refresh" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles(colors).settingsList}>
          <SettingItem
            icon="fitness"
            iconBg={styles(colors).greenBg}
            title="Workout Settings"
            onPress={() => console.log('Workout Settings pressed')}
          />
          <View style={styles(colors).separator} />
          <SettingItem
            icon="settings"
            iconBg={styles(colors).blueBg}
            title="General Settings"
            onPress={() => console.log('General Settings pressed')}
          />
          <View style={styles(colors).separator} />
          <SettingItem
            icon="mic"
            iconBg={styles(colors).yellowBg}
            title="Voice Options (TTS)"
            onPress={() => console.log('Voice Options pressed')}
          />
          <View style={styles(colors).separator} />
          <SettingItem
            icon="chatbubble-ellipses"
            iconBg={styles(colors).cyanBg}
            title="Suggest Other Features"
            onPress={() => console.log('Suggest Features pressed')}
          />
          <View style={styles(colors).separator} />
          <SettingItem
            icon="globe"
            iconBg={styles(colors).purpleBg}
            title="Language Options"
            subtitle={i18n.language === 'vi' ? 'Tiếng Việt' : 'English'}
            onPress={() => setLanguageModalVisible(true)}
          />
          <View style={styles(colors).separator} />
          <SyncItem
            icon="moon"
            title="Dark Mode"
            enabled={theme === 'dark'}
            onToggle={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <View style={styles(colors).separator} />
          <SyncItem
            icon="heart"
            title="Sync to Health Connect"
            enabled={healthConnectEnabled}
            onToggle={setHealthConnectEnabled}
          />
        </View>
        <View style={styles(colors).menuContainer}>
          <MenuItem
            icon="share-social"
            title="Share with friends"
            onPress={() => console.log('Share pressed')}
          />
          <View style={styles(colors).separator} />
          <MenuItem
            icon="star"
            title="Rate us"
            onPress={() => console.log('Rate us pressed')}
          />
          <View style={styles(colors).separator} />
          <MenuItem
            icon="pencil"
            title="Feedback"
            onPress={() => console.log('Feedback pressed')}
          />
          <View style={styles(colors).separator} />
          <MenuItem
            icon="ban"
            title="Remove Ads"
            onPress={() => console.log('Remove Ads pressed')}
          />
        </View>
        <Text style={styles(colors).version}>{t('Version')} 1.5.2Y</Text>
      </ScrollView>
      <Modal
        visible={languageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles(colors).modalOverlay}>
          <View style={styles(colors).modalContainer}>
            <View style={styles(colors).modalHeader}>
              <Text style={styles(colors).modalTitle}>{t('Language Options')}</Text>
              <TouchableOpacity onPress={() => setLanguageModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={languages}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.code}
              contentContainerStyle={styles(colors).languageList}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = (colors) => StyleSheet.create({
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
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backupRestore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backupText: {
    flex: 1,
  },
  backupTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  googleLogo: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 4,
  },
  backupDesc: {
    fontSize: 12,
    color: colors.muted,
    lineHeight: 16,
  },
  refreshButton: {
    padding: 8,
    backgroundColor: colors.border,
    borderRadius: 12,
  },
  settingsList: {
    borderRadius: 24,
    backgroundColor: colors.card,
    marginBottom: 24,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 20,
  },
  iconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  settingSubtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
  },
  syncItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 20,
  },
  syncIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  syncTitle: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  menuContainer: {
    borderRadius: 24,
    backgroundColor: colors.card,
    marginBottom: 24,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 20,
  },
  menuIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  version: {
    textAlign: 'center',
    color: colors.muted,
    fontSize: 12,
    paddingVertical: 16,
  },
  greenBg: { backgroundColor: '#16a34a' },
  blueBg: { backgroundColor: '#3b82f6' },
  yellowBg: { backgroundColor: '#f59e0b' },
  cyanBg: { backgroundColor: '#06b6d4' },
  purpleBg: { backgroundColor: '#6b21a8' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    width: '80%',
    maxHeight: '80%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  languageList: {
    paddingVertical: 8,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  languageText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
});

export default SettingsScreen;