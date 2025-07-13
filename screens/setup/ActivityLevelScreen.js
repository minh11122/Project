import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";

export default function ActivityLevelScreen({ navigation, route }) {
  const { gender, area, goal, motivation } = route.params || {};

  const weekdays = [
    "CHỦ NHẬT",
    "THỨ HAI",
    "THỨ BA",
    "THỨ TƯ",
    "THỨ NĂM",
    "THỨ SÁU",
    "THỨ BẢY",
  ];

  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

  const toggleDay = (day) => {
    setSelectedWeekdays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const handleNext = () => {
    if (selectedWeekdays.length > 0) {
      navigation.navigate("TrainingLevel", {
        gender,
        area,
        goal,
        motivation,
        workoutDaysPerWeek: selectedWeekdays.length,
        workoutDays: selectedWeekdays,
      });
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/574/901/119/pose-muscle-muscle-athlete-simulators-hd-wallpaper-preview.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TrainingLevel", {
                gender,
                area,
                goal,
                motivation,
              })
            }
          >
            <Text style={styles.skipButton}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Chọn các ngày bạn muốn tập</Text>
        <Text style={styles.description}>
          Nên tập ít nhất 3 ngày/tuần để đạt hiệu quả tốt hơn
        </Text>

        {/* Weekday Selector */}
        <View style={styles.daysContainer}>
          {weekdays.map((day, index) => {
            const isSelected = selectedWeekdays.includes(day);
            return (
              <TouchableOpacity
                key={index}
                style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
                onPress={() => toggleDay(day)}
              >
                <Text
                  style={[styles.dayText, isSelected && styles.dayTextSelected]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.bottomButton,
              selectedWeekdays.length === 0 && styles.bottomButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={selectedWeekdays.length === 0}
          >
            <Text style={styles.bottomButtonText}>TIẾP THEO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backButton: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  skipButton: {
    fontSize: 16,
    color: "#ccc",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 24,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  dayButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "rgba(255,255,255,0.1)",
    margin: 6,
  },
  dayButtonSelected: {
    backgroundColor: "#4ade80",
    borderColor: "#4ade80",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  dayTextSelected: {
    color: "#000",
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  bottomButton: {
    backgroundColor: "#22c55e",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },
  bottomButtonDisabled: {
    backgroundColor: "#6b7280",
  },
  bottomButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "800",
  },
});
