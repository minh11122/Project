import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function GoalScreen({ navigation }) {
  const [selectedGoal, setSelectedGoal] = useState("Xây dựng cơ\nbắp");

  const goals = [
    {
      title: "Giảm cân",
      image: "https://login.medlatec.vn//ImagePath/images/20201113/20201113_tap-gym-giam-can-nam-1.jpg",
    },
    {
      title: "Xây dựng cơ\nbắp",
      image: "https://mdfitness.vn/4725841D002D6361/B2FE80C04D5485C94725885A000DAD14/$File/tap-gym-tang-co-bap.jpg",
    },
    {
      title: "Giữ dáng",
      image: "https://cdnphoto.dantri.com.vn/LuGGoiO-DSaWpRXH2hhFoF9J8_M=/thumb_w/1320/2021/06/06/hoa-hau-hhen-nie-va-loat-sao-viet-cham-chi-tap-the-thao-giu-dang-khi-gian-cach-xa-hoi-1-1622964618935.jpeg",
    },
  ];

  return (
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/574/901/119/pose-muscle-muscle-athlete-simulators-hd-wallpaper-preview.jpg",
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

          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Motivation")}>
            <Text style={styles.skipText}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        {/* Main */}
        <ScrollView contentContainerStyle={styles.main}>
          <Text style={styles.heading}>Mục tiêu chính của bạn{"\n"}là gì?</Text>

          {goals.map((goal, index) => {
            const isSelected = selectedGoal === goal.title;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => setSelectedGoal(goal.title)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.selectedOptionText,
                  ]}
                >
                  {goal.title}
                </Text>
                <Image source={{ uri: goal.image }} style={styles.optionImage} />
                {isSelected && (
                  <View style={styles.checkmark}>
                    <FontAwesome name="check" size={14} color="#2563eb" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("Motivation", { goal: selectedGoal })}
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
  progressContainer: {
    flex: 1,
    marginHorizontal: 16,
    height: 8,
    backgroundColor: "#4b5563",
    borderRadius: 9999,
    overflow: "hidden",
  },
  progressBar: {
    width: "65%",
    height: 8,
    backgroundColor: "#22c55e",
  },
  skipText: {
    fontSize: 16,
    color: "#ccc",
  },
  main: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
    marginBottom: 32,
    lineHeight: 36,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "100%",
    position: "relative",
  },
  selectedOption: {
    backgroundColor: "#4ade80",
    borderColor: "#4ade80",
  },
  optionText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    width: "60%",
    lineHeight: 28,
  },
  selectedOptionText: {
    color: "#000",
  },
  optionImage: {
    width: 112,
    height: 112,
    borderRadius: 24,
    resizeMode: "contain",
  },
  checkmark: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "white",
    borderRadius: 999,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#22c55e",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});
