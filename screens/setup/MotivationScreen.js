import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function MotivationScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  const options = [
    { emoji: "😁", label: "Cảm thấy tự tin" },
    { emoji: "🎈", label: "Giải tỏa căng thẳng" },
    { emoji: "💪", label: "Cải thiện sức khỏe" },
    { emoji: "🌞", label: "Tăng cường năng lượng" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={28} color="black" />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>

        <TouchableOpacity>
          <Text style={styles.skipText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      {/* Main */}
      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.title}>Điều gì thúc đẩy bạn{"\n"}nhiều nhất?</Text>
        <View style={styles.options}>
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selected === item.label && styles.selectedOption,
              ]}
              onPress={() => setSelected(item.label)}
            >
              <Text style={styles.optionEmoji}>{item.emoji}</Text>
              <Text style={styles.optionLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("ActivityLevel")}
        >
          <Text style={styles.nextButtonText}>TIẾP THEO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  backButton: {
    padding: 4,
  },
  progressContainer: {
    flex: 1,
    height: 8,
    marginHorizontal: 16,
    backgroundColor: "#d1d5db",
    borderRadius: 9999,
    overflow: "hidden",
  },
  progressBar: {
    width: "50%",
    height: 8,
    backgroundColor: "#2563eb",
    borderRadius: 9999,
  },
  skipText: {
    fontSize: 16,
    color: "#000",
  },
  main: {
    paddingHorizontal: 24,
    marginTop: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 34,
  },
  options: {
    width: "100%",
    maxWidth: 400,
    gap: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    gap: 12,
  },
  selectedOption: {
    backgroundColor: "#e0ecff",
    borderColor: "#2563eb",
  },
  optionEmoji: {
    fontSize: 28,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: "800",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  nextButton: {
    backgroundColor: "#1e40af",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
