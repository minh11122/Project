import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TrainingLevelScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState("beginner");

  const options = [
    {
      key: "beginner",
      emoji: "☝️",
      title: "Người bắt đầu",
      desc: "3-5 lần chống đẩy"
    },
    {
      key: "average",
      emoji: "✌️",
      title: "Trung bình",
      desc: "5-10 lần chống đẩy"
    },
    {
      key: "advanced",
      emoji: "👍",
      title: "Nâng cao",
      desc: "Ít nhất 10"
    }
  ];

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
        <Text style={styles.title}>Bạn có thể chống đẩy{"\n"}bao nhiêu lần một lúc?</Text>

        {options.map((opt) => {
          const isSelected = selectedOption === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              style={[styles.option, isSelected ? styles.optionSelected : styles.optionUnselected]}
              onPress={() => setSelectedOption(opt.key)}
            >
              <Text style={styles.emoji}>{opt.emoji}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.optionTitle}>{opt.title}</Text>
                <Text style={[styles.optionDesc, isSelected && { color: 'white' }]}>{opt.desc}</Text>
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

      {/* Footer with one Next button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate('SetGoal')}
        >
          <Text style={styles.submitButtonText}>TIẾP THEO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "center"
  },
  progressBar: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: "#2B6BFF",
    width: "100%"
  },
  skipText: {
    fontSize: 16,
    color: "black"
  },
  main: {
    padding: 24,
    alignItems: "center"
  },
  title: {
    color: "black",
    fontWeight: "800",
    fontSize: 26,
    textAlign: "center",
    marginVertical: 24
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    maxWidth: 400,
    width: "100%"
  },
  optionSelected: {
    backgroundColor: "#2B6BFF",
    justifyContent: "space-between"
  },
  optionUnselected: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff"
  },
  emoji: {
    fontSize: 28,
    marginRight: 12
  },
  textContainer: {
    flex: 1
  },
  optionTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 4,
    color: "black"
  },
  optionDesc: {
    fontSize: 16,
    color: "#4b5563"
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24
  },
  submitButton: {
    backgroundColor: "#0049FF",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center"
  },
  submitButtonText: {
    color: "white",
    fontWeight: "800",
    fontSize: 18
  }
});
