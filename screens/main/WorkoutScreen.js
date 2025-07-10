import React, { useState, useEffect } from 'react';
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

const { width } = Dimensions.get('window');

const DATA = {
  tabs: ['Bụng', 'Cánh tay', 'Ngực', 'Chân', 'Vai'],
  goals: ['Xây dựng cơ bắp', 'Đốt cháy mỡ', 'Giữ dáng', 'Tăng sức bền'],
  tags: [
    { icon: '💪', text: 'Xây dựng cơ bắp' },
    { icon: '📚', text: 'Nâng cao' },
    { icon: '⏰', text: '<7 phút' },
    { icon: '🔥', text: 'Đốt cháy mỡ' },
    { icon: '⏰', text: '>15 phút' },
    { icon: '⏰', text: '7-15 phút' },
  ],
  challengeData: [
    {
      id: '1',
      title: 'TOÀN THÂN\nTHỬ THÁCH 7X4',
      description: 'Bắt đầu hành trình tạo dáng cơ thể để tập trung vào tất cả các nhóm cơ và xây dựng cơ thể mơ ước của bạn trong 4 tuần!',
      gradient: ['#0057ff', '#0041b3'],
      image: 'https://storage.googleapis.com/a1aa/image/34a3bda0-fc6a-428f-f56c-8fb12283c8f7.jpg',
    },
    {
      id: '2',
      title: 'THÂN TRÊN\nTHỬ THÁCH 7X4',
      description: 'Chỉ tập trung vào đôi cánh tay và ngực để tăng sức mạnh và nâng cao vóc dáng.',
      gradient: ['#00aaff', '#0088cc'],
      image: 'https://storage.googleapis.com/a1aa/image/066d54f1-8aaa-443d-4ed7-4a088edb3248.jpg',
    },
  ],
  workoutData: [
    {
      id: '1',
      title: 'Bụng Người bắt đầu',
      duration: '20 phút · 16 Bài tập',
      difficulty: 1,
      image: 'https://storage.googleapis.com/a1aa/image/143f04bc-4a90-4c7e-e9e6-f80198c04fcf.jpg',
    },
    {
      id: '2',
      title: 'Bụng Trung bình',
      duration: '29 phút · 21 Bài tập',
      difficulty: 2,
      image: 'https://storage.googleapis.com/a1aa/image/2d0d895c-60c1-4031-b4bc-5f1977902f03.jpg',
    },
    {
      id: '3',
      title: 'Bụng Nâng cao',
      duration: '36 phút · 21 Bài tập',
      difficulty: 3,
      image: 'https://storage.googleapis.com/a1aa/image/b12d936d-e86d-41be-12a3-7cb241610130.jpg',
    },
  ],
  exerciseData: [
    {
      id: '1',
      title: 'Nâng cao & làm tròn mông',
      subtitle: '7 phút · Người bắt đầu',
      image: 'https://storage.googleapis.com/a1aa/image/b73e0ce0-9469-4359-f7be-45c5995620f6.jpg',
    },
    {
      id: '2',
      title: 'Tạo hình và làm săn chắc mông',
      subtitle: '10 phút · Người bắt đầu',
      image: 'https://storage.googleapis.com/a1aa/image/a5e0a963-0365-492a-0911-b88ff32dbebf.jpg',
    },
    {
      id: '3',
      title: 'Tập luyện ngực to hơn nhanh chóng',
      subtitle: '11 phút · Trung bình',
      image: 'https://storage.googleapis.com/a1aa/image/15fb23e5-fdae-41f9-1aff-9890c0cdc825.jpg',
    },
  ],
  stretchData: [
    {
      id: '1',
      title: '4 phút với Tabata',
      image: 'https://storage.googleapis.com/a1aa/image/2bf59382-4d1b-4971-6590-fc7de483a532.jpg',
    },
    {
      id: '2',
      title: 'Kéo giãn thời gian ngủ',
      image: 'https://storage.googleapis.com/a1aa/image/200a769a-f6a7-4dd3-e614-48d07edf3da9.jpg',
    },
  ],
  recommendData: [
    {
      id: '1',
      title: 'Tập cơ trung tâm cho người mới bắt đầu',
      subtitle: '9 phút · Người bắt đầu',
      image: 'https://storage.googleapis.com/a1aa/image/fa52c163-3ecf-4373-a2a4-96c0c95e8583.jpg',
    },
    {
      id: '2',
      title: 'Tập mông kết hình',
      subtitle: '8 phút · Trung bình',
      image: 'https://storage.googleapis.com/a1aa/image/09288296-aedf-4230-52ca-6aeb135f6ad3.jpg',
    },
  ],
};

