import React from 'react';
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

const { width } = Dimensions.get('window');

const DATA = {
  picksData: [
    {
      id: '1',
      title: 'Belly Fat Burner HIIT Beginner',
      duration: '14 min · Beginner',
      image: 'https://storage.googleapis.com/a1aa/image/7ba0c774-e28e-4acf-297f-0c0c539f6d09.jpg',
    },
    {
      id: '2',
      title: 'Lose Fat (No Jumping!)',
      duration: '15 min · Intermediate',
      image: 'https://storage.googleapis.com/a1aa/image/9ec03bae-8d04-489c-9303-b54f9e6e2045.jpg',
    },
  ],
  beginnerWorkouts: [
    {
      id: '1',
      title: 'Only 4 Moves for Abs',
      image: 'https://storage.googleapis.com/a1aa/image/d2d4d96e-ccf1-4a5d-b43e-10726b6ba09c.jpg',
    },
    {
      id: '2',
      title: 'Leg Workout (No Jumping!)',
      image: 'https://storage.googleapis.com/a1aa/image/55bd41b5-b307-4990-ec3d-cf0a8e0ff228.jpg',
    },
    {
      id: '3',
      title: 'Arm Workout Push-Ups',
      image: 'https://storage.googleapis.com/a1aa/image/a06de38f-04e8-47ef-afc2-264c8b37f5e0.jpg',
    },
  ],
  fastWorkouts: [
    {
      id: '1',
      title: '4 Min Tabata',
      duration: '4 min · Intermediate',
      image: 'https://storage.googleapis.com/a1aa/image/24390373-5464-4546-bf0a-e6d6838ca9f2.jpg',
    },
    {
      id: '2',
      title: '3 Exercises Lose Belly Fat',
      duration: '6 min · Beginner',
      image: 'https://storage.googleapis.com/a1aa/image/1a4fd399-2587-4d5a-dbb2-613a96c2a467.jpg',
    },
  ],
  challenges: [
    {
      id: '1',
      title: 'Plank Challenge',
      image: 'https://storage.googleapis.com/a1aa/image/8f80c84d-ecea-4c18-dfb6-89597311b55e.jpg',
    },
    {
      id: '2',
      title: 'Killer Chest Workout',
      image: 'https://storage.googleapis.com/a1aa/image/f8c8a504-9cda-4c8d-188b-52faae75e185.jpg',
    },
    {
      id: '3',
      title: 'Killer Chest Advanced',
      image: 'https://storage.googleapis.com/a1aa/image/1a19f58f-0cc0-4832-e25b-e9a4910c9ec0.jpg',
    },
  ],
  bodyFocusData: [
    {
      id: '1',
      title: 'Full Body Stretching',
      image: 'https://storage.googleapis.com/a1aa/image/77a2775a-99e2-4133-f4eb-da1b564f1570.jpg',
    },
    {
      id: '2',
      title: 'Morning Warm-Up',
      image: 'https://storage.googleapis.com/a1aa/image/3aa91d73-b94a-412b-48cf-f36c29608ebd.jpg',
    },
    {
      id: '3',
      title: 'Shoulder Tension Relief',
      image: 'https://storage.googleapis.com/a1aa/image/9b273ecb-24a4-4e71-f9fd-037c37a9d33d.jpg',
    },
    {
      id: '4',
      title: 'Sleepy Time Stretching',
      image: 'https://storage.googleapis.com/a1aa/image/7cd2ee6f-b087-4466-c9ba-727b04c683af.jpg',
    },
  ],
  bodyFocusButtons: [
    { id: '1', title: 'Chest', icon: 'dumbbell' },
    { id: '2', title: 'Arm & Shoulder', icon: 'fist-raised' },
    { id: '3', title: 'Butt & Leg', icon: 'running' },
    { id: '4', title: 'Six pack', icon: 'fire' },
  ],
};

const DiscoverScreen = () => {
  const renderPickItem = ({ item }) => (
    <TouchableOpacity style={styles.pickItem}>
      <Image source={{ uri: item.image }} style={styles.pickImage} />
      <View style={styles.pickInfo}>
        <Text style={styles.pickTitle}>{item.title}</Text>
        <Text style={styles.pickDuration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBeginnerCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFastWorkout = ({ item }) => (
    <TouchableOpacity style={styles.fastWorkoutItem}>
      <Image source={{ uri: item.image }} style={styles.fastWorkoutImage} />
      <View style={styles.fastWorkoutInfo}>
        <Text style={styles.fastWorkoutTitle}>{item.title}</Text>
        <Text style={styles.fastWorkoutDuration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderChallenge = ({ item }) => (
    <TouchableOpacity style={styles.challengeItem}>
      <Image source={{ uri: item.image }} style={styles.challengeImage} />
      <View style={styles.challengeOverlay}>
        <Text style={styles.challengeText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBodyFocusItem = ({ item }) => (
    <TouchableOpacity style={styles.bodyFocusItem}>
      <Image source={{ uri: item.image }} style={styles.bodyFocusImage} />
      <Text style={styles.bodyFocusTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderBodyFocusButton = ({ item }) => (
    <TouchableOpacity style={styles.focusButton}>
      <Text style={styles.focusButtonText}>{item.title}</Text>
      <Icon name={item.icon} size={24} color={colors.card} />
    </TouchableOpacity>
  );

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>DISCOVER</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="clock" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
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
        {/* Main Banner */}
        <View style={styles.mainBanner}>
          <Image
            source={{
              uri: 'https://storage.googleapis.com/a1aa/image/3e61b7b5-898b-4e90-ce14-73c282925be2.jpg',
            }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Only 4 Moves for Abs</Text>
            <Text style={styles.bannerSubtitle}>
              4 simple exercises only! Burn belly fat and firm your abs. Get a flat belly fast!
            </Text>
          </View>
        </View>

        {/* Picks for you */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Picks for you</Text>
          <FlatList
            data={DATA.picksData}
            renderItem={renderPickItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Stay Active Banner */}
        <View style={styles.stayActiveBanner}>
          <Image
            source={{
              uri: 'https://storage.googleapis.com/a1aa/image/f499f09d-92a2-4625-7255-26f77f03794d.jpg',
            }}
            style={styles.stayActiveBannerImage}
          />
          <View style={styles.stayActiveBannerOverlay}>
            <Text style={styles.stayActiveBannerTitle}>Stay active,{'\n'}stay in shape</Text>
            <Text style={styles.stayActiveBannerSubtitle}>5 workouts</Text>
          </View>
        </View>

        {/* For beginners */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>For beginners</Text>
          <FlatList
            data={DATA.beginnerWorkouts}
            renderItem={renderBeginnerCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Fast workout */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fast workout</Text>
          <FlatList
            data={DATA.fastWorkouts}
            renderItem={renderFastWorkout}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Challenge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Challenge</Text>
          <FlatList
            data={DATA.challenges}
            renderItem={renderChallenge}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* With equipment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>With equipment</Text>
          <View style={styles.equipmentContainer}>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/a1aa/image/92f702eb-2777-4680-46b5-0aaba09b0310.jpg',
              }}
              style={styles.equipmentImage}
            />
            <TouchableOpacity style={styles.equipmentButton}>
              <Icon name="chevron-right" size={16} color={colors.card} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Body focus exercises */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Body focus</Text>
          <FlatList
            data={DATA.bodyFocusData}
            renderItem={renderBodyFocusItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.bodyFocusRow}
          />
        </View>

        {/* Body focus buttons */}
        <View style={styles.section}>
          <FlatList
            data={DATA.bodyFocusButtons}
            renderItem={renderBodyFocusButton}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.focusButtonRow}
          />
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
    paddingTop: 60, // Adjust based on header height
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
    backgroundColor: '#1e293b',
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