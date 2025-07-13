import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust path as needed
import { useTranslation } from 'react-i18next';

const weeks = [1, 2, 3, 4];
const screenWidth = Dimensions.get('window').width;

const Exe2 = () => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const onLanguageChange = () => {
      console.log('Language changed in Exe2:', i18n.language);
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  return (
    <ScrollView style={styles(colors).container}>
      <View style={styles(colors).headerContainer}>
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/6400729f-7147-4853-3898-c012127b8bea.jpg' }}
          style={styles(colors).headerImage}
        />
        <View style={styles(colors).overlay} />
        <View style={styles(colors).headerContent}>
          {/* <TouchableOpacity>
            <Ionicons name="arrow-back" size={28} color={colors.text} />
          </TouchableOpacity> */}
          <Text style={styles(colors).headerTitle}>{t('on_body_challenge')}</Text>
          <View style={styles(colors).progressRow}>
            <Text style={styles(colors).progressText}>{t('days_remaining', { count: 28 })}</Text>
            <Text style={styles(colors).progressText}>0%</Text>
          </View>
          <View style={styles(colors).progressBarBg}>
            <View style={styles(colors).progressBarFg} />
          </View>
        </View>
      </View>

      <View style={styles(colors).contentContainer}>
        <View style={styles(colors).tipBox}>
          <Image
            source={{ uri: 'https://storage.googleapis.com/a1aa/image/c3e381f3-e8d0-45a9-d64a-68e06dcbd4f7.jpg' }}
            style={styles(colors).tipImage}
          />
          <Text style={styles(colors).tipText}>
            {t('start_fitness_journey')}
          </Text>
        </View>

        {weeks.map((week, index) => (
          <View key={week} style={styles(colors).weekContainer}>
            <View style={styles(colors).weekHeader}>
              <View style={styles(colors).weekLabel}>
                <View style={[styles(colors).weekDot, index > 0 && styles(colors).weekDotInactive]}>
                  <FontAwesome5 name="bolt" size={12} color={index === 0 ? colors.iconActive : colors.iconInactive} />
                </View>
                <Text style={[styles(colors).weekText, index > 0 && styles(colors).weekTextInactive]}>
                  {t('week', { number: week })}
                </Text>
              </View>
              <Text style={styles(colors).weekProgress}>{index === 0 ? '1/7' : ''}</Text>
            </View>
            <View style={styles(colors).dayRow}>
              {[...Array(7)].map((_, dayIndex) => (
                <TouchableOpacity
                  key={dayIndex}
                  disabled={index !== 0 || dayIndex !== 0}
                  style={
                    index === 0 && dayIndex === 0
                      ? styles(colors).activeDay
                      : styles(colors).inactiveDay
                  }
                >
                  <Text
                    style={
                      index === 0 && dayIndex === 0
                        ? styles(colors).activeDayText
                        : styles(colors).inactiveDayText
                    }
                  >
                    {dayIndex + 1}
                  </Text>
                </TouchableOpacity>
              ))}
              <Image
                source={{ uri: 'https://storage.googleapis.com/a1aa/image/e0dfcdf6-ca9f-4bda-283e-ab12dcc40b83.jpg' }}
                style={styles(colors).trophyIcon}
              />
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles(colors).startButton}>
          <Text style={styles(colors).startButtonText}>{t('go')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = (colors) => StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  headerContainer: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  headerContent: {
    zIndex: 10,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  progressText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.progressBarBg || '#374151',
    borderRadius: 3,
    marginTop: 6,
  },
  progressBarFg: {
    height: 6,
    backgroundColor: colors.progressBarFg || '#3b82f6',
    borderRadius: 3,
    width: screenWidth * 0.1,
  },
  contentContainer: {
    backgroundColor: colors.contentBackground || '#f3f4f6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 20,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: colors.tipBoxBg || '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  tipImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  tipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  weekContainer: {
    marginBottom: 30,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.weekDotActive || '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  weekDotInactive: {
    backgroundColor: colors.weekDotInactive || '#d1d5db',
  },
  weekText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.weekTextActive || '#3b82f6',
  },
  UweekTextInactive: {
    color: colors.weekTextInactive || '#6b7280',
  },
  weekProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.weekProgress || '#6b7280',
  },
  dayRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  activeDay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.activeDayBorder || '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDayText: {
    color: colors.activeDayText || '#3b82f6',
    fontWeight: '600',
  },
  inactiveDay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.inactiveDayBg || '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveDayText: {
    color: colors.inactiveDayText || '#9ca3af',
    fontWeight: '600',
  },
  trophyIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  startButton: {
    marginTop: 10,
    backgroundColor: colors.startButtonBg || '#3b82f6',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  startButtonText: {
    color: colors.startButtonText || 'white',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default Exe2;