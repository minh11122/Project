import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FocusAreaScreen({ navigation, route }) {
  const [selectedArea, setSelectedArea] = useState(null);
  const { gender } = route.params || {};

  const areas = ["Toàn thân", "Tay", "Ngực", "Bụng", "Chân", "Vai", "Lưng"];

  const handleNext = () => {
    if (selectedArea) {
      navigation.navigate("Goal", {
        area: selectedArea,
        gender,
      });
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/322/962/354/muscle-rod-pose-training-athlete-hd-wallpaper-preview.jpg",
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Goal", {
                gender, // ✅ vẫn giữ gender khi bỏ qua
              })
            }
          >
            <Text style={styles.skipText}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <Text style={styles.heading}>Hãy chọn vùng tập trung của bạn</Text>
          <View style={styles.contentWrapper}>
            <View style={styles.buttons}>
              {areas.map((label, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedArea === label && styles.optionButtonSelected,
                  ]}
                  onPress={() => setSelectedArea(label)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedArea === label && styles.optionTextSelected,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Image
              source={{
                uri: "https://storage.googleapis.com/a1aa/image/83767ff0-cb7f-4269-4897-df34b8ee53c2.jpg",
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedArea
                ? styles.nextButtonActive
                : styles.nextButtonDisabled,
            ]}
            disabled={!selectedArea}
            onPress={handleNext} // ✅ dùng handleNext
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
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 16,
    height: 8,
    backgroundColor: "#4b5563",
    borderRadius: 100,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    width: "40%",
    backgroundColor: "#22c55e",
    borderRadius: 100,
  },
  skipText: {
    fontSize: 16,
    color: "#ccc",
  },
  main: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  contentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  buttons: {
    justifyContent: "center",
    gap: 16,
    flex: 1,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  optionButtonSelected: {
    backgroundColor: "#4ade80",
    borderColor: "#4ade80",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#fff",
  },
  optionTextSelected: {
    color: "#000",
  },
  image: {
    width: 140,
    height: 260,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    width: "100%",
  },
  nextButtonActive: {
    backgroundColor: "#22c55e",
  },
  nextButtonDisabled: {
    backgroundColor: "#6b7280",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
