import React, { useContext, useEffect, useState } from 'react';
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

const ExerciseScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const navigation = useNavigation();
  const route = useRoute();
  const { exercises } = route.params || { exercises: [] };
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Current exercise with fallback
  const currentExercise = exercises[currentExerciseIndex] || {
    name: t('no_exercise'),
    duration: '00:00',
    imageUrl: null,
  };

  // Parse duration to seconds
  const parseDuration = (duration) => {
    if (!duration || typeof duration !== 'string') {
      console.warn('Invalid duration, defaulting to 0 seconds');
      return 0;
    }
    const parts = duration.split(':');
    if (parts.length !== 2) {
      console.warn(`Invalid duration format: ${duration}, defaulting to 0 seconds`);
      return 0;
    }
    const [minutes, seconds] = parts.map((part) => {
      const num = parseInt(part, 10);
      return isNaN(num) ? 0 : num;
    });
    return minutes * 60 + seconds;
  };

  // Initialize timer when exercise changes
  useEffect(() => {
    const durationInSeconds = parseDuration(currentExercise.duration);
    setTimer(durationInSeconds);
    if (durationInSeconds > 0) {
      setIsTimerRunning(true);
      const interval = setInterval(() => {
        if (isTimerRunning) {
          setTimer((prev) => {
            if (prev <= 1) {
              setIsTimerRunning(false);
              clearInterval(interval);
              handleNextExercise();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
      return () => {
        clearInterval(interval);
        setIsTimerRunning(false);
      };
    } else {
      setIsTimerRunning(false);
    }
  }, [currentExerciseIndex, currentExercise.duration, isTimerRunning]);

  // Language change effect
  useEffect(() => {
    const onLanguageChange = () => {
      console.log('Language changed in ExerciseScreen:', i18n.language);
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      navigation.goBack(); // Or navigate to a completion screen
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const togglePause = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const formatTimer = (seconds) => {
    if (seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
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
            {currentExerciseIndex < exercises.length - 1 ? t('skip') : t('finish')}
          </Text>
          <FontAwesome5
            name="step-forward"
            size={16}
            color={colors.text || '#000'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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