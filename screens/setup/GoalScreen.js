import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function GoalScreen({ navigation }) {
  const [selectedGoal, setSelectedGoal] = useState("Xây dựng cơ\nbắp");

  const goals = [
    {
      title: "Giảm cân",
      image: "https://placehold.co/112x112/png?text=Giảm+cân",
    },
    {
      title: "Xây dựng cơ\nbắp",
      image: "https://placehold.co/112x112/png?text=Cơ+bắp",
    },
    {
      title: "Giữ dáng",
      image: "https://placehold.co/112x112/png?text=Giữ+dáng",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
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
          onPress={() => navigation.navigate("Motivation")}
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
  progressContainer: {
    flex: 1,
    marginHorizontal: 16,
    height: 8,
    backgroundColor: "#d1d5db",
    borderRadius: 9999,
    overflow: "hidden",
  },
  progressBar: {
    width: "35%",
    height: 8,
    backgroundColor: "#2563eb",
  },
  skipText: {
    fontSize: 16,
    color: "black",
  },
  main: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
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
    backgroundColor: "white",
    width: "100%",
    position: "relative",
  },
  selectedOption: {
    backgroundColor: "#2563eb",
    borderWidth: 0,
  },
  optionText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    width: "60%",
    lineHeight: 28,
  },
  selectedOptionText: {
    color: "white",
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
    backgroundColor: "#3b82f6",
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
