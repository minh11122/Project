import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust path as needed
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const ReportScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [currentWeight, setCurrentWeight] = useState('--');
  const [heaviestWeight, setHeaviestWeight] = useState('--');
  const [lightestWeight, setLightestWeight] = useState('--');
  const [bmiValue, setBmiValue] = useState('--');
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const onLanguageChange = () => {
      console.log('Language changed in ReportScreen:', i18n.language);
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  const ReportItem = ({ icon, number, label }) => (
    <View style={styles(colors).reportItem}>
      <View style={styles(colors).iconContainer}>
        <Ionicons name={icon} size={22} color={colors.text} />
        <View style={styles(colors).iconBadge} />
      </View>
      <Text style={styles(colors).reportNumber}>{number}</Text>
      <Text style={styles(colors).reportLabel}>{t(label)}</Text>
    </View>
  );

  const CalendarDay = ({ day, isActive, isInactive }) => (
    <View style={styles(colors).dateContainer}>
      {isActive ? (
        <View style={styles(colors).activeDate}>
          <Text style={styles(colors).activeDateText}>{day}</Text>
        </View>
      ) : (
        <Text style={[styles(colors).dateText, isInactive && styles(colors).inactiveDate]}>
          {day}
        </Text>
      )}
    </View>
  );

  const BMIColorBar = () => (
    <View style={styles(colors).colorBar}>
      <View style={[styles(colors).colorSegment, styles(colors).blueDark]} />
      <View style={[styles(colors).colorSegment, styles(colors).blueLight]} />
      <View style={[styles(colors).colorSegment, styles(colors).cyan]} />
      <View style={[styles(colors).colorSegment, styles(colors).yellow]} />
      <View style={[styles(colors).colorSegment, styles(colors).orange]} />
      <View style={[styles(colors).colorSegment, styles(colors).red]} />
    </View>
  );

  const WeightChart = () => (
    <View style={styles(colors).chartContainer}>
      <View style={styles(colors).chartLabels}>
        {['700', '600', '500', '400', '300', '200', '100'].map((label, index) => (
          <Text key={index} style={styles(colors).chartLabel}>{label}</Text>
        ))}
      </View>
      <View style={styles(colors).chartDates}>
        {['23', '24', '25', '26', '27', '28', '29'].map((date, index) => (
          <Text key={index} style={styles(colors).chartDate}>{date}</Text>
        ))}
      </View>
    </View>
  );

  const Header = () => (
    <View style={styles(colors).header}>
      <Text style={styles(colors).headerTitle}>{t('report')}</Text>
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
        <View style={styles(colors).reportBox}>
          <ReportItem icon="medal" number="0" label="workout" />
          <ReportItem icon="water" number="0" label="kcal" />
          <ReportItem icon="time" number="0" label="minute" />
        </View>
        <View style={styles(colors).historyHeader}>
          <Text style={styles(colors).sectionTitle}>{t('history')}</Text>
          <TouchableOpacity onPress={() => console.log('All records pressed')}>
            <Text style={styles(colors).allRecordsLink}>{t('all_records')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles(colors).historyBox}>
          <View style={styles(colors).weekdays}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={index} style={styles(colors).weekdayText}>{day}</Text>
            ))}
          </View>
          <View style={styles(colors).dates}>
            <CalendarDay day="22" />
            <CalendarDay day="23" />
            <CalendarDay day="24" />
            <CalendarDay day="25" />
            <CalendarDay day="26" isActive />
            <CalendarDay day="27" isInactive />
            <CalendarDay day="28" isInactive />
          </View>
          <View style={styles(colors).dayStreak}>
            <Text style={styles(colors).dayStreakText}>{t('day_streak')}</Text>
            <Ionicons name="flame" size={18} color="#ef4444" />
            <Text style={styles(colors).dayStreakNumber}>0</Text>
          </View>
        </View>
        <View style={styles(colors).section}>
          <View style={styles(colors).sectionHeader}>
            <Text style={styles(colors).sectionTitle}>{t('weight')}</Text>
            <TouchableOpacity
              style={styles(colors).logButton}
              onPress={() => console.log('Log weight pressed')}
            >
              <Text style={styles(colors).logButtonText}>{t('log')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles(colors).historyBox}>
            <View style={styles(colors).stats}>
              <View style={styles(colors).statsLeft}>
                <Text style={styles(colors).statsLabel}>{t('current')}</Text>
                <Text style={styles(colors).statsValue}>{currentWeight}</Text>
              </View>
              <View style={styles(colors).statsRight}>
                <Text style={styles(colors).statsLabel}>{t('heaviest')}</Text>
                <Text style={styles(colors).statsValue}>{heaviestWeight}</Text>
                <Text style={styles(colors).statsLabel}>{t('lightest')}</Text>
                <Text style={styles(colors).statsValue}>{lightestWeight}</Text>
              </View>
            </View>
            <WeightChart />
          </View>
        </View>
        <View style={styles(colors).progressBarBg} />
        <View style={styles(colors).bmiContainer}>
          <View style={styles(colors).bmiHeader}>
            <Text style={styles(colors).sectionTitle}>{t('bmi')}</Text>
            <TouchableOpacity
              style={styles(colors).editButton}
              onPress={() => console.log('Edit BMI pressed')}
            >
              <Text style={styles(colors).editButtonText}>{t('edit')}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles(colors).bmiValue}>{bmiValue}</Text>
          <BMIColorBar />
          <View style={styles(colors).scaleLabels}>
            {['15', '16', '18.5', '25', '30', '35', '40'].map((label, index) => (
              <Text key={index} style={styles(colors).scaleLabel}>{label}</Text>
            ))}
          </View>
          <View style={styles(colors).heightRow}>
            <Text style={styles(colors).heightText}>{t('height')}</Text>
            <TouchableOpacity
              style={styles(colors).heightEdit}
              onPress={() => console.log('Edit height pressed')}
            >
              <Text style={styles(colors).heightEditText}>{t('edit')}</Text>
              <Ionicons name="pencil" size={10} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles(colors).imageSection}>
          <ImageBackground
            source={{
              uri: 'https://storage.googleapis.com/a1aa/image/ad6c185a-4ca3-43b4-fb77-bc2e4821e76d.jpg',
            }}
            style={styles(colors).backgroundImage}
            imageStyle={styles(colors).backgroundImageStyle}
          >
            <Image
              source={{
                uri: 'https://storage.googleapis.com/a1aa/image/1aa2a23d-4b6a-4413-df09-a1b2093f51f9.jpg',
              }}
              style={styles(colors).circleImage}
            />
            <View style={styles(colors).weeksLabel}>
              <Text style={styles(colors).weeksText}>{t('four_weeks')}</Text>
            </View>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles(colors).imageGradient}
            />
            <Text style={styles(colors).jawlineText}>{t('get_chiseled_jawline')}</Text>
          </ImageBackground>
        </View>
        <View style={styles(colors).adSection}>
          <View style={styles(colors).adHeader}>
            <View style={styles(colors).adLabel}>
              <Text style={styles(colors).adLabelText}>{t('ad')}</Text>
            </View>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/a1aa/image/0714f18b-0fd1-464a-d9d4-088d1f7d5739.jpg',
              }}
              style={styles(colors).adIcon}
            />
            <Text style={styles(colors).adTitle}>{t('jawline_exercises')}</Text>
          </View>
          <Text style={styles(colors).adDesc}>{t('jawline_exercises_desc')}</Text>
        </View>
        <LinearGradient
          colors={['#f43f5e', '#ec4899']}
          style={styles(colors).installButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={styles(colors).installButtonTouchable}
            onPress={() => console.log('Install pressed')}
          >
            <Text style={styles(colors).installButtonText}>{t('install')}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
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
  reportBox: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reportItem: {
    alignItems: 'center',
    width: (width - 80) / 3,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  iconBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    backgroundColor: colors.accent,
    borderRadius: 6,
  },
  reportNumber: {
    fontWeight: '800',
    fontSize: 28,
    color: colors.text,
  },
  reportLabel: {
    fontSize: 12,
    color: colors.muted,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  allRecordsLink: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  historyBox: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weekdayText: {
    fontWeight: '600',
    fontSize: 10,
    color: colors.secondary,
    textAlign: 'center',
    width: 24,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  dateContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontWeight: '600',
    fontSize: 12,
    color: colors.text,
  },
  inactiveDate: {
    color: colors.border,
  },
  activeDate: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDateText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  dayStreak: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 4,
  },
  dayStreakText: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.muted,
  },
  dayStreakNumber: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.muted,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  logButtonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 14,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statsLeft: {
    gap: 4,
  },
  statsRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statsLabel: {
    fontSize: 12,
    color: colors.muted,
  },
  statsValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  chartContainer: {
    marginBottom: 12,
  },
  chartLabels: {
    gap: 4,
    marginBottom: 12,
  },
  chartLabel: {
    fontSize: 10,
    color: colors.border,
  },
  chartDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartDate: {
    fontSize: 10,
    color: colors.secondary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: 24,
  },
  bmiContainer: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  bmiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  editButtonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 12,
  },
  bmiValue: {
    fontWeight: '800',
    fontSize: 20,
    color: colors.text,
    marginBottom: 12,
  },
  colorBar: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  colorSegment: {
    height: 12,
    flex: 1,
    borderRadius: 4,
  },
  blueDark: { backgroundColor: '#2563eb' },
  blueLight: { backgroundColor: '#60a5fa' },
  cyan: { backgroundColor: '#22d3ee' },
  yellow: { backgroundColor: '#fcd34d' },
  orange: { backgroundColor: '#fbbf24' },
  red: { backgroundColor: '#f87171' },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  scaleLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.muted,
  },
  heightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heightText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.muted,
  },
  heightEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heightEditText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.muted,
  },
  imageSection: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 150,
    marginBottom: 16,
  },
  backgroundImage: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  backgroundImageStyle: {
    borderRadius: 24,
  },
  circleImage: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.card,
  },
  weeksLabel: {
    position: 'absolute',
    bottom: 16,
    left: 96,
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  weeksText: {
    color: colors.accentText,
    fontWeight: '800',
    fontSize: 12,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderRadius: 24,
  },
  jawlineText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    color: colors.card,
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 20,
  },
  adSection: {
    backgroundColor: colors.card,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  adHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    padding: 12,
  },
  adLabel: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  adLabelText: {
    color: colors.card,
    fontWeight: '700',
    fontSize: 10,
  },
  adIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginRight: 8,
  },
  adTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  adDesc: {
    fontSize: 14,
    color: colors.muted,
    padding: 12,
    lineHeight: 20,
  },
  installButton: {
    borderRadius: 25,
    marginBottom: 16,
  },
  installButtonTouchable: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  installButtonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ReportScreen;