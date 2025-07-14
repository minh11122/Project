import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const DATA = {
  tabs: ['abs', 'arms', 'chest', 'legs', 'shoulders'],
  goals: ['build_muscle', 'burn_fat', 'stay_fit', 'increase_endurance'],
  tags: [
    { icon: '💪', text: 'build_muscle' },
    { icon: '📚', text: 'advanced' },
    { icon: '⏰', text: 'under_7_minutes' },
    { icon: '🔥', text: 'burn_fat' },
    { icon: '⏰', text: '7_to_15_minutes' },
    { icon: '⏰', text: 'over_15_minutes' },
  ],
  challengeData: [
    {
      id: '1',
      title: 'full_body_challenge_7x4',
      description: 'full_body_challenge_description',
      gradient: ['#0057ff', '#0041b3'],
      image: 'https://storage.googleapis.com/a1aa/image/34a3bda0-fc6a-428f-f56c-8fb12283c8f7.jpg',
    },
    {
      id: '2',
      title: 'upper_body_challenge_7x4',
      description: 'upper_body_challenge_description',
      gradient: ['#00aaff', '#0088cc'],
      image: 'https://storage.googleapis.com/a1aa/image/066d54f1-8aaa-443d-4ed7-4a088edb3248.jpg',
    },
  ],
  workoutData: [
    {
      id: '1',
      title: 'beginner_abs',
      duration: 'beginner_abs_duration',
      difficulty: 1,
      category: 'abs',
      image: 'https://storage.googleapis.com/a1aa/image/143f04bc-4a90-4c7e-e9e6-f80198c04fcf.jpg',
    },
    {
      id: '2',
      title: 'intermediate_abs',
      duration: 'intermediate_abs_duration',
      difficulty: 2,
      category: 'abs',
      image: 'https://storage.googleapis.com/a1aa/image/2d0d895c-60c1-4031-b4bc-5f1977902f03.jpg',
    },
    {
      id: '3',
      title: 'advanced_abs',
      duration: 'advanced_abs_duration',
      difficulty: 3,
      category: 'abs',
      image: 'https://storage.googleapis.com/a1aa/image/b12d936d-e86d-41be-12a3-7cb241610130.jpg',
    },
    {
      id: '4',
      title: 'arm_workout',
      duration: 'arm_workout_duration',
      difficulty: 2,
      category: 'arms',
      image: 'https://storage.googleapis.com/a1aa/image/arm-workout.jpg',
    },
    {
      id: '5',
      title: 'chest_workout',
      duration: 'chest_workout_duration',
      difficulty: 2,
      category: 'chest',
      image: 'https://storage.googleapis.com/a1aa/image/chest-workout.jpg',
    },
    {
      id: '6',
      title: 'leg_workout',
      duration: 'leg_workout_duration',
      difficulty: 2,
      category: 'legs',
      image: 'https://storage.googleapis.com/a1aa/image/leg-workout.jpg',
    },
    {
      id: '7',
      title: 'shoulder_workout',
      duration: 'shoulder_workout_duration',
      difficulty: 3,
      category: 'shoulders',
      image: 'https://storage.googleapis.com/a1aa/image/shoulder-workout.jpg',
    },
  ],
  exerciseData: [
    {
      id: '1',
      title: 'advanced_butt_rounding',
      subtitle: 'advanced_butt_rounding_subtitle',
      goal: 'build_muscle',
      image: 'https://storage.googleapis.com/a1aa/image/b73e0ce0-9469-4359-f7be-45c5995620f6.jpg',
    },
    {
      id: '2',
      title: 'butt_shaping_toning',
      subtitle: 'butt_shaping_toning_subtitle',
      goal: 'build_muscle',
      image: 'https://storage.googleapis.com/a1aa/image/a5e0a963-0365-492a-0911-b88ff32dbebf.jpg',
    },
    {
      id: '3',
      title: 'quick_bigger_chest',
      subtitle: 'quick_bigger_chest_subtitle',
      goal: 'build_muscle',
      image: 'https://storage.googleapis.com/a1aa/image/15fb23e5-fdae-41f9-1aff-9890c0cdc825.jpg',
    },
    {
      id: '4',
      title: 'fat_burn_hiit',
      subtitle: 'fat_burn_hiit_subtitle',
      goal: 'burn_fat',
      image: 'https://storage.googleapis.com/a1aa/image/fat-burn-hiit.jpg',
    },
    {
      id: '5',
      title: 'endurance_run',
      subtitle: 'endurance_run_subtitle',
      goal: 'increase_endurance',
      image: 'https://storage.googleapis.com/a1aa/image/endurance-run.jpg',
    },
  ],
  stretchData: [
    {
      id: '1',
      title: '4_min_tabata',
      image: 'https://storage.googleapis.com/a1aa/image/2bf59382-4d1b-4971-6590-fc7de483a532.jpg',
    },
    {
      id: '2',
      title: 'sleep_time_stretch',
      image: 'https://storage.googleapis.com/a1aa/image/200a769a-f6a7-4dd3-e614-48d07edf3da9.jpg',
    },
  ],
  recommendData: [
    {
      id: '1',
      title: 'beginner_core_workout',
      subtitle: 'beginner_core_workout_subtitle',
      image: 'https://storage.googleapis.com/a1aa/image/fa52c163-3ecf-4373-a2a4-96c0c95e8583.jpg',
    },
    {
      id: '2',
      title: 'butt_shaping_workout',
      subtitle: 'butt_shaping_workout_subtitle',
      image: 'https://storage.googleapis.com/a1aa/image/09288296-aedf-4230-52ca-6aeb135f6ad3.jpg',
    },
  ],
};

