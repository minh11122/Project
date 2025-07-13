import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function HeightWeightScreen({ navigation, route }) {
  const {
    gender,
    area, // groupmuscle
    goal,
    motivation,
    workoutDaysPerWeek,
    workoutDays,
    level,
    activityLevel,
  } = route.params || {};

  const [weight, setWeight] = useState(75.0); // kg
  const [height, setHeight] = useState(175);  // cm

  const handleNext = () => {
    const data = {
      gender,
      groupmuscle: area,
      goal,
      motivation,
      workoutDaysPerWeek,
      workoutDays,
      level,
      activityLevel,
      weight: parseFloat(weight.toFixed(1)),
      height: parseFloat(height.toFixed(1)),
    };

    navigation.navigate('Loading', { profileData: data });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/632/152/1006/look-pose-tattoo-tattoo-actor-hd-wallpaper-preview.jpg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar} />
          </View>
          <TouchableOpacity>
            <Text style={styles.skipText}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        {/* Main content */}
        <ScrollView contentContainerStyle={styles.main}>
          <Text style={styles.title}>Hãy cho chúng tôi biết{"\n"}thêm về bạn</Text>

          {/* Weight section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cân nặng (kg)</Text>
            <View style={styles.valueDisplay}>
              <Text style={styles.value}>{weight.toFixed(1)}</Text>
              <Text style={styles.unit}>kg</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={30}
              maximumValue={150}
              step={0.1}
              value={weight}
              onValueChange={(val) => setWeight(val)}
              minimumTrackTintColor="#3b82f6"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#3b82f6"
            />
          </View>

          {/* Height section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chiều cao (cm)</Text>
            <View style={styles.valueDisplay}>
              <Text style={styles.value}>{height}</Text>
              <Text style={styles.unit}>cm</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={120}
              maximumValue={220}
              step={1}
              value={height}
              onValueChange={(val) => setHeight(val)}
              minimumTrackTintColor="#3b82f6"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#3b82f6"
            />
          </View>

          {/* NEXT button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleNext}
          >
            <Text style={styles.startText}>TIẾP THEO</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  progressBar: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: '#60a5fa',
    width: '100%',
  },
  skipText: {
    fontSize: 14,
    color: '#fff',
  },
  main: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 24,
    color: '#fff',
  },
  section: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
  },
  valueDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  value: {
    fontSize: 40,
    fontWeight: '900',
    color: '#fff',
  },
  unit: {
    fontSize: 16,
    marginBottom: 2,
    color: '#d1d5db',
  },
  startButton: {
    width: '100%',
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 9999,
    marginTop: 12,
  },
  startText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
