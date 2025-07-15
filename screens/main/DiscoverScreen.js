import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust path as needed
import { useTranslation } from 'react-i18next';
import exerciseServices from '../../services/exercise.services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const DATA = {
  picksData: [
    {
      id: '1',
      title: 'belly_fat_burner_hiit_beginner',
      duration: 'belly_fat_burner_hiit_beginner_duration',
      image: 'https://storage.googleapis.com/a1aa/image/7ba0c774-e28e-4acf-297f-0c0c539f6d09.jpg',
    },
    {
      id: '2',
      title: 'lose_fat_no_jumping',
      duration: 'lose_fat_no_jumping_duration',
      image: 'https://storage.googleapis.com/a1aa/image/9ec03bae-8d04-489c-9303-b54f9e6e2045.jpg',
    },
  ],
  beginnerWorkouts: [
    {
      id: '1',
      title: 'four_moves_for_abs',
      image: 'https://storage.googleapis.com/a1aa/image/d2d4d96e-ccf1-4a5d-b43e-10726b6ba09c.jpg',
    },
    {
      id: '2',
      title: 'leg_workout_no_jumping',
      image: 'https://storage.googleapis.com/a1aa/image/55bd41b5-b307-4990-ec3d-cf0a8e0ff228.jpg',
    },
    {
      id: '3',
      title: 'arm_workout_push_ups',
      image: 'https://storage.googleapis.com/a1aa/image/a06de38f-04e8-47ef-afc2-264c8b37f5e0.jpg',
    },
  ],
  fastWorkouts: [
    {
      id: '1',
      title: 'four_min_tabata',
      duration: 'four_min_tabata_duration',
      image: 'https://storage.googleapis.com/a1aa/image/24390373-5464-4546-bf0a-e6d6838ca9f2.jpg',
    },
    {
      id: '2',
      title: 'three_exercises_lose_belly_fat',
      duration: 'three_exercises_lose_belly_fat_duration',
      image: 'https://storage.googleapis.com/a1aa/image/1a4fd399-2587-4d5a-dbb2-613a96c2a467.jpg',
    },
  ],
  challenges: [
    {
      id: '1',
      title: 'plank_challenge',
      image: 'https://storage.googleapis.com/a1aa/image/8f80c84d-ecea-4c18-dfb6-89597311b55e.jpg',
    },
    {
      id: '2',
      title: 'killer_chest_workout',
      image: 'https://storage.googleapis.com/a1aa/image/f8c8a504-9cda-4c8d-188b-52faae75e185.jpg',
    },
    {
      id: '3',
      title: 'killer_chest_advanced',
      image: 'https://storage.googleapis.com/a1aa/image/1a19f58f-0cc0-4832-e25b-e9a4910c9ec0.jpg',
    },
  ],
  bodyFocusData: [
    {
      id: '1',
      title: 'full_body_stretching',
      image: 'https://storage.googleapis.com/a1aa/image/77a2775a-99e2-4133-f4eb-da1b564f1570.jpg',
    },
    {
      id: '2',
      title: 'morning_warm_up',
      image: 'https://storage.googleapis.com/a1aa/image/3aa91d73-b94a-412b-48cf-f36c29608ebd.jpg',
    },
    {
      id: '3',
      title: 'shoulder_tension_relief',
      image: 'https://storage.googleapis.com/a1aa/image/9b273ecb-24a4-4e71-f9fd-037c37a9d33d.jpg',
    },
    {
      id: '4',
      title: 'sleepy_time_stretching',
      image: 'https://storage.googleapis.com/a1aa/image/7cd2ee6f-b087-4466-c9ba-727b04c683af.jpg',
    },
  ],
  bodyFocusButtons: [
    { id: '1', title: 'chest', icon: 'dumbbell' },
    { id: '2', title: 'arm_shoulder', icon: 'fist-raised' },
    { id: '3', title: 'butt_leg', icon: 'running' },
    { id: '4', title: 'six_pack', icon: 'fire' },
  ],
};

const DiscoverScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  // State cho dữ liệu động
  const [picks, setPicks] = useState([]);
  const [beginnerWorkouts, setBeginnerWorkouts] = useState([]);
  const [fastWorkouts, setFastWorkouts] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onLanguageChange = () => {
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  useEffect(() => {
    // Gọi API backend để lấy dữ liệu động
    const fetchData = async () => {
      setLoading(true);
      try {
        // Lấy bài tập nổi bật (ví dụ: random 2 bài tập bất kỳ)
        const allRes = await exerciseServices.getAllExercises();
        let allExercises = allRes?.data || [];
        if (allExercises.length > 0) {
          setPicks(allExercises.slice(0, 2));
        }
        // Lấy bài tập cho người mới
        const beginnerRes = await exerciseServices.getAllExercises({ level: 'beginner' });
        setBeginnerWorkouts(beginnerRes?.data?.slice(0, 5) || []);
        // Lấy bài tập nhanh (ví dụ: duration <= 7 phút)
        setFastWorkouts(allExercises.filter(e => e.duration && e.duration <= 7).slice(0, 5));
        // Lấy challenge (ví dụ: các bài tập có category là 'challenge' hoặc random 3 bài)
        setChallenges(allExercises.filter(e => e.category && e.category.toLowerCase().includes('challenge')).slice(0, 3));
      } catch (err) {
        // Nếu lỗi, fallback sang DATA tĩnh
        setPicks(DATA.picksData);
        setBeginnerWorkouts(DATA.beginnerWorkouts);
        setFastWorkouts(DATA.fastWorkouts);
        setChallenges(DATA.challenges);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderPickItem = ({ item }) => (
    <TouchableOpacity style={styles(colors).pickItem}>
      <Image source={{ uri: item.image }} style={styles(colors).pickImage} />
      <View style={styles(colors).pickInfo}>
        <Text style={styles(colors).pickTitle}>{t(item.title)}</Text>
        <Text style={styles(colors).pickDuration}>{t(item.duration)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBeginnerCard = ({ item }) => (
    <TouchableOpacity style={styles(colors).card}>
      <Image source={{ uri: item.image }} style={styles(colors).cardImage} />
      <View style={styles(colors).cardOverlay}>
        <Text style={styles(colors).cardText}>{t(item.title)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFastWorkout = ({ item }) => (
    <TouchableOpacity style={styles(colors).fastWorkoutItem}>
      <Image source={{ uri: item.image }} style={styles(colors).fastWorkoutImage} />
      <View style={styles(colors).fastWorkoutInfo}>
        <Text style={styles(colors).fastWorkoutTitle}>{t(item.title)}</Text>
        <Text style={styles(colors).fastWorkoutDuration}>{t(item.duration)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderChallenge = ({ item }) => (
    <TouchableOpacity style={styles(colors).challengeItem}>
      <Image source={{ uri: item.image }} style={styles(colors).challengeImage} />
      <View style={styles(colors).challengeOverlay}>
        <Text style={styles(colors).challengeText}>{t(item.title)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBodyFocusItem = ({ item }) => (
    <TouchableOpacity style={styles(colors).bodyFocusItem}>
      <Image source={{ uri: item.image }} style={styles(colors).bodyFocusImage} />
      <Text style={styles(colors).bodyFocusTitle}>{t(item.title)}</Text>
    </TouchableOpacity>
  );

  const renderBodyFocusButton = ({ item }) => (
    <TouchableOpacity style={styles(colors).focusButton}>
      <Text style={styles(colors).focusButtonText}>{t(item.title)}</Text>
      <Icon name={item.icon} size={24} color={colors.card} />
    </TouchableOpacity>
  );

  const Header = () => (
    <View style={styles(colors).header}>
      <Text style={styles(colors).headerTitle}>{t('discover')}</Text>
      <View style={styles(colors).headerIcons}>
        <TouchableOpacity style={styles(colors).iconButton}>
          <Icon name="search" size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles(colors).iconButton}>
          <Icon name="clock" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
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
        <View style={styles(colors).mainBanner}>
          <Image
            source={{
              uri: 'https://storage.googleapis.com/a1aa/image/3e61b7b5-898b-4e90-ce14-73c282925be2.jpg',
            }}
            style={styles(colors).bannerImage}
          />
          <View style={styles(colors).bannerOverlay}>
            <Text style={styles(colors).bannerTitle}>{t('four_moves_for_abs')}</Text>
            <Text style={styles(colors).bannerSubtitle}>{t('four_moves_for_abs_subtitle')}</Text>
          </View>
        </View>
        <View style={styles(colors).section}>
          <Text style={styles(colors).sectionTitle}>{t('picks_for_you')}</Text>
          <FlatList
            data={picks}
            renderItem={renderPickItem}
            keyExtractor={(item) => item.id || item._id}
            scrollEnabled={false}
          />
        </View>
        <View style={styles(colors).stayActiveBanner}>
          <Image
            source={{
              uri: 'https://storage.googleapis.com/a1aa/image/f499f09d-92a2-4625-7255-26f77f03794d.jpg',
            }}
            style={styles(colors).stayActiveBannerImage}
          />
          <View style={styles(colors).stayActiveBannerOverlay}>
            <Text style={styles(colors).stayActiveBannerTitle}>{t('stay_active')}</Text>
            <Text style={styles(colors).stayActiveBannerSubtitle}>{t('five_workouts')}</Text>
          </View>
        </View>
        <View style={styles(colors).section}>
          <Text style={styles(colors).sectionTitle}>{t('for_beginners')}</Text>
          <FlatList
            data={beginnerWorkouts}
            renderItem={renderBeginnerCard}
            keyExtractor={(item) => item.id || item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles(colors).horizontalList}
          />
        </View>
        <View style={styles(colors).section}>
          <Text style={styles(colors).sectionTitle}>{t('fast_workout')}</Text>
          <FlatList
            data={fastWorkouts}
            renderItem={renderFastWorkout}
            keyExtractor={(item) => item.id || item._id}
            scrollEnabled={false}
          />
        </View>
        <View style={styles(colors).section}>
          <Text style={styles(colors).sectionTitle}>{t('challenge')}</Text>
          <FlatList
            data={challenges}
            renderItem={renderChallenge}
            keyExtractor={(item) => item.id || item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles(colors).horizontalList}
          />
        </View>
        <View style={styles(colors).section}>
          <Text style={styles(colors).sectionTitle}>{t('with_equipment')}</Text>
          <View style={styles(colors).equipmentContainer}>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/a1aa/image/92f702eb-2777-4680-46b5-0aaba09b0310.jpg',
              }}
              style={styles(colors).equipmentImage}
            />
            <TouchableOpacity style={styles(colors).equipmentButton}>
              <Icon name="chevron-right" size={16} color={colors.card} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles(colors).section}>
          <Text style={styles(colors).sectionTitle}>{t('body_focus')}</Text>
          <FlatList
            data={DATA.bodyFocusData}
            renderItem={renderBodyFocusItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles(colors).bodyFocusRow}
          />
        </View>
        <View style={styles(colors).section}>
          <FlatList
            data={DATA.bodyFocusButtons}
            renderItem={renderBodyFocusButton}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles(colors).focusButtonRow}
          />
        </View>
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
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 8,
    backgroundColor: colors.border,
    borderRadius: 12,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  mainBanner: {
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
  },
  bannerImage: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: 'rgba(55, 65, 81, 0.8)',
    borderRadius: 24,
    padding: 32,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.card,
    lineHeight: 36,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 18,
    color: colors.card,
    fontWeight: '400',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  pickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
    marginBottom: 24,
  },
  pickImage: {
    width: 96,
    height: 96,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  pickInfo: {
    marginLeft: 16,
    flex: 1,
  },
  pickTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 20,
  },
  pickDuration: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
  },
  stayActiveBanner: {
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
  },
  stayActiveBannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  stayActiveBannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: 'rgba(55, 65, 81, 0.8)',
    borderRadius: 24,
    padding: 32,
    justifyContent: 'center',
  },
  stayActiveBannerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.card,
    lineHeight: 36,
    marginBottom: 8,
  },
  stayActiveBannerSubtitle: {
    fontSize: 18,
    color: colors.card,
  },
  horizontalList: {
    gap: 16,
  },
  card: {
    width: 160,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: 160,
    height: 160,
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    borderRadius: 24,
  },
  cardText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
  },
  fastWorkoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
    marginBottom: 16,
  },
  fastWorkoutImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  fastWorkoutInfo: {
    marginLeft: 16,
    flex: 1,
  },
  fastWorkoutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 20,
  },
  fastWorkoutDuration: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
  },
  challengeItem: {
    width: 160,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  challengeImage: {
    width: 160,
    height: 120,
    resizeMode: 'cover',
  },
  challengeOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  challengeText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  equipmentContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  equipmentImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  equipmentButton: {
    position: 'absolute',
    top: '50%',
    right: 16,
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -20 }],
  },
  bodyFocusRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bodyFocusItem: {
    width: (width - 48) / 2,
  },
  bodyFocusImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  bodyFocusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    lineHeight: 20,
  },
  focusButtonRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  focusButton: {
    width: (width - 48) / 2,
    backgroundColor: '#1e293b', // Updated below in styles to use colors.card
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  focusButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DiscoverScreen;