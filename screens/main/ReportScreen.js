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
        <Ionicons name={icon} size={22} color="black" />
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.header}>REPORT</Text>

          {/* Summary Section */}
          <View style={styles.reportBox}>
            <ReportItem icon="medal" number="0" label="Workout" />
            <ReportItem icon="water" number="0" label="Kcal" />
            <ReportItem icon="time" number="0" label="Minute" />
          </View>

          {/* History Section */}
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>History</Text>
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
              <Text style={styles.bmiTitle}>BMI</Text>
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
                <Ionicons name="pencil" size={10} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Image Advertisement Section */}
          <View style={styles.imageSection}>
            <ImageBackground
              source={{
                uri: 'https://storage.googleapis.com/a1aa/image/ad6c185a-4ca3-43b4-fb77-bc2e4821e76d.jpg'
              }}
              style={styles.backgroundImage}
              imageStyle={styles.backgroundImageStyle}
            >
              <Image
                source={{
                  uri: 'https://storage.googleapis.com/a1aa/image/1aa2a23d-4b6a-4413-df09-a1b2093f51f9.jpg'
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
                  uri: 'https://storage.googleapis.com/a1aa/image/0714f18b-0fd1-464a-d9d4-088d1f7d5739.jpg'
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    margin: 24,
    maxWidth: 400,
    alignSelf: 'center',
    width: width - 48,
  },
  header: {
    fontWeight: '800',
    fontSize: 18,
    color: 'black',
    marginBottom: 16,
  },
  
  // Report Box
  reportBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  reportItem: {
    alignItems: 'center',
    width: 80,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  iconBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    backgroundColor: '#a5b4fc',
    borderRadius: 6,
  },
  reportNumber: {
    fontWeight: '800',
    fontSize: 28,
    color: 'black',
  },
  reportLabel: {
    fontSize: 12,
    color: '#6b7280',
  },

  // History Section
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
  },
  allRecordsLink: {
    fontWeight: '600',
    fontSize: 14,
    color: '#2563eb',
  },
  historyBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weekdayText: {
    fontWeight: '600',
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'center',
    width: 20,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
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
    color: '#4b5563',
  },
  inactiveDate: {
    color: '#d1d5db',
  },
  activeDate: {
    borderWidth: 1.5,
    borderColor: '#3b82f6',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
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
    color: '#4b5563',
  },
  dayStreakNumber: {
    fontWeight: '600',
    fontSize: 14,
    color: '#4b5563',
  },

  // Weight Section
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1f2937',
  },
  logButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  logButtonText: {
    color: 'white',
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
    color: '#4b5563',
  },
  statsValue: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },
  chartContainer: {
    marginBottom: 12,
  },
  chartLabels: {
    gap: 4,
    marginBottom: 12,
  },
  chartLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#d1d5db',
  },
  chartDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartDate: {
    fontSize: 10,
    color: '#9ca3af',
  },

  // Progress Bar
  progressBarBg: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    marginBottom: 24,
  },

  // BMI Section
  bmiContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  bmiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bmiTitle: {
    fontWeight: '800',
    fontSize: 14,
    color: 'black',
  },
  editButton: {
    backgroundColor: '#2563eb',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  bmiValue: {
    fontWeight: '800',
    fontSize: 20,
    color: 'black',
    marginBottom: 12,
  },
  colorBar: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  colorSegment: {
    height: 12,
    width: 24,
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
    color: '#6b7280',
  },
  heightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heightText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  heightEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heightEditText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },

  // Image Section
  imageSection: {
    borderRadius: 12,
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
    borderRadius: 12,
  },
  circleImage: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
  },
  weeksLabel: {
    position: 'absolute',
    bottom: 16,
    left: 96,
    backgroundColor: '#a3e635',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  weeksText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 12,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderRadius: 12,
  },
  jawlineText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    color: 'white',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 20,
  },

  // Ad Section
  adSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  adHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
  },
  adLabel: {
    backgroundColor: '#2563eb',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 8,
  },
  adLabelText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 10,
  },
  adIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 8,
  },
  adTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
    flex: 1,
  },
  adDesc: {
    fontSize: 12,
    color: '#4b5563',
    padding: 12,
    lineHeight: 16,
  },

  // Install Button
  installButton: {
    borderRadius: 25,
    marginTop: 16,
  },
  installButtonTouchable: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  installButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ReportScreen;