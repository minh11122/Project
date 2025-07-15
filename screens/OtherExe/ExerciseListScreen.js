import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import ExerciseService from '../../services/exercise.services';

const ExerciseListScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { category, level } = route.params || {};

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadExercises();
  }, [category, level]);

  const loadExercises = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ExerciseService.getExercisesByCategoryAndLevel(category, level);
      
      if (response.success) {
        setExercises(response.data);
      } else {
        setError('Không thể tải danh sách bài tập');
      }
    } catch (err) {
      console.error('Error loading exercises:', err);
      setError('Đã xảy ra lỗi khi tải bài tập');
    } finally {
      setLoading(false);
    }
  };

  const handleExercisePress = (exercise) => {
    navigation.navigate('ExerciseDetail', { exercise });
  };

  const handleStartWorkout = () => {
    if (exercises.length === 0) {
      Alert.alert('Thông báo', 'Không có bài tập nào để bắt đầu');
      return;
    }
    // Chèn quảng nghỉ 30s giữa các bài tập và chuẩn hóa imageUrl
    const exercisesWithRest = [];
    exercises.forEach((ex, idx) => {
      // Chuẩn hóa imageUrl
      const normalized = { ...ex };
      if (!normalized.imageUrl && normalized.image) {
        normalized.imageUrl = normalized.image;
      }
      exercisesWithRest.push(normalized);
      if (idx < exercises.length - 1) {
        exercisesWithRest.push({
          name: 'Nghỉ',
          duration: 30, // giây
          isRest: true
        });
      }
    });
    navigation.navigate('StartWorkout', { exercises: exercisesWithRest });
  };

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={styles(colors).exerciseItem}
      onPress={() => handleExercisePress(item)}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles(colors).exerciseImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles(colors).imagePlaceholder}>
          <FontAwesome5 name="dumbbell" size={24} color={colors.muted} />
        </View>
      )}
      <View style={styles(colors).exerciseInfo}>
        <Text style={styles(colors).exerciseName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles(colors).exerciseDescription} numberOfLines={2}>
          {item.description || 'Không có mô tả'}
        </Text>
        <View style={styles(colors).exerciseMeta}>
          <View style={styles(colors).metaItem}>
            <FontAwesome5 name="dumbbell" size={12} color={colors.muted} />
            <Text style={styles(colors).metaText}>{item.equipment}</Text>
          </View>
          <View style={styles(colors).metaItem}>
            <FontAwesome5 name="clock" size={12} color={colors.muted} />
            <Text style={styles(colors).metaText}>
              {item.duration ? `${item.duration} phút` : 'N/A'}
            </Text>
          </View>
        </View>
        <View style={styles(colors).exerciseStats}>
          <Text style={styles(colors).statsText}>
            {item.set || 3} hiệp x {item.rep || 12} lần
          </Text>
        </View>
      </View>
      <FontAwesome5 name="chevron-right" size={16} color={colors.muted} />
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles(colors).header}>
      <TouchableOpacity
        style={styles(colors).backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={18} color={colors.text} />
      </TouchableOpacity>
      <View style={styles(colors).headerInfo}>
        <Text style={styles(colors).headerTitle}>
          {category} - {level}
        </Text>
        <Text style={styles(colors).headerSubtitle}>
          {exercises.length} bài tập
        </Text>
      </View>
      <TouchableOpacity
        style={styles(colors).startButton}
        onPress={handleStartWorkout}
      >
        <Text style={styles(colors).startButtonText}>Bắt đầu</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles(colors).container}>
        {renderHeader()}
        <View style={styles(colors).loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles(colors).loadingText}>Đang tải bài tập...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles(colors).container}>
        {renderHeader()}
        <View style={styles(colors).errorContainer}>
          <FontAwesome5 name="exclamation-triangle" size={48} color={colors.muted} />
          <Text style={styles(colors).errorText}>{error}</Text>
          <TouchableOpacity style={styles(colors).retryButton} onPress={loadExercises}>
            <Text style={styles(colors).retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles(colors).container}>
      {renderHeader()}
      <FlatList
        data={exercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles(colors).listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles(colors).emptyContainer}>
            <FontAwesome5 name="dumbbell" size={48} color={colors.muted} />
            <Text style={styles(colors).emptyText}>Không có bài tập nào</Text>
          </View>
        }
      />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 2,
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: colors.muted,
    marginLeft: 4,
  },
  exerciseStats: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statsText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.muted,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.muted,
  },
});

export default ExerciseListScreen; 