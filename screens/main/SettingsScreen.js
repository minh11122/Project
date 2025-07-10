import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [healthConnectEnabled, setHealthConnectEnabled] = useState(false);

  const SettingItem = ({ icon, iconBg, title, subtitle, onPress, hasChevron = true }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={[styles.iconBg, iconBg]}>
        <Ionicons name={icon} size={16} color={colors.card} />
      </View>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {hasChevron && (
        <Ionicons name="chevron-forward" size={14} color={colors.secondary} />
      )}
    </TouchableOpacity>
  );

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconWrapper}>
        <Ionicons name={icon} size={16} color={colors.card} />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const SyncItem = ({ icon, title, enabled, onToggle }) => (
    <View style={styles.syncItem}>
      <View style={styles.syncIconBg}>
        <Ionicons name={icon} size={16} color={colors.primary} />
      </View>
      <Text style={styles.syncTitle}>{title}</Text>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={colors.card}
        style={styles.switch}
      />
    </View>
  );

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>SETTINGS</Text>
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
        {/* Backup & Restore Section */}
        <View style={styles.backupRestore}>
          <View style={styles.backupText}>
            <View style={styles.backupTitle}>
              <Text style={styles.sectionTitle}>Backup & Restore</Text>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png',
                }}
                style={styles.googleLogo}
              />
            </View>
            <Text style={styles.backupDesc}>Sign in and synchronize your data</Text>
          </View>
          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons name="refresh" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Premium Button */}
        <TouchableOpacity style={styles.premiumButton}>
          <Ionicons name="ban" size={16} color={colors.card} />
          <Text style={styles.premiumText}>GO PREMIUM</Text>
        </TouchableOpacity>

        {/* Settings List */}
        <View style={styles.settingsList}>
          <SettingItem
            icon="fitness"
            iconBg={styles.greenBg}
            title="Workout Settings"
            onPress={() => console.log('Workout Settings pressed')}
          />
          <View style={styles.separator} />
          <SettingItem
            icon="settings"
            iconBg={styles.blueBg}
            title="General Settings"
            onPress={() => console.log('General Settings pressed')}
          />
          <View style={styles.separator} />
          <SettingItem
            icon="mic"
            iconBg={styles.yellowBg}
            title="Voice Options (TTS)"
            onPress={() => console.log('Voice Options pressed')}
          />
          <View style={styles.separator} />
          <SettingItem
            icon="chatbubble-ellipses"
            iconBg={styles.cyanBg}
            title="Suggest Other Features"
            onPress={() => console.log('Suggest Features pressed')}
          />
          <View style={styles.separator} />
          <SettingItem
            icon="globe"
            iconBg={styles.purpleBg}
            title="Language Options"
            subtitle="Default"
            onPress={() => console.log('Language Options pressed')}
          />
          <View style={styles.separator} />
          <SyncItem
            icon="heart"
            title="Sync to Health Connect"
            enabled={healthConnectEnabled}
            onToggle={setHealthConnectEnabled}
          />
        </View>

        {/* Menu Container */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon="share-social"
            title="Share with friends"
            onPress={() => console.log('Share pressed')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon="star"
            title="Rate us"
            onPress={() => console.log('Rate us pressed')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon="pencil"
            title="Feedback"
            onPress={() => console.log('Feedback pressed')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon="ban"
            title="Remove Ads"
            onPress={() => console.log('Remove Ads pressed')}
          />
        </View>

        <Text style={styles.version}>Version 1.5.2Y</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  scrollContent: {
    paddingTop: 60, // Adjust based on header height
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
  premiumButton: {
    width: '100%',
    backgroundColor: colors.accent,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 24,
    gap: 8,
  },
  premiumText: {
    color: colors.accentText,
    fontWeight: '600',
    fontSize: 14,
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
});

export default SettingsScreen;