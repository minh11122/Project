import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ExerciseDetailScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { exercise } = route.params || {};

  if (!exercise) {
    return (
      <SafeAreaView style={styles(colors).container}>
        <View style={styles(colors).errorContainer}>
          <Text style={styles(colors).errorText}>Không tìm thấy thông tin bài tập</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleStartExercise = () => {
    navigation.navigate('Exercise', { exercises: [exercise] });
  };

  const renderHeader = () => (
    <View style={styles(colors).header}>
      <TouchableOpacity
        style={styles(colors).backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={18} color={colors.text} />
      </TouchableOpacity>
      <Text style={styles(colors).headerTitle}>Chi tiết bài tập</Text>
      <View style={styles(colors).headerSpacer} />
    </View>
  );

  const renderExerciseImage = () => (
    <View style={styles(colors).imageContainer}>
      {exercise.imageUrl ? (
        <Image
          source={{ uri: exercise.imageUrl }}
          style={styles(colors).exerciseImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles(colors).placeholderContainer}>
          <FontAwesome5 name="dumbbell" size={60} color={colors.muted} />
          <Text style={styles(colors).placeholderText}>Không có ảnh</Text>
        </View>
      )}
      {exercise.videoUrl && (
        <View style={styles(colors).imageOverlay}>
          <TouchableOpacity style={styles(colors).playButton}>
            <FontAwesome5 name="play" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderExerciseInfo = () => (
    <View style={styles(colors).infoContainer}>
      <Text style={styles(colors).exerciseName}>{exercise.name}</Text>
      <Text style={styles(colors).exerciseDescription}>
        {exercise.description || 'Không có mô tả chi tiết'}
      </Text>
      
      <View style={styles(colors).statsContainer}>
        <View style={styles(colors).statItem}>
          <FontAwesome5 name="dumbbell" size={20} color={colors.primary} />
          <Text style={styles(colors).statLabel}>Thiết bị</Text>
          <Text style={styles(colors).statValue}>{exercise.equipment}</Text>
        </View>
        
        <View style={styles(colors).statItem}>
          <FontAwesome5 name="signal" size={20} color={colors.primary} />
          <Text style={styles(colors).statLabel}>Độ khó</Text>
          <Text style={styles(colors).statValue}>
            {exercise.level === 'beginner' ? 'Người mới' : 
             exercise.level === 'intermediate' ? 'Trung bình' : 'Nâng cao'}
          </Text>
        </View>
        
        <View style={styles(colors).statItem}>
          <FontAwesome5 name="clock" size={20} color={colors.primary} />
          <Text style={styles(colors).statLabel}>Thời gian</Text>
          <Text style={styles(colors).statValue}>
            {exercise.duration ? `${exercise.duration} phút` : 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderWorkoutDetails = () => (
    <View style={styles(colors).workoutContainer}>
      <Text style={styles(colors).sectionTitle}>Chi tiết tập luyện</Text>
      
      <View style={styles(colors).workoutStats}>
        <View style={styles(colors).workoutStat}>
          <Text style={styles(colors).workoutStatValue}>{exercise.set || 3}</Text>
          <Text style={styles(colors).workoutStatLabel}>Hiệp</Text>
        </View>
        
        <View style={styles(colors).workoutStatDivider} />
        
        <View style={styles(colors).workoutStat}>
          <Text style={styles(colors).workoutStatValue}>{exercise.rep || 12}</Text>
          <Text style={styles(colors).workoutStatLabel}>Lần lặp</Text>
        </View>
        
        <View style={styles(colors).workoutStatDivider} />
        
        <View style={styles(colors).workoutStat}>
          <Text style={styles(colors).workoutStatValue}>
            {exercise.duration ? `${exercise.duration}'` : 'N/A'}
          </Text>
          <Text style={styles(colors).workoutStatLabel}>Thời gian</Text>
        </View>
      </View>
    </View>
  );

  const renderInstructions = () => (
    <View style={styles(colors).instructionsContainer}>
      <Text style={styles(colors).sectionTitle}>Hướng dẫn thực hiện</Text>
      <Text style={styles(colors).instructionsText}>
        {exercise.huongDan || 'Không có hướng dẫn chi tiết cho bài tập này.'}
      </Text>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles(colors).actionContainer}>
      <TouchableOpacity
        style={styles(colors).startButton}
        onPress={handleStartExercise}
      >
        <FontAwesome5 name="play" size={18} color="#fff" />
        <Text style={styles(colors).startButtonText}>Bắt đầu tập</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles(colors).favoriteButton}
        onPress={() => {/* TODO: Add to favorites */}}
      >
        <FontAwesome5 name="heart" size={18} color={colors.primary} />
        <Text style={styles(colors).favoriteButtonText}>Yêu thích</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles(colors).container}>
      {renderHeader()}
      <ScrollView
        style={styles(colors).scrollView}
        showsVerticalScrollIndicator={false}
      >
        {renderExerciseImage()}
        {renderExerciseInfo()}
        {renderWorkoutDetails()}
        {renderInstructions()}
      </ScrollView>
      {renderActionButtons()}
    </SafeAreaView>
  );
};

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
    width: '100%',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: colors.muted,
    marginTop: 12,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 20,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 16,
    color: colors.muted,
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  workoutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  workoutStats: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutStat: {
    flex: 1,
    alignItems: 'center',
  },
  workoutStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  workoutStatLabel: {
    fontSize: 14,
    color: colors.muted,
  },
  workoutStatDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 10,
  },
  instructionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  instructionsText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  startButton: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  favoriteButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.muted,
  },
});

export default ExerciseDetailScreen; 