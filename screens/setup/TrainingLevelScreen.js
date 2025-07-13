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

export default function TrainingLevelScreen({ navigation, route }) {
  const {
    gender,
    area,
    goal,
    motivation,
    workoutDaysPerWeek,
    workoutDays,
  } = route.params || {};

  const [selectedOption, setSelectedOption] = useState("beginner");

  const options = [
    {
      key: "beginner",
      emoji: "☝️",
      title: "Người bắt đầu",
      desc: "3-5 lần chống đẩy",
    },
    {
      key: "average",
      emoji: "✌️",
      title: "Trung bình",
      desc: "5-10 lần chống đẩy",
    },
    {
      key: "advanced",
      emoji: "👍",
      title: "Nâng cao",
      desc: "Ít nhất 10",
    },
  ];

  const handleNext = () => {
    navigation.navigate("SetGoal", {
      gender,
      area,
      goal,
      motivation,
      workoutDaysPerWeek,
      workoutDays,
      level: selectedOption,
    });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/62/261/107/pose-fitness-muscle-muscle-athlete-hd-wallpaper-preview.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar} />
          </View>
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.skipText}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        {/* Main */}
        <ScrollView contentContainerStyle={styles.main}>
          <Text style={styles.title}>Bạn có thể chống đẩy{"\n"}bao nhiêu lần một lúc?</Text>

          {options.map((opt) => {
            const isSelected = selectedOption === opt.key;
            return (
              <TouchableOpacity
                key={opt.key}
                style={[
                  styles.option,
                  isSelected ? styles.optionSelected : styles.optionUnselected,
                ]}
                onPress={() => setSelectedOption(opt.key)}
              >
                <Text style={styles.emoji}>{opt.emoji}</Text>
                <View style={styles.textContainer}>
                  <Text style={[styles.optionTitle, isSelected && { color: "#fff" }]}>
                    {opt.title}
                  </Text>
                  <Text
                    style={[
                      styles.optionDesc,
                      isSelected ? { color: "#fff" } : { color: "#ccc" },
                    ]}
                  >
                    {opt.desc}
                  </Text>
                </View>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark" size={16} color="#0049FF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
            <Text style={styles.submitButtonText}>TIẾP THEO</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.65)",
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
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "center",
  },
  progressBar: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: "#3B82F6",
    width: "100%",
  },
  skipText: {
    fontSize: 16,
    color: "#fff",
  },
  main: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 26,
    textAlign: "center",
    marginVertical: 24,
    lineHeight: 32,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    maxWidth: 400,
    width: "100%",
  },
  optionSelected: {
    backgroundColor: "#2563EB",
    borderWidth: 0,
  },
  optionUnselected: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
    color: "#fff",
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 4,
    color: "white",
  },
  optionDesc: {
    fontSize: 16,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  submitButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 18,
  },
});