const WorkoutScreen = ({ navigation }) => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('abs');
  const [activeGoal, setActiveGoal] = useState('build_muscle');
  const [searchText, setSearchText] = useState('');
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const onLanguageChange = () => {
      console.log('Ngôn ngữ đã thay đổi trong WorkoutScreen:', i18n.language);
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  const renderDifficultyStars = (difficulty) => (
    <View style={styles(colors).difficultyContainer}>
      {[1, 2, 3].map((star) => (
        <Text
          key={star}
          style={[styles(colors).difficultyStar, { color: star <= difficulty ? colors.primary : colors.muted }]}
        >
          ⚡
        </Text>
      ))}
    </View>
  );

  const Header = () => (
    <View style={styles(colors).header}>
      <Text style={styles(colors).headerTitle}>{t('home_workout')}</Text>
      <View style={styles(colors).headerIcons}>
        <Text style={styles(colors).heartIcon}>❤️</Text>
        <TouchableOpacity style={styles(colors).proButton}>
          <Text style={styles(colors).proIcon}>👑</Text>
          <Text style={styles(colors).proText}>{t('pro')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const SearchBar = () => (
    <View style={styles(colors).searchContainer}>
      <Text style={styles(colors).searchIcon}>🔍</Text>
      <TextInput
        style={styles(colors).searchInput}
        placeholder={t('search_placeholder')}
        placeholderTextColor={colors.muted}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );

  const WeeklyGoal = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentWeekday = today.getDay();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentWeekday === 0 ? 6 : currentWeekday - 1));

    const daysOfWeek = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + index);
      return {
        date: day.getDate().toString(),
        month: day.getMonth(),
        year: day.getFullYear(),
        isCurrentDay: day.getDate() === currentDay && day.getMonth() === currentMonth && day.getFullYear() === currentYear,
      };
    });

    const currentDayIndex = currentWeekday === 0 ? 6 : currentWeekday - 1;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const weekRange = `${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1} - ${endOfWeek.getDate()}/${endOfWeek.getMonth() + 1}`;

    return (
      <View style={styles(colors).weeklyGoal}>
        <View style={styles(colors).weeklyGoalHeader}>
          <Text style={styles(colors).weeklyGoalTitle}>{t('weekly_goal', { range: weekRange })}</Text>
          <View style={styles(colors).scoreContainer}>
            <Text style={styles(colors).scoreBlue}>0</Text>
            <Text style={styles(colors).scoreGray}>/7</Text>
            <Text style={styles(colors).editIcon}>✏️</Text>
          </View>
        </View>
        <View style={styles(colors).daysRow}>
          {daysOfWeek.map((dayObj, index) => (
            <TouchableOpacity
              key={`${dayObj.date}-${dayObj.month}-${dayObj.year}-${index}`}
              style={[
                styles(colors).dayButton,
                dayObj.isCurrentDay && styles(colors).activeDayButton,
                index > currentDayIndex && styles(colors).disabledDayButton,
              ]}
              disabled={index > currentDayIndex}
            >
              <Text
                style={[
                  styles(colors).dayText,
                  dayObj.isCurrentDay && styles(colors).activeDayText,
                  index > currentDayIndex && styles(colors).disabledDayText,
                ]}
              >
                {dayObj.date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles(colors).weeklyMessage}>
          <Text style={styles(colors).motivationText}>{t('motivation_text')}</Text>
        </View>
      </View>
    );
  };

  const ChallengeCard = ({ item }) => (
    <View style={[styles(colors).challengeCard, { backgroundColor: item.gradient[0] }]}>
      <Text style={styles(colors).challengeTitle}>{t(item.title)}</Text>
      <Text style={styles(colors).challengeDescription}>{t(item.description)}</Text>
      <TouchableOpacity
        style={styles(colors).challengeButton}
        onPress={() => {
          console.log('Chuyển hướng đến:', item.title.includes('full_body_challenge') ? 'Exe1' : 'Exe2');
          if (item.title.includes('full_body_challenge')) {
            navigation.navigate('Exe1');
          } else if (item.title.includes('upper_body_challenge')) {
            navigation.navigate('Exe2');
          }
        }}
      >
        <Text style={[styles(colors).challengeButtonText, { color: item.gradient[0] }]}>
          {t('start')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const WorkoutItem = ({ item }) => (
    <TouchableOpacity
      style={styles(colors).workoutItem}
      onPress={() => {
        // Map category to Vietnamese
        const categoryMap = {
          'abs': 'Bụng',
          'arms': 'Tay',
          'chest': 'Ngực',
          'legs': 'Chân',
          'shoulders': 'Vai'
        };
        
        // Map difficulty to level
        const levelMap = {
          1: 'beginner',
          2: 'intermediate',
          3: 'advanced'
        };
        
        const category = categoryMap[item.category] || item.category;
        const level = levelMap[item.difficulty] || 'beginner';
        
        navigation.navigate('ExerciseList', { category, level });
      }}
    >
      <Image source={{ uri: item.image }} style={styles(colors).workoutImage} />
      <View style={styles(colors).workoutInfo}>
        <Text style={styles(colors).workoutTitle}>{t(item.title)}</Text>
        <Text style={styles(colors).workoutDuration}>{t(item.duration)}</Text>
        {renderDifficultyStars(item.difficulty)}
      </View>
    </TouchableOpacity>
  );

  const ExerciseItem = ({ item }) => (
    <View style={styles(colors).exerciseItem}>
      <Image source={{ uri: item.image }} style={styles(colors).exerciseImage} />
      <View style={styles(colors).exerciseInfo}>
        <Text style={styles(colors).exerciseTitle}>{t(item.title)}</Text>
        <Text style={styles(colors).exerciseSubtitle}>{t(item.subtitle)}</Text>
      </View>
      <Text style={styles(colors).exerciseArrow}>→</Text>
    </View>
  );

  const StretchCard = ({ item }) => (
    <View style={styles(colors).stretchCard}>
      <Image source={{ uri: item.image }} style={styles(colors).stretchImage} />
      <View style={styles(colors).stretchOverlay}>
        <Text style={styles(colors).stretchText}>{t(item.title)}</Text>
      </View>
    </View>
  );

  const RecommendItem = ({ item }) => (
    <View style={styles(colors).recommendItem}>
      <Image source={{ uri: item.image }} style={styles(colors).recommendImage} />
      <View style={styles(colors).recommendInfo}>
        <Text style={styles(colors).recommendTitle}>{t(item.title)}</Text>
        <Text style={styles(colors).recommendSubtitle}>{t(item.subtitle)}</Text>
      </View>
    </View>
  );

  // Lọc bài tập theo tab được chọn
  const filteredWorkoutData = DATA.workoutData.filter((item) => item.category === activeTab);

  // Lọc bài tập theo mục tiêu được chọn
  const filteredExerciseData = DATA.exerciseData.filter((item) => item.goal === activeGoal);

  return (
    <SafeAreaView style={styles(colors).container}>
      <View style={styles(colors).fixedHeaderContainer}>
        <Header />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles(colors).scrollContent}
      >
        <SearchBar />
        <WeeklyGoal />
        <View style={styles(colors).challengeSection}>
          <Text style={styles(colors).sectionTitle}>{t('7x4_challenge')}</Text>
          <FlatList
            data={DATA.challengeData}
            renderItem={ChallengeCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles(colors).challengeList}
          />
        </View>
        <View style={styles(colors).bodyFocusSection}>
          <Text style={styles(colors).sectionTitle}>{t('body_focus')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles(colors).tabsContainer}
          >
            {DATA.tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles(colors).tab, activeTab === tab && styles(colors).activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles(colors).tabText, activeTab === tab && styles(colors).activeTabText]}>
                  {t(tab)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <FlatList
            data={filteredWorkoutData}
            renderItem={WorkoutItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
          <View style={styles(colors).tagsContainer}>
            {DATA.tags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles(colors).tag}>
                <Text style={styles(colors).tagIcon}>{tag.icon}</Text>
                <Text style={styles(colors).tagText}>{t(tag.text)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles(colors).recommendSection}>
          <View style={styles(colors).sectionHeader}>
            <Text style={styles(colors).sectionTitle}>{t('just_for_you')}</Text>
            <TouchableOpacity>
              <Text style={styles(colors).moreLink}>{t('more')}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={DATA.recommendData}
            renderItem={RecommendItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
        <View style={styles(colors).stretchSection}>
          <View style={styles(colors).sectionHeader}>
            <Text style={styles(colors).sectionTitle}>{t('stretch_warmup')}</Text>
            <TouchableOpacity>
              <Text style={styles(colors).moreLink}>{t('more')}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={DATA.stretchData}
            renderItem={StretchCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles(colors).stretchList}
          />
        </View>
        <View style={styles(colors).goalsSection}>
          <Text style={styles(colors).sectionTitle}>{t('popular_goals')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles(colors).goalsContainer}
          >
            {DATA.goals.map((goal) => (
              <TouchableOpacity
                key={goal}
                style={[styles(colors).goalButton, activeGoal === goal ? styles(colors).activeGoalButton : styles(colors).inactiveGoalButton]}
                onPress={() => setActiveGoal(goal)}
              >
                <Text
                  style={[
                    styles(colors).goalButtonText,
                    activeGoal === goal ? styles(colors).activeGoalText : styles(colors).inactiveGoalText,
                  ]}
                >
                  {t(goal)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles(colors).exerciseCard}>
            <FlatList
              data={filteredExerciseData}
              renderItem={ExerciseItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
            <TouchableOpacity style={styles(colors).addMore}>
              <Text style={styles(colors).addMoreText}>{t('more')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles(colors).discoverSection}>
          <View style={styles(colors).discoverCard}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/a1aa/image/78ea1ca5-c292-4cba-619a-2ee6e1e3ff9d.jpg' }}
              style={styles(colors).discoverImage}
            />
            <View style={styles(colors).discoverOverlay}>
              <Text style={styles(colors).discoverText}>{t('discover_more_exercises')}</Text>
              <TouchableOpacity style={styles(colors).discoverButton}>
                <Text style={styles(colors).discoverButtonText}>{t('go')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
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
  headerTitle: { fontSize: 24, fontWeight: '800', color: colors.text },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  heartIcon: { fontSize: 24 },
  proButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  proIcon: { fontSize: 14 },
  proText: { color: colors.accentText, fontWeight: '600', fontSize: 12 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.border,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: { fontSize: 20, color: colors.muted },
  searchInput: { flex: 1, fontSize: 16, color: colors.text },
  scrollContent: {
    paddingTop: 60,
  },
  weeklyGoal: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 24,
    padding: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  weeklyGoalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weeklyGoalTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  scoreContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  scoreBlue: { color: colors.primary, fontWeight: '700', fontSize: 18 },
  scoreGray: { color: colors.muted, fontSize: 18 },
  editIcon: { fontSize: 16, color: colors.muted, marginLeft: 8 },
  daysRow: { flexDirection: 'row', gap: 24, marginBottom: 12 },
  dayButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  activeDayButton: { backgroundColor: colors.primary + '33', borderRadius: 16, borderWidth: 2, borderColor: colors.primary },
  disabledDayButton: { opacity: 0.5 },
  dayText: { fontSize: 18, fontWeight: '600', color: colors.text },
  activeDayText: { color: colors.primary, fontWeight: '700' },
  disabledDayText: { color: colors.secondary },
  weeklyMessage: { marginTop: 12 },
  motivationText: { fontSize: 14, color: colors.muted, textAlign: 'center' },
  challengeSection: { marginBottom: 24, paddingLeft: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 12 },
  challengeList: { paddingRight: 20 },
  challengeCard: { width: 320, borderRadius: 24, padding: 20, marginRight: 16, minHeight: 160 },
  challengeTitle: { color: colors.card, fontSize: 24, fontWeight: '800', lineHeight: 28, marginBottom: 12 },
  challengeDescription: { color: colors.card, fontSize: 14, lineHeight: 20, marginBottom: 20 },
  challengeButton: {
    backgroundColor: colors.card,
    borderRadius: 25,
    paddingVertical: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  challengeButtonText: { fontWeight: '800', fontSize: 16 },
  bodyFocusSection: { paddingHorizontal: 20, marginBottom: 24 },
  tabsContainer: { marginBottom: 16 },
  tab: {
    backgroundColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: { backgroundColor: 'transparent', borderColor: colors.primary },
  tabText: { fontSize: 14, fontWeight: '700', color: colors.muted },
  activeTabText: { color: colors.primary },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  workoutImage: { width: 80, height: 80, borderRadius: 16, marginRight: 16 },
  workoutInfo: { flex: 1 },
  workoutTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 4 },
  workoutDuration: { fontSize: 14, color: colors.secondary, marginBottom: 4 },
  difficultyContainer: { flexDirection: 'row' },
  difficultyStar: { fontSize: 18, marginRight: 4 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 24 },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
    width: (width - 64) / 3,
  },
  tagIcon: { fontSize: 18 },
  tagText: { fontSize: 14, fontWeight: '600', color: colors.text, flex: 1 },
  recommendSection: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  moreLink: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  recommendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  recommendImage: { width: 80, height: 80, borderRadius: 16, marginRight: 16 },
  recommendInfo: { flex: 1 },
  recommendTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 4 },
  recommendSubtitle: { fontSize: 14, color: colors.secondary },
  stretchSection: { paddingLeft: 20, marginBottom: 24 },
  stretchList: { paddingRight: 20 },
  stretchCard: { width: 160, height: 100, borderRadius: 16, marginRight: 16, overflow: 'hidden', position: 'relative' },
  stretchImage: { width: '100%', height: '100%' },
  stretchOverlay: { position: 'absolute', bottom: 8, left: 8, right: 8 },
  stretchText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  goalsSection: { paddingHorizontal: 20, marginBottom: 24 },
  goalsContainer: { marginBottom: 12 },
  goalButton: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginRight: 12, borderWidth: 1.5 },
  activeGoalButton: { backgroundColor: 'transparent', borderColor: colors.primary },
  inactiveGoalButton: { backgroundColor: colors.border, borderColor: 'transparent' },
  goalButtonText: { fontSize: 14, fontWeight: '600' },
  activeGoalText: { color: colors.primary },
  inactiveGoalText: { color: colors.secondary },
  exerciseCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  exerciseItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  exerciseImage: { width: 64, height: 64, borderRadius: 16, marginRight: 16 },
  exerciseInfo: { flex: 1 },
  exerciseTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 4 },
  exerciseSubtitle: { fontSize: 14, color: colors.secondary },
  exerciseArrow: { fontSize: 16, color: colors.text },
  addMore: { alignItems: 'flex-end', marginTop: 8 },
  addMoreText: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  discoverSection: { paddingHorizontal: 20, marginBottom: 40 },
  discoverCard: { borderRadius: 24, overflow: 'hidden', position: 'relative', height: 100 },
  discoverImage: { width: '100%', height: '100%' },
  discoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  discoverText: { color: colors.card, fontSize: 20, fontWeight: '800', flex: 1 },
  discoverButton: { backgroundColor: colors.card, paddingHorizontal: 24, paddingVertical: 8, borderRadius: 20 },
  discoverButtonText: { color: colors.text, fontSize: 16, fontWeight: '600' },
});

export default WorkoutScreen;