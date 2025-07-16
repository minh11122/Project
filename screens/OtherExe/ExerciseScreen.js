import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust path as needed
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Error Boundary Component
class ExerciseScreenErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ExerciseScreen Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Đã xảy ra lỗi
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>
            {this.state.error?.message || 'Lỗi không xác định'}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#2563eb',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
            }}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Thử lại</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const ExerciseScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const navigation = useNavigation();
  const route = useRoute();
  const { exercises = [] } = route.params || {};
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  console.log('ExerciseScreen - route.params:', route.params);
  console.log('ExerciseScreen - exercises:', exercises);
  console.log('ExerciseScreen - exercises type:', typeof exercises);
  console.log('ExerciseScreen - exercises isArray:', Array.isArray(exercises));

  // Current exercise with fallback
  const currentExercise = (exercises && Array.isArray(exercises) && exercises[currentExerciseIndex]) || {
    name: t('no_exercise'),
    duration: 3, // Default to 3 minutes as number
    imageUrl: null,
  };
  
  console.log('Current exercise:', currentExercise);
  console.log('Current exercise index:', currentExerciseIndex);
  console.log('Total exercises:', exercises?.length || 0);

  // Parse duration to seconds
  const parseDuration = useCallback((duration) => {
    console.log('Parsing duration:', duration, 'Type:', typeof duration);
    
    // If duration is a number (minutes), convert to seconds
    if (typeof duration === 'number') {
      const totalSeconds = duration * 60;
      console.log('Duration is number (minutes), converted to seconds:', totalSeconds);
      return totalSeconds;
    }
    
    // If duration is a string in "mm:ss" format
    if (typeof duration === 'string') {
      const parts = duration.split(':');
      console.log('Duration parts:', parts);
      if (parts.length === 2) {
        const [minutes, seconds] = parts.map((part) => {
          const num = parseInt(part, 10);
          return isNaN(num) ? 0 : num;
        });
        const totalSeconds = minutes * 60 + seconds;
        console.log('Parsed duration from string:', { minutes, seconds, totalSeconds });
        return totalSeconds;
      }
    }
    
    console.warn('Invalid duration format, defaulting to 0 seconds');
    return 0;
  }, []);

  // Initialize timer when exercise changes
  useEffect(() => {
    const durationInSeconds = parseDuration(currentExercise.duration);
    console.log('Setting timer to:', durationInSeconds);
    setTimer(durationInSeconds);
    setIsTimerRunning(false); // Reset timer state when exercise changes
  }, [currentExerciseIndex, currentExercise.duration, parseDuration]);

  // Separate timer effect
  useEffect(() => {
    let interval = null;
    
    console.log('Timer effect - isTimerRunning:', isTimerRunning, 'timer:', timer);
    
    if (isTimerRunning && timer > 0) {
      console.log('Starting timer interval');
      interval = setInterval(() => {
        setTimer((prev) => {
          console.log('Timer tick:', prev);
          if (prev <= 1) {
            console.log('Timer finished, moving to next exercise');
            setIsTimerRunning(false);
            // Use setTimeout to avoid calling handleNextExercise during render
            setTimeout(() => {
              if (exercises && Array.isArray(exercises) && currentExerciseIndex < exercises.length - 1) {
                console.log('Moving to next exercise');
                setCurrentExerciseIndex(currentExerciseIndex + 1);
              } else {
                console.log('No more exercises, going back');
                navigation.goBack();
              }
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        console.log('Clearing timer interval');
        clearInterval(interval);
      }
    };
  }, [isTimerRunning, timer, currentExerciseIndex, exercises, navigation]);

  // Language change effect
  useEffect(() => {
    const onLanguageChange = () => {
      console.log('Language changed in ExerciseScreen:', i18n.language);
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  const handleNextExercise = useCallback(() => {
    console.log('handleNextExercise called, current index:', currentExerciseIndex, 'total exercises:', exercises?.length || 0);
    if (exercises && Array.isArray(exercises) && currentExerciseIndex < exercises.length - 1) {
      console.log('Moving to next exercise');
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      console.log('No more exercises, going back');
      navigation.goBack(); // Or navigate to a completion screen
    }
  }, [currentExerciseIndex, exercises, navigation]);

  const handlePreviousExercise = useCallback(() => {
    console.log('handlePreviousExercise called, current index:', currentExerciseIndex);
    if (currentExerciseIndex > 0) {
      console.log('Moving to previous exercise');
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  }, [currentExerciseIndex]);

  const togglePause = useCallback(() => {
    console.log('togglePause called, timer:', timer, 'isTimerRunning:', isTimerRunning);
    if (timer > 0) {
      const newState = !isTimerRunning;
      console.log('Setting isTimerRunning to:', newState);
      setIsTimerRunning(newState);
    }
  }, [timer, isTimerRunning]);

  const formatTimer = useCallback((seconds) => {
    console.log('formatTimer called with:', seconds);
    if (seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    const formatted = `${mins}:${secs}`;
    console.log('Formatted timer:', formatted);
    return formatted;
  }, []);

  return (
    <ExerciseScreenErrorBoundary>
      <SafeAreaView style={styles(colors).container}>
        <View style={styles(colors).imageContainer}>
          <TouchableOpacity
            style={styles(colors).backButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel={t('back')}
          >
            <FontAwesome5 name="arrow-left" size={18} color={colors.icon || '#4B5563'} />
          </TouchableOpacity>

          {currentExercise.imageUrl ? (
            <Image
              source={{ uri: currentExercise.imageUrl }}
              style={styles(colors).image}
              resizeMode="contain"
              accessible
              accessibilityLabel={t('exercise_image', { name: currentExercise.name })}
            />
          ) : (
            <View style={styles(colors).imagePlaceholder}>
              <FontAwesome5 name="dumbbell" size={60} color={colors.muted} />
              <Text style={styles(colors).placeholderText}>Không có ảnh</Text>
            </View>
          )}

          <View style={styles(colors).topRightButtons}>
            <TouchableOpacity style={styles(colors).iconButton} accessibilityLabel={t('video')}>
              <FontAwesome5 name="video" size={18} color={colors.icon || '#4B5563'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles(colors).iconButton} accessibilityLabel={t('volume')}>
              <FontAwesome5 name="volume-up" size={18} color={colors.icon || '#4B5563'} />
            </TouchableOpacity>
          </View>

          <View style={styles(colors).bottomRightButtons}>
            <TouchableOpacity style={styles(colors).iconButton} accessibilityLabel={t('comment')}>
              <FontAwesome5 name="comment" size={18} color={colors.icon || '#4B5563'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles(colors).iconButton} accessibilityLabel={t('like')}>
              <FontAwesome5 name="thumbs-up" size={18} color={colors.icon || '#4B5563'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles(colors).middleContent}>
          <View style={styles(colors).titleRow}>
            <Text style={styles(colors).title}>{currentExercise.name}</Text>
            <TouchableOpacity style={styles(colors).helpButton} accessibilityLabel={t('help')}>
              <Text style={styles(colors).helpText}>?</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles(colors).timer}>{formatTimer(timer)}</Text>

          {timer > 0 && (
            <>
              <TouchableOpacity
                style={styles(colors).pauseButton}
                onPress={togglePause}
                accessibilityLabel={isTimerRunning ? t('pause') : t('resume')}
              >
                <FontAwesome5
                  name={isTimerRunning ? 'pause' : 'play'}
                  size={18}
                  color={colors.pauseButtonText || '#fff'}
                />
                <Text style={styles(colors).pauseText}>
                  {isTimerRunning ? t('pause') : t('resume')}
                </Text>
              </TouchableOpacity>

              {!isTimerRunning && (
                <TouchableOpacity
                  style={[styles(colors).pauseButton, { marginTop: 12, backgroundColor: colors.success || '#10B981' }]}
                  onPress={() => setIsTimerRunning(true)}
                  accessibilityLabel={t('start_exercise')}
                >
                  <FontAwesome5
                    name="play"
                    size={18}
                    color={colors.pauseButtonText || '#fff'}
                  />
                  <Text style={styles(colors).pauseText}>
                    {t('start_exercise')}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        <View style={styles(colors).footer}>
          <TouchableOpacity
            style={[
              styles(colors).footerButton,
              currentExerciseIndex === 0 && styles(colors).footerButtonDisabled,
            ]}
            onPress={handlePreviousExercise}
            disabled={currentExerciseIndex === 0}
            accessibilityLabel={t('previous_exercise')}
          >
            <FontAwesome5
              name="step-backward"
              size={16}
              color={currentExerciseIndex === 0 ? colors.disabled || '#9CA3AF' : colors.text || '#000'}
            />
            <Text
              style={[
                styles(colors).footerText,
                currentExerciseIndex === 0 && styles(colors).footerTextDisabled,
              ]}
            >
              {t('previous')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles(colors).footerButton}
            onPress={handleNextExercise}
            accessibilityLabel={t('next_exercise')}
          >
            <Text style={styles(colors).footerText}>
              {exercises && Array.isArray(exercises) && currentExerciseIndex < exercises.length - 1 ? t('skip') : t('finish')}
            </Text>
            <FontAwesome5
              name="step-forward"
              size={16}
              color={colors.text || '#000'}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ExerciseScreenErrorBoundary>
  );
};

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#fff',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
  },
  imagePlaceholder: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: colors.card || '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border || '#E5E7EB',
  },
  placeholderText: {
    fontSize: 16,
    color: colors.muted || '#6B7280',
    marginTop: 12,
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 24,
    backgroundColor: colors.backButton || '#E5E7EB',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRightButtons: {
    position: 'absolute',
    right: 24,
    top: 24,
    flexDirection: 'row',
    gap: 12,
  },
  bottomRightButtons: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    backgroundColor: colors.iconButton || '#E5E7EB',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text || '#000',
  },
  helpButton: {
    marginLeft: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border || '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpText: {
    fontSize: 12,
    color: colors.helpText || '#4B5563',
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.text || '#000',
    marginBottom: 32,
  },
  pauseButton: {
    flexDirection: 'row',
    backgroundColor: colors.pauseButton || '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: 'center',
    gap: 10,
  },
  pauseText: {
    color: colors.pauseButtonText || '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: colors.border || '#E5E7EB',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerButtonDisabled: {
    opacity: 0.5,
  },
  footerText: {
    color: colors.text || '#000',
    fontSize: 14,
  },
  footerTextDisabled: {
    color: colors.disabled || '#9CA3AF',
  },
});

export default ExerciseScreen;