import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const options = [
  {
    id: "low",
    emoji: "👨‍💻",
    label: "Ít vận động",
    description: "Tôi ngồi tại bàn làm việc cả ngày",
  },
  {
    id: "light",
    emoji: "🚶‍♂️",
    label: "Hơi tích cực",
    description: "Tôi đi bộ hoặc tập thể dục nhẹ nhàng hàng ngày",
  },
  {
    id: "moderate",
    emoji: "🏃‍♂️",
    label: "Tích cực vừa phải",
    description: "Tôi tập thể dục thường xuyên và có hoạt động thể chất",
  },
  {
    id: "very_active",
    emoji: "🥰",
    label: "Rất tích cực",
    description: "Tôi tập thể dục mạnh mẽ và thường xuyên",
  },
];

export default function SetGoalScreen({ navigation, route }) {
  const {
    gender,
    area,
    goal,
    motivation,
    workoutDaysPerWeek,
    workoutDays,
    level,
  } = route.params || {};

  const [selected, setSelected] = useState("low");

  const handleNext = () => {
    navigation.navigate("HeightWeight", {
      gender,
      area,
      goal,
      motivation,
      workoutDaysPerWeek,
      workoutDays,
      level,
      activityLevel: selected,
    });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://c1.wallpaperflare.com/preview/148/973/113/barbell-bodybuilding-effort-exercise.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.skipButton}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        {/* Main content */}
        <ScrollView contentContainerStyle={styles.main}>
          <Text style={styles.title}>Mức độ vận động của{"\n"}bạn?</Text>

          {options.map((option) => {
            const isSelected = selected === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  isSelected ? styles.selected : styles.unselected,
                ]}
                onPress={() => setSelected(option.id)}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionLeft}>
                    <Text style={styles.emoji}>{option.emoji}</Text>
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && { color: "#fff" },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Text style={{ color: "#0D5BFF", fontWeight: "bold" }}>✓</Text>
                    </View>
                  )}
                </View>
                {isSelected && option.description && (
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
            <Text style={styles.submitText}>TIẾP THEO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  container: {
    flex: 1,
    paddingTop: 36,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  progressContainer: {
    flex: 1,
    maxWidth: 160,
    marginHorizontal: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 9999,
    backgroundColor: "#60a5fa",
  },
  skipButton: {
    fontSize: 16,
    color: "#fff",
  },
  main: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 24,
    marginBottom: 24,
    color: "#fff",
  },
  option: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  selected: {
    backgroundColor: "#2563EB",
  },
  unselected: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  optionDescription: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "400",
    color: "#dbeafe",
  },
  checkmark: {
    backgroundColor: "#fff",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  submitButton: {
    borderRadius: 9999,
    backgroundColor: "#10b981",
    paddingVertical: 16,
    alignItems: "center",
  },
  submitText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 18,
  },
});