const WorkoutScreen = () => {
  const [activeTab, setActiveTab] = useState('Bụng');
  const [searchText, setSearchText] = useState('');

  const renderDifficultyStars = (difficulty) => (
    <View style={styles.difficultyContainer}>
      {[1, 2, 3].map((star) => (
        <Text
          key={star}
          style={[styles.difficultyStar, { color: star <= difficulty ? '#2563eb' : '#d1d5db' }]}
        >
          ⚡
        </Text>
      ))}
    </View>
  );

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>TẬP LUYỆN TẠI NHÀ</Text>
      <View style={styles.headerIcons}>
        <Text style={styles.heartIcon}>❤️</Text>
        <TouchableOpacity style={styles.proButton}>
          <Text style={styles.proIcon}>👑</Text>
          <Text style={styles.proText}>PRO↑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const SearchBar = () => (
    <View style={styles.searchContainer}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm bài tập, kế hoạch..."
        placeholderTextColor="#999999"
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

    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentWeekday === 0 ? 6 : currentWeekday - 1));

    // Generate array of 7 days with date objects for better handling
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

    // Find index of current day
    const currentDayIndex = currentWeekday === 0 ? 6 : currentWeekday - 1;

    // Debugging logs
    console.log('Current Date:', today.toISOString());
    console.log('Start of Week:', startOfWeek.toISOString());
    console.log('Days of Week:', daysOfWeek.map(d => `${d.date}/${d.month + 1}/${d.year}`));
    console.log('Current Day Index:', currentDayIndex);

    // Format week range for display (e.g., "7/7 - 13/7")
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const weekRange = `${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1} - ${endOfWeek.getDate()}/${endOfWeek.getMonth() + 1}`;

    return (
      <View style={styles.weeklyGoal}>
        <View style={styles.weeklyGoalHeader}>
          <Text style={styles.weeklyGoalTitle}>Mục tiêu hàng tuần ({weekRange})</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreBlue}>0</Text>
            <Text style={styles.scoreGray}>/7</Text>
            <Text style={styles.editIcon}>✏️</Text>
          </View>
        </View>
        <View style={styles.daysRow}>
          {daysOfWeek.map((dayObj, index) => (
            <TouchableOpacity
              key={`${dayObj.date}-${dayObj.month}-${dayObj.year}-${index}`}
              style={[
                styles.dayButton,
                dayObj.isCurrentDay && styles.activeDayButton,
                index > currentDayIndex && styles.disabledDayButton,
              ]}
              disabled={index > currentDayIndex}
            >
              <Text
                style={[
                  styles.dayText,
                  dayObj.isCurrentDay && styles.activeDayText,
                  index > currentDayIndex && styles.disabledDayText,
                ]}
              >
                {dayObj.date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.weeklyMessage}>
          <Text style={styles.motivationText}>
            Thời gian tốt nhất để xây dựng bản thân mới luôn là NGAY BÂY GIỜ!
          </Text>
        </View>
      </View>
    );
  };

  const ChallengeCard = ({ item }) => (
    <View style={[styles.challengeCard, { backgroundColor: item.gradient[0] }]}>
      <Text style={styles.challengeTitle}>{item.title}</Text>
      <Text style={styles.challengeDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.challengeButton}>
        <Text style={[styles.challengeButtonText, { color: item.gradient[0] }]}>
          KHỞI ĐẦU
        </Text>
      </TouchableOpacity>
    </View>
  );

  const WorkoutItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <Image source={{ uri: item.image }} style={styles.workoutImage} />
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <Text style={styles.workoutDuration}>{item.duration}</Text>
        {renderDifficultyStars(item.difficulty)}
      </View>
    </View>
  );

  const ExerciseItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Image source={{ uri: item.image }} style={styles.exerciseImage} />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseTitle}>{item.title}</Text>
        <Text style={styles.exerciseSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.exerciseArrow}>→</Text>
    </View>
  );

  const StretchCard = ({ item }) => (
    <View style={styles.stretchCard}>
      <Image source={{ uri: item.image }} style={styles.stretchImage} />
      <View style={styles.stretchOverlay}>
        <Text style={styles.stretchText}>{item.title}</Text>
      </View>
    </View>
  );

  const RecommendItem = ({ item }) => (
    <View style={styles.recommendItem}>
      <Image source={{ uri: item.image }} style={styles.recommendImage} />
      <View style={styles.recommendInfo}>
        <Text style={styles.recommendTitle}>{item.title}</Text>
        <Text style={styles.recommendSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeaderContainer}>
        <Header />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar />
        <WeeklyGoal />
        <View style={styles.challengeSection}>
          <Text style={styles.sectionTitle}>THỬ THÁCH 7x4</Text>
          <FlatList
            data={DATA.challengeData}
            renderItem={ChallengeCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.challengeList}
          />
        </View>
        <View style={styles.bodyFocusSection}>
          <Text style={styles.sectionTitle}>Cơ thể tập trung</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
          >
            {DATA.tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <FlatList
            data={DATA.workoutData}
            renderItem={WorkoutItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
          <View style={styles.tagsContainer}>
            {DATA.tags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tag}>
                <Text style={styles.tagIcon}>{tag.icon}</Text>
                <Text style={styles.tagText}>{tag.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.recommendSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Chỉ dành cho bạn</Text>
            <TouchableOpacity>
              <Text style={styles.moreLink}>Thêm →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={DATA.recommendData}
            renderItem={RecommendItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
        <View style={styles.stretchSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Kéo giãn và khởi động</Text>
            <TouchableOpacity>
              <Text style={styles.moreLink}>Thêm →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={DATA.stretchData}
            renderItem={StretchCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stretchList}
          />
        </View>
        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>Mục tiêu phổ biến</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.goalsContainer}
          >
            {DATA.goals.map((goal, index) => (
              <TouchableOpacity
                key={goal}
                style={[
                  styles.goalButton,
                  index === 0 ? styles.activeGoalButton : styles.inactiveGoalButton,
                ]}
                disabled={index !== 0}
              >
                <Text
                  style={[
                    styles.goalButtonText,
                    index === 0 ? styles.activeGoalText : styles.inactiveGoalText,
                  ]}
                >
                  {goal}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.exerciseCard}>
            <FlatList
              data={DATA.exerciseData}
              renderItem={ExerciseItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
            <TouchableOpacity style={styles.addMore}>
              <Text style={styles.addMoreText}>Thêm →</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.discoverSection}>
          <View style={styles.discoverCard}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/a1aa/image/78ea1ca5-c292-4cba-619a-2ee6e1e3ff9d.jpg' }}
              style={styles.discoverImage}
            />
            <View style={styles.discoverOverlay}>
              <Text style={styles.discoverText}>Khám phá thêm bài tập</Text>
              <TouchableOpacity style={styles.discoverButton}>
                <Text style={styles.discoverButtonText}>Đi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  searchIcon: { fontSize: 20, marginRight: 12 },
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
  editIcon: { fontSize: 16, marginLeft: 8 },
  daysRow: { flexDirection: 'row', gap: 24, marginBottom: 12 },
  dayButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  activeDayButton: { backgroundColor: '#93c5fd', borderRadius: 16, borderWidth: 2, borderColor: '#93c5fd' },
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
  tagText: { fontSize: 14, fontWeight: '600', color: '#374151', flex: 1 },
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
  inactiveGoalButton: { backgroundColor: '#f3f4f6', borderColor: 'transparent' },
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