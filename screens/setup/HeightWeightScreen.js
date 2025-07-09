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

export default function HeightWeightScreen({ navigation }) {
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weight, setWeight] = useState(75.0);
  const [height, setHeight] = useState(175);

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
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Cân nặng</Text>
              <View style={styles.toggle}>
                <TouchableOpacity
                  style={[styles.toggleButton, weightUnit === 'kg' && styles.active]}
                  onPress={() => setWeightUnit('kg')}
                >
                  <Text style={weightUnit === 'kg' ? styles.activeText : styles.inactiveText}>kg</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, weightUnit === 'lbs' && styles.active]}
                  onPress={() => setWeightUnit('lbs')}
                >
                  <Text style={weightUnit === 'lbs' ? styles.activeText : styles.inactiveText}>lbs</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.valueDisplay}>
              <Text style={styles.value}>{weight.toFixed(1)}</Text>
              <Text style={styles.unit}>{weightUnit}</Text>
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
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Chiều cao</Text>
              <View style={styles.toggle}>
                <TouchableOpacity
                  style={[styles.toggleButton, heightUnit === 'cm' && styles.active]}
                  onPress={() => setHeightUnit('cm')}
                >
                  <Text style={heightUnit === 'cm' ? styles.activeText : styles.inactiveText}>cm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, heightUnit === 'ft' && styles.active]}
                  onPress={() => setHeightUnit('ft')}
                >
                  <Text style={heightUnit === 'ft' ? styles.activeText : styles.inactiveText}>ft</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.valueDisplay}>
              <Text style={styles.value}>{height}</Text>
              <Text style={styles.unit}>{heightUnit}</Text>
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
            onPress={() => navigation.navigate('Loading')}
          >
            <Text style={styles.startText}>TIẾP THEO</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 9999,
  },
  toggleButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  active: {
    backgroundColor: '#2563eb',
    borderRadius: 9999,
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  inactiveText: {
    color: '#6b7280',
    fontWeight: '600',
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
