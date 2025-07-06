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
        <Ionicons name={icon} size={16} color="white" />
      </View>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {hasChevron && (
        <Ionicons name="chevron-forward" size={14} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconWrapper}>
        <Ionicons name={icon} size={16} color="white" />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const SyncItem = ({ icon, title, enabled, onToggle }) => (
    <View style={styles.syncItem}>
      <View style={styles.syncIconBg}>
        <Ionicons name={icon} size={16} color="#0284c7" />
      </View>
      <Text style={styles.syncTitle}>{title}</Text>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: '#d1d5db', true: '#2563eb' }}
        thumbColor="white"
        style={styles.switch}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.header}>SETTINGS</Text>

          {/* Backup & Restore Section */}
          <View style={styles.backupRestore}>
            <View style={styles.backupText}>
              <View style={styles.backupTitle}>
                <Text style={styles.backupTitleText}>Backup & Restore</Text>
                <Image
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png'
                  }}
                  style={styles.googleLogo}
                />
              </View>
              <Text style={styles.backupDesc}>Sign in and synchronize your data</Text>
            </View>
            <TouchableOpacity style={styles.refreshButton}>
              <Ionicons name="refresh" size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>

          {/* Premium Button */}
          <TouchableOpacity style={styles.premiumButton}>
            <Ionicons name="ban" size={16} color="white" />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    margin: 20,
    padding: 20,
    paddingBottom: 10,
  },
  header: {
    fontWeight: '800',
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    fontFamily: 'System',
  },
  backupRestore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backupText: {
    flex: 1,
  },
  backupTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  backupTitleText: {
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
    marginRight: 4,
  },
  googleLogo: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  backupDesc: {
    fontSize: 11,
    color: '#6b7280',
    lineHeight: 13,
  },
  refreshButton: {
    padding: 4,
  },
  premiumButton: {
    width: '100%',
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 20,
    gap: 8,
  },
  premiumText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  settingsList: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
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
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  settingSubtitle: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  syncItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
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
    fontSize: 14,
    color: 'black',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  menuContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  menuIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#64748b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 14,
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  version: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 12,
    paddingVertical: 16,
  },
  greenBg: { backgroundColor: '#16a34a' },
  blueBg: { backgroundColor: '#3b82f6' },
  yellowBg: { backgroundColor: '#f59e0b' },
  cyanBg: { backgroundColor: '#06b6d4' },
  purpleBg: { backgroundColor: '#6b21a8' },
  grayBg: { backgroundColor: '#64748b' },
});

export default SettingsScreen;