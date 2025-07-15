import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust path as needed
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const StartWorkoutScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const navigation = useNavigation();
  const route = useRoute();
  const { exercises = [] } = route.params || {};

  useEffect(() => {
    const onLanguageChange = () => {
      console.log('Language changed in StartWorkoutScreen:', i18n.language);
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).headerImageWrapper}>
        <Image
          source={{
            uri: 'https://storage.googleapis.com/a1aa/image/04070435-2f8b-4851-e941-83d365971202.jpg',
          }}
          style={styles(colors).headerImage}
          accessible
          accessibilityLabel={t('muscular_man_torso')}
        />
        <TouchableOpacity
          style={styles(colors).btnBack}
          onPress={() => navigation.goBack()}
          accessibilityLabel={t('back')}
        >
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>
        <View style={styles(colors).hdBadge}>
          <Text style={styles(colors).hdBadgeText}>HD</Text>
        </View>
        <TouchableOpacity style={styles(colors).btnMore} accessibilityLabel={t('more_options')}>
          <Ionicons name="ellipsis-vertical" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles(colors).content}>
        <Text style={styles(colors).title}>{t('day_1')}</Text>
        <View style={styles(colors).infoCards}>
          <View style={styles(colors).infoCard}>
            <Text style={styles(colors).infoCardValue}>9 {t('minutes')}</Text>
            <Text style={styles(colors).infoCardLabel}>{t('duration')}</Text>
          </View>
          <View style={styles(colors).infoCard}>
            <Text style={styles(colors).infoCardValue}>10</Text>
            <Text style={styles(colors).infoCardLabel}>{t('exercises')}</Text>
          </View>
        </View>

        <View style={styles(colors).exercisesHeader}>
          <Text style={styles(colors).exercisesHeaderTitle}>{t('exercises')}</Text>
          <TouchableOpacity style={styles(colors).editButton} accessibilityLabel={t('edit_exercises')}>
            <Text style={styles(colors).editButtonText}>{t('edit')}</Text>
            <Ionicons name="chevron-forward" size={12} color={colors.editButton || '#2563eb'} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles(colors).exerciseList}>
          {exercises.map((exercise, index) => (
            <View key={index} style={styles(colors).exerciseItem}>
              <TouchableOpacity style={styles(colors).dragHandle} accessibilityLabel={t('drag_handle', { name: exercise.name })}>
                <Ionicons name="menu" size={20} color={colors.icon || '#9ca3af'} />
              </TouchableOpacity>
              <Image
                source={{ uri: exercise.image }}
                style={styles(colors).exerciseImage}
                accessible
                accessibilityLabel={t('exercise_image', { name: exercise.name })}
              />
              <View style={styles(colors).exerciseInfo}>
                <Text style={styles(colors).exerciseName}>{exercise.name}</Text>
                <Text style={styles(colors).exerciseDuration}>{typeof exercise.duration === 'number' ? `${exercise.duration}s` : exercise.duration}</Text>
              </View>
              <TouchableOpacity style={styles(colors).reorderHandle} accessibilityLabel={t('reorder_handle', { name: exercise.name })}>
                <Ionicons name="swap-vertical" size={20} color={colors.icon || '#9ca3af'} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles(colors).footer}>
        <TouchableOpacity
          style={styles(colors).startButton}
          onPress={() => navigation.navigate('Exercise', { exercises })} // Truyền đúng mảng đã có quảng nghỉ
          accessibilityLabel={t('start_workout')}
        >
          <Text style={styles(colors).startButtonText}>{t('start')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerImageWrapper: {
    height: 192,
    position: 'relative',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  btnBack: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnMore: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hdBadge: {
    position: 'absolute',
    top: 12,
    right: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 9999,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  hdBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 10,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingBottom: 0,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    color: colors.text || '#111827',
    marginBottom: 24,
  },
  infoCards: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.infoCard || '#f5f7fa',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  infoCardValue: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.text || '#111827',
    marginBottom: 4,
  },
  infoCardLabel: {
    fontWeight: '400',
    fontSize: 12,
    color: colors.label || '#9ca3af',
  },
  exercisesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exercisesHeaderTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.text || '#111827',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.editButton || '#2563eb',
  },
  exerciseList: {
    flex: 1,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border || '#e5e7eb',
  },
  dragHandle: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    resizeMode: 'contain',
  },
  exerciseInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  exerciseName: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.text || '#111827',
    lineHeight: 19.2,
  },
  exerciseDuration: {
    fontWeight: '400',
    fontSize: 12,
    color: colors.label || '#9ca3af',
    marginTop: 4,
  },
  reorderHandle: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 24,
    backgroundColor: colors.background || '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  startButton: {
    backgroundColor: colors.startButton || '#2563eb',
    borderRadius: 9999,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: colors.startButtonText || '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default StartWorkoutScreen;