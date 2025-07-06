import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function GenderScreen({ navigation }) {
  const [selectedGender, setSelectedGender] = useState(null);

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progress} />
      </View>

      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.heading}>Giới tính của bạn là gì?</Text>
        <Text style={styles.subtitle}>Hãy cho chúng tôi biết thêm về bạn</Text>

        <View style={styles.genderOptions}>
          <TouchableOpacity onPress={() => setSelectedGender("Nam")} style={styles.genderOption}>
            <Image
              source={{ uri: "https://storage.googleapis.com/a1aa/image/f81e0479-634d-44cf-791d-8990a8951e49.jpg" }}
              style={styles.genderImage}
              resizeMode="contain"
            />
            <Text style={styles.genderLabel}>Nam</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedGender("Nữ")} style={styles.genderOption}>
            <Image
              source={{ uri: "https://storage.googleapis.com/a1aa/image/cda6a5ee-d3ac-4075-11ee-a7190c090019.jpg" }}
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
          style={[styles.nextButton, selectedGender ? styles.nextButtonEnabled : styles.nextButtonDisabled]}
          disabled={!selectedGender}
        >
          <Text style={styles.nextButtonText}>TIẾP THEO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FocusArea")}>
          <Text style={styles.buttonText}>Next: Focus Area</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Main")}>
          <Text style={styles.buttonText}>Skip to Main</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: "#666",
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
  },
  genderImage: {
    width: 130,
    height: 250,
  },
  genderLabel: {
    marginTop: 12,
    fontWeight: "700",
    fontSize: 18,
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
    backgroundColor: "#d1d5db",
  },
  nextButtonEnabled: {
    backgroundColor: "#2563eb",
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
