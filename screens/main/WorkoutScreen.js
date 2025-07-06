import React, { useState } from 'react';
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

const WorkoutScreen = () => {
  const [activeTab, setActiveTab] = useState('Bụng');
  const [searchText, setSearchText] = useState('');

  // Sample data
  const challengeData = [
    {
      id: '1',
      title: 'TOÀN THÂN\nTHỬ THÁCH 7X4',
      description: 'Bắt đầu hành trình tạo dáng cơ thể để tập trung vào tất cả các nhóm cơ và xây dựng cơ thể mơ ước của bạn trong 4 tuần!',
      gradient: ['#0057ff', '#0041b3'],
      image: 'https://storage.googleapis.com/a1aa/image/34a3bda0-fc6a-428f-f56c-8fb12283c8f7.jpg'
    },
    {
      id: '2',
      title: 'THÂN TRÊN\nTHỬ THÁCH 7X4',
      description: 'Chỉ tập trung vào đôi cánh tay và ngực để tăng sức mạnh và nâng cao vóc dáng.',
      gradient: ['#00aaff', '#0088cc'],
      image: 'https://storage.googleapis.com/a1aa/image/066d54f1-8aaa-443d-4ed7-4a088edb3248.jpg'
    }
  ];

  const workoutData = [
    {
      id: '1',
      title: 'Bụng Người bắt đầu',
      duration: '20 phút · 16 Bài tập',
      difficulty: 1,
      image: 'https://storage.googleapis.com/a1aa/image/143f04bc-4a90-4c7e-e9e6-f80198c04fcf.jpg'
    },
    {
      id: '2',
      title: 'Bụng Trung bình',
      duration: '29 phút · 21 Bài tập',
      difficulty: 2,
      image: 'https://storage.googleapis.com/a1aa/image/2d0d895c-60c1-4031-b4bc-5f1977902f03.jpg'
    },
    {
      id: '3',
      title: 'Bụng Nâng cao',
      duration: '36 phút · 21 Bài tập',
      difficulty: 3,
      image: 'https://storage.googleapis.com/a1aa/image/b12d936d-e86d-41be-12a3-7cb241610130.jpg'
    }
  ];

  const exerciseData = [
    {
      id: '1',
      title: 'Nâng cao & làm tròn mông',
      subtitle: '7 phút · Người bắt đầu',
      image: 'https://storage.googleapis.com/a1aa/image/b73e0ce0-9469-4359-f7be-45c5995620f6.jpg'
    },
    {
      id: '2',
      title: 'Tạo hình và làm săn chắc mông',
      subtitle: '10 phút · Người bắt đầu',
      image: 'https://storage.googleapis.com/a1aa/image/a5e0a963-0365-492a-0911-b88ff32dbebf.jpg'
    },
    {
      id: '3',
      title: 'Tập luyện ngực to hơn nhanh chóng',
      subtitle: '11 phút · Trung bình',
      image: 'https://storage.googleapis.com/a1aa/image/15fb23e5-fdae-41f9-1aff-9890c0cdc825.jpg'
    }
  ];

  const stretchData = [
    {
      id: '1',
      title: '4 phút với Tabata',
      image: 'https://storage.googleapis.com/a1aa/image/2bf59382-4d1b-4971-6590-fc7de483a532.jpg'
    },
    {
      id: '2',
      title: 'Kéo giãn thời gian ngủ',
      image: 'https://storage.googleapis.com/a1aa/image/200a769a-f6a7-4dd3-e614-48d07edf3da9.jpg'
    }
  ];

  const recommendData = [
    {
      id: '1',
      title: 'Tập cơ trung tâm cho người mới bắt đầu',
      subtitle: '9 phút · Người bắt đầu',
      image: 'https://storage.googleapis.com/a1aa/image/fa52c163-3ecf-4373-a2a4-96c0c95e8583.jpg'
    },
    {
      id: '2',
      title: 'Tập mông kết hình',
      subtitle: '8 phút · Trung bình',
      image: 'https://storage.googleapis.com/a1aa/image/09288296-aedf-4230-52ca-6aeb135f6ad3.jpg'
    }
  ];

  const tabs = ['Bụng', 'CÁNH TAY', 'Ngực', 'Chân', 'Vai'];
  const goals = ['Xây dựng cơ bắp', 'Đốt cháy mỡ', 'Giữ dáng', 'Tăng sức bền'];
  const tags = [
    { icon: '💪', text: 'Xây dựng cơ bắp' },
    { icon: '📚', text: 'Nâng cao' },
    { icon: '⏰', text: '<7 phút' },
    { icon: '🔥', text: 'Đốt cháy mỡ' },
    { icon: '⏰', text: '>15 phút' },
    { icon: '⏰', text: '7-15 phút' }
  ];

  const renderDifficultyStars = (difficulty) => {
    return (
      <View style={styles.difficultyContainer}>
        {[1, 2, 3].map((star) => (
          <Text
            key={star}
            style={[
              styles.difficultyStar,
              { color: star <= difficulty ? '#2563eb' : '#d1d5db' }
            ]}
          >
            ⚡
          </Text>
        ))}
      </View>
    );
  };

  const renderChallengeCard = ({ item }) => (
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

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <Image source={{ uri: item.image }} style={styles.workoutImage} />
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <Text style={styles.workoutDuration}>{item.duration}</Text>
        {renderDifficultyStars(item.difficulty)}
      </View>
    </View>
  );

  const renderExerciseItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Image source={{ uri: item.image }} style={styles.exerciseImage} />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseTitle}>{item.title}</Text>
        <Text style={styles.exerciseSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.exerciseArrow}>→</Text>
    </View>
  );

  const renderStretchCard = ({ item }) => (
    <View style={styles.stretchCard}>
      <Image source={{ uri: item.image }} style={styles.stretchImage} />
      <View style={styles.stretchOverlay}>
        <Text style={styles.stretchText}>{item.title}</Text>
      </View>
    </View>
  );

  const renderRecommendItem = ({ item }) => (
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
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

        {/* Search */}
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

        {/* Weekly Goal */}
        <View style={styles.weeklyGoal}>
          <View style={styles.weeklyGoalHeader}>
            <Text style={styles.weeklyGoalTitle}>Mục tiêu hàng tuần</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreBlue}>0</Text>
              <Text style={styles.scoreGray}>/7</Text>
              <Text style={styles.editIcon}>✏️</Text>
            </View>
          </View>
          
          <View style={styles.daysRow}>
            {['22', '23', '24', '25', '26', '27', '28'].map((day, index) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  index === 2 && styles.activeDayButton,
                  index > 3 && styles.disabledDayButton
                ]}
                disabled={index > 3}
              >
                <Text
                  style={[
                    styles.dayText,
                    index === 2 && styles.activeDayText,
                    index > 3 && styles.disabledDayText
                  ]}
                >
                  {day}
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

        {/* Challenge Section */}
        <View style={styles.challengeSection}>
          <Text style={styles.sectionTitle}>THỬ THÁCH 7x4</Text>
          <FlatList
            data={challengeData}
            renderItem={renderChallengeCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.challengeList}
          />
        </View>

        {/* Body Focus Section */}
        <View style={styles.bodyFocusSection}>
          <Text style={styles.sectionTitle}>Cơ thể tập trung</Text>
          
          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Workout List */}
          <FlatList
            data={workoutData}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tag}>
                <Text style={styles.tagIcon}>{tag.icon}</Text>
                <Text style={styles.tagText}>{tag.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Chỉ dành cho bạn</Text>
            <TouchableOpacity>
              <Text style={styles.moreLink}>Thêm →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recommendData}
            renderItem={renderRecommendItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Stretch Section */}
        <View style={styles.stretchSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Kéo giãn và khởi động</Text>
            <TouchableOpacity>
              <Text style={styles.moreLink}>Thêm →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={stretchData}
            renderItem={renderStretchCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stretchList}
          />
        </View>

        {/* Popular Goals */}
        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>Mục tiêu phổ biến</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.goalsContainer}
          >
            {goals.map((goal, index) => (
              <TouchableOpacity
                key={goal}
                style={[
                  styles.goalButton,
                  index === 0 ? styles.activeGoalButton : styles.inactiveGoalButton
                ]}
                disabled={index !== 0}
              >
                <Text
                  style={[
                    styles.goalButtonText,
                    index === 0 ? styles.activeGoalText : styles.inactiveGoalText
                  ]}
                >
                  {goal}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Exercise List Card */}
          <View style={styles.exerciseCard}>
            <FlatList
              data={exerciseData}
              renderItem={renderExerciseItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
            <TouchableOpacity style={styles.addMore}>
              <Text style={styles.addMoreText}>Thêm →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Discover Section */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heartIcon: {
    fontSize: 24,
  },
  proButton: {
    backgroundColor: '#f9d8a6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  proIcon: {
    fontSize: 14,
  },
  proText: {
    color: '#6b4b00',
    fontWeight: '600',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  weeklyGoal: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
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
  weeklyGoalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreBlue: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 18,
  },
  scoreGray: {
    color: '#6b7280',
    fontSize: 18,
  },
  editIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
  },
  dayButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDayButton: {
    backgroundColor: '#93c5fd',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#93c5fd',
  },
  disabledDayButton: {
    opacity: 0.5,
  },
  dayText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  activeDayText: {
    color: '#2563eb',
    fontWeight: '700',
  },
  disabledDayText: {
    color: '#9ca3af',
  },
  weeklyMessage: {
    marginTop: 12,
  },
  motivationText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  challengeSection: {
    marginBottom: 24,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    marginBottom: 12,
  },
  challengeList: {
    paddingRight: 20,
  },
  challengeCard: {
    width: 320,
    borderRadius: 24,
    padding: 20,
    marginRight: 16,
    minHeight: 160,
  },
  challengeTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 12,
  },
  challengeDescription: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  challengeButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  challengeButtonText: {
    fontWeight: '800',
    fontSize: 16,
  },
  bodyFocusSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tab: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    backgroundColor: 'transparent',
    borderColor: '#2563eb',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#2563eb',
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  workoutImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 4,
  },
  difficultyContainer: {
    flexDirection: 'row',
  },
  difficultyStar: {
    fontSize: 18,
    marginRight: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 24,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
    width: (width - 64) / 3,
  },
  tagIcon: {
    fontSize: 18,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  recommendSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  moreLink: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  recommendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
  },
  recommendInfo: {
    flex: 1,
  },
  recommendTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  recommendSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  stretchSection: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  stretchList: {
    paddingRight: 20,
  },
  stretchCard: {
    width: 160,
    height: 100,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  stretchImage: {
    width: '100%',
    height: '100%',
  },
  stretchOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
  },
  stretchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  goalsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  goalsContainer: {
    marginBottom: 12,
  },
  goalButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1.5,
  },
  activeGoalButton: {
    backgroundColor: 'transparent',
    borderColor: '#2563eb',
  },
  inactiveGoalButton: {
    backgroundColor: '#f3f4f6',
    borderColor: 'transparent',
  },
  goalButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeGoalText: {
    color: '#2563eb',
  },
  inactiveGoalText: {
    color: '#9ca3af',
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  exerciseSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  exerciseArrow: {
    fontSize: 16,
    color: '#000',
  },
  addMore: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  addMoreText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  discoverSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  discoverCard: {
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    height: 100,
  },
  discoverImage: {
    width: '100%',
    height: '100%',
  },
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
  discoverText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
  },
  discoverButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  discoverButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WorkoutScreen;