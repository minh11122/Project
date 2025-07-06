import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const options = [
  {
    id: "option1",
    emoji: "👨‍💻",
    label: "Ít vận động",
    description: "Tôi ngồi tại bàn làm việc cả ngày",
  },
  {
    id: "option2",
    emoji: "🚶‍♂️",
    label: "Hơi tích cực",
    description: "Tôi đi bộ hoặc tập thể dục nhẹ nhàng hàng ngày",
  },
  {
    id: "option3",
    emoji: "🏃‍♂️",
    label: "Tích cực vừa phải",
    description: "Tôi tập thể dục thường xuyên và có hoạt động thể chất",
  },
  {
    id: "option4",
    emoji: "🥰",
    label: "Rất tích cực",
    description: "Tôi tập thể dục mạnh mẽ và thường xuyên",
  },
];

export default function SetGoalScreen({ navigation }) {
  const [selected, setSelected] = useState("option1");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
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
                  <Text style={styles.optionText}>{option.label}</Text>
                </View>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Text style={{ color: "#0D5BFF", fontWeight: "bold" }}>
                      ✓
                    </Text>
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
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("HeightWeight")}
        >
          <Text style={styles.submitText}>TIẾP THEO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  progressContainer: {
    flex: 1,
    maxWidth: 160,
    marginHorizontal: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 9999,
    backgroundColor: "#004EFF",
  },
  skipButton: {
    fontSize: 16,
    color: "#000",
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
  },
  option: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  selected: {
    backgroundColor: "#004EFF",
  },
  unselected: {
    backgroundColor: "#fff",
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
    color: "#000",
  },
  optionDescription: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "400",
    color: "#A3C0FF",
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
    paddingBottom: 24,
  },
  submitButton: {
    borderRadius: 9999,
    backgroundColor: "#004EFF",
    paddingVertical: 16,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },
});
