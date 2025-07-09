import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";

export default function GenderScreen({ navigation }) {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleNext = () => {
    if (selectedGender) {
      navigation.navigate("FocusArea", { gender: selectedGender });
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/787/610/414/muscle-press-pose-athlete-workout-hd-wallpaper-preview.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progress} />
        </View>

        <ScrollView contentContainerStyle={styles.main}>
          <Text style={styles.heading}>Giới tính của bạn là gì?</Text>
          <Text style={styles.subtitle}>Hãy cho chúng tôi biết thêm về bạn</Text>

          <View style={styles.genderOptions}>
            <TouchableOpacity
              onPress={() => setSelectedGender("Nam")}
              style={[
                styles.genderOption,
                selectedGender === "Nam" && styles.genderOptionSelected,
              ]}
            >
              <Image
                source={{
                  uri: "https://storage.googleapis.com/a1aa/image/f81e0479-634d-44cf-791d-8990a8951e49.jpg",
                }}
                style={styles.genderImage}
                resizeMode="contain"
              />
              <Text style={styles.genderLabel}>Nam</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedGender("Nữ")}
              style={[
                styles.genderOption,
                selectedGender === "Nữ" && styles.genderOptionSelected,
              ]}
            >
              <Image
                source={{
                  uri: "https://storage.googleapis.com/a1aa/image/cda6a5ee-d3ac-4075-11ee-a7190c090019.jpg",
                }}
                style={styles.genderImage}
                resizeMode="contain"
              />
              <Text style={styles.genderLabel}>Nữ</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedGender ? styles.nextButtonEnabled : styles.nextButtonDisabled,
            ]}
            disabled={!selectedGender}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>TIẾP THEO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate("Main")}>
            <Text style={styles.skipText}>Bỏ qua và vào trang chính</Text>
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
    paddingTop: 40,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#d1d5db",
    borderRadius: 999,
    marginHorizontal: 16,
    marginBottom: 24,
    overflow: "hidden",
  },
  progress: {
    width: 56,
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 999,
  },
  main: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: "#ddd",
    textAlign: "center",
  },
  genderOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
    width: "100%",
  },
  genderOption: {
    alignItems: "center",
    flex: 1,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 12,
    padding: 8,
  },
  genderOptionSelected: {
    borderColor: "#4ade80",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  genderImage: {
    width: 130,
    height: 250,
    borderRadius: 8,
  },
  genderLabel: {
    marginTop: 12,
    fontWeight: "700",
    fontSize: 18,
    color: "#fff",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: "center",
  },
  nextButton: {
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
  nextButtonDisabled: {
    backgroundColor: "#6b7280",
  },
  nextButtonEnabled: {
    backgroundColor: "#4ade80",
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },
  skipButton: {
    marginTop: 16,
  },
  skipText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

