import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
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
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/59/1012/990/model-fitness-gym-bodybuilder-wallpaper-preview.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("ActivityLevel")}>
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
                <Text
                  style={[
                    styles.optionLabel,
                    selected === item.label && styles.selectedOptionText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selected && styles.nextButtonDisabled,
            ]}
            onPress={() => navigation.navigate("ActivityLevel")}
            disabled={!selected}
          >
            <Text style={styles.nextButtonText}>TIẾP THEO</Text>
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
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
    flex: 1,
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
    backgroundColor: "#4b5563",
    borderRadius: 9999,
    overflow: "hidden",
  },
  progressBar: {
    width: "70%",
    height: 8,
    backgroundColor: "#22c55e",
    borderRadius: 9999,
  },
  skipText: {
    fontSize: 16,
    color: "#ccc",
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
    color: "#fff",
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
    borderColor: "#ccc",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    gap: 12,
  },
  selectedOption: {
    backgroundColor: "#4ade80",
    borderColor: "#4ade80",
  },
  optionEmoji: {
    fontSize: 28,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  selectedOptionText: {
    color: "#000",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  nextButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
