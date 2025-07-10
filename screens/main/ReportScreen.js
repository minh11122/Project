import React, { useState } from 'react';
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

const { width } = Dimensions.get('window');

const ReportScreen = () => {
  const [currentWeight, setCurrentWeight] = useState('--');
  const [heaviestWeight, setHeaviestWeight] = useState('--');
  const [lightestWeight, setLightestWeight] = useState('--');
  const [bmiValue, setBmiValue] = useState('--');

  const ReportItem = ({ icon, number, label }) => (
    <View style={styles.reportItem}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color={colors.text} />
        <View style={styles.iconBadge} />
      </View>
      <Text style={styles.reportNumber}>{number}</Text>
      <Text style={styles.reportLabel}>{label}</Text>
    </View>
  );

  const CalendarDay = ({ day, isActive, isInactive }) => (
    <View style={styles.dateContainer}>
      {isActive ? (
        <View style={styles.activeDate}>
          <Text style={styles.activeDateText}>{day}</Text>
        </View>
      ) : (
        <Text style={[styles.dateText, isInactive && styles.inactiveDate]}>
          {day}
        </Text>
      )}
    </View>
  );

  const BMIColorBar = () => (
    <View style={styles.colorBar}>
      <View style={[styles.colorSegment, styles.blueDark]} />
      <View style={[styles.colorSegment, styles.blueLight]} />
      <View style={[styles.colorSegment, styles.cyan]} />
      <View style={[styles.colorSegment, styles.yellow]} />
      <View style={[styles.colorSegment, styles.orange]} />
      <View style={[styles.colorSegment, styles.red]} />
    </View>
  );

  const WeightChart = () => (
    <View style={styles.chartContainer}>
      <View style={styles.chartLabels}>
        {['700', '600', '500', '400', '300', '200', '100'].map((label, index) => (
          <Text key={index} style={styles.chartLabel}>{label}</Text>
        ))}
      </View>
      <View style={styles.chartDates}>
        {['23', '24', '25', '26', '27', '28', '29'].map((date, index) => (
          <Text key={index} style={styles.chartDate}>{date}</Text>
        ))}
      </View>
    </View>
  );

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>REPORT</Text>
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
        {/* Summary Section */}
        <View style={styles.reportBox}>
          <ReportItem icon="medal" number="0" label="Workout" />
          <ReportItem icon="water" number="0" label="Kcal" />
          <ReportItem icon="time" number="0" label="Minute" />
        </View>

        {/* History Section */}
        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitle}>History</Text>
          <TouchableOpacity>
            <Text style={styles.allRecordsLink}>All records</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyBox}>
          {/* Weekdays */}
          <View style={styles.weekdays}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={index} style={styles.weekdayText}>{day}</Text>
            ))}
          </View>

          {/* Dates */}
          <View style={styles.dates}>
            <CalendarDay day="22" />
            <CalendarDay day="23" />
            <CalendarDay day="24" />
            <CalendarDay day="25" />
            <CalendarDay day="26" isActive />
            <CalendarDay day="27" isInactive />
            <CalendarDay day="28" isInactive />
          </View>

          {/* Day Streak */}
          <View style={styles.dayStreak}>
            <Text style={styles.dayStreakText}>Day Streak</Text>
            <Ionicons name="flame" size={18} color="#ef4444" />
            <Text style={styles.dayStreakNumber}>0</Text>
          </View>
        </View>

        {/* Weight Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weight</Text>
            <TouchableOpacity style={styles.logButton}>
              <Text style={styles.logButtonText}>Log</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.historyBox}>
            <View style={styles.stats}>
              <View style={styles.statsLeft}>
                <Text style={styles.statsLabel}>Current</Text>
                <Text style={styles.statsValue}>{currentWeight}</Text>
              </View>
              <View style={styles.statsRight}>
                <Text style={styles.statsLabel}>Heaviest</Text>
                <Text style={styles.statsValue}>{heaviestWeight}</Text>
                <Text style={styles.statsLabel}>Lightest</Text>
                <Text style={styles.statsValue}>{lightestWeight}</Text>
              </View>
            </View>
            <WeightChart />
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBg} />

        {/* BMI Section */}
        <View style={styles.bmiContainer}>
          <View style={styles.bmiHeader}>
            <Text style={styles.sectionTitle}>BMI</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bmiValue}>{bmiValue}</Text>
          <BMIColorBar />
          <View style={styles.scaleLabels}>
            {['15', '16', '18.5', '25', '30', '35', '40'].map((label, index) => (
              <Text key={index} style={styles.scaleLabel}>{label}</Text>
            ))}
          </View>
          <View style={styles.heightRow}>
            <Text style={styles.heightText}>Height</Text>
            <TouchableOpacity style={styles.heightEdit}>
              <Text style={styles.heightEditText}>Edit</Text>
              <Ionicons name="pencil" size={10} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Advertisement Section */}
        <View style={styles.imageSection}>
          <ImageBackground
            source={{
              uri: 'https://storage.googleapis.com/a1aa/image/ad6c185a-4ca3-43b4-fb77-bc2e4821e76d.jpg',
            }}
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImageStyle}
          >
            <Image
              source={{
                uri: 'https://storage.googleapis.com/a1aa/image/1aa2a23d-4b6a-4413-df09-a1b2093f51f9.jpg',
              }}
              style={styles.circleImage}
            />
            <View style={styles.weeksLabel}>
              <Text style={styles.weeksText}>4 WEEKS</Text>
            </View>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.imageGradient}
            />
            <Text style={styles.jawlineText}>GET A CHISELED JAWLINE</Text>
          </ImageBackground>
        </View>

        {/* Ad Details Section */}
        <View style={styles.adSection}>
          <View style={styles.adHeader}>
            <View style={styles.adLabel}>
              <Text style={styles.adLabelText}>AD</Text>
            </View>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/a1aa/image/0714f18b-0fd1-464a-d9d4-088d1f7d5739.jpg',
              }}
              style={styles.adIcon}
            />
            <Text style={styles.adTitle}>Jawline Exercises - Face Yoga</Text>
          </View>
          <Text style={styles.adDesc}>
            Face exercise & face yoga for jawline. Reduce double chin & lose face fat.
          </Text>
        </View>

        {/* Install Button */}
        <LinearGradient
          colors={['#f43f5e', '#ec4899']}
          style={styles.installButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity style={styles.installButtonTouchable}>
            <Text style={styles.installButtonText}>INSTALL</Text>
          </TouchableOpacity>
        </LinearGradient>
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