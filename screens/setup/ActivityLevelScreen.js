import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ActivityLevelScreen({ navigation }) {
  const [selectedDays, setSelectedDays] = useState(7);
  const [startDay, setStartDay] = useState("CHỦ NHẬT");

  const days = [1, 2, 3, 4, 5, 6, 7];
  const weekdays = [
    "CHỦ NHẬT",
    "THỨ HAI",
    "THỨ BA",
    "THỨ TƯ",
    "THỨ NĂM",
    "THỨ SÁU",
    "THỨ BẢY",
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text>10:18</Text>
          <Image
            source={{ uri: "https://storage.googleapis.com/a1aa/image/ab87b3de-31f9-48e3-d3e8-34b3dba13ba2.jpg" }}
            style={styles.topBarIcon}
          />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        {/* Navigation */}
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.skipButton}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>Đặt mục tiêu hàng tuần{"\n"}của bạn</Text>
        <Text style={styles.description}>
          Chúng tôi khuyến nghị tập luyện ít nhất 3 ngày mỗi tuần để có kết quả tốt hơn.
        </Text>

        {/* Weekly Days Selection */}
        <View style={styles.labelWithIcon}>
          <Image
            source={{ uri: "https://storage.googleapis.com/a1aa/image/1723e14b-7ed5-4cf7-df60-5888584ab9da.jpg" }}
            style={styles.labelIcon}
          />
          <Text>Ngày tập luyện hàng tuần</Text>
        </View>

        <View style={styles.daysContainer}>
          {days.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.dayButton, selectedDays === d && styles.dayButtonSelected]}
              onPress={() => setSelectedDays(d)}
            >
              <Text style={[styles.dayText, selectedDays === d && styles.dayTextSelected]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.separator} />

        {/* Start Day Picker */}
        <View style={styles.labelWithIcon}>
          <Image
            source={{ uri: "https://storage.googleapis.com/a1aa/image/4b10ca22-e8c9-42c9-2e68-2c3c2cd245e3.jpg" }}
            style={styles.labelIcon}
          />
          <Text>Ngày đầu tiên của tuần</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={startDay}
            onValueChange={(itemValue) => setStartDay(itemValue)}
          >
            {weekdays.map((day) => (
              <Picker.Item key={day} label={day} value={day} />
            ))}
          </Picker>
        </View>

        {/* Bottom Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigation.navigate("TrainingLevel")}
          >
            <Text style={styles.bottomButtonText}>TIẾP THEO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 4,
  },
  topBarIcon: {
    width: 16,
    height: 16,
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 9999,
  },
  progressBarFill: {
    height: 8,
    width: "60%",
    backgroundColor: "#2563eb",
    borderRadius: 9999,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  backButton: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  skipButton: {
    fontSize: 16,
    color: "#000",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  labelWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  labelIcon: {
    width: 20,
    height: 20,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
  },
  dayButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
  },
  dayButtonSelected: {
    backgroundColor: "#2563eb",
    borderColor: "transparent",
  },
  dayText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
  },
  dayTextSelected: {
    color: "#fff",
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 24,
    marginHorizontal: 32,
  },
  pickerContainer: {
    marginHorizontal: 24,
    borderWidth: Platform.OS === "android" ? 1 : 0,
    borderColor: "#d1d5db",
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  bottomButton: {
    backgroundColor: "#2563eb",
    borderRadius: 9999,
    paddingVertical: 16,
    alignItems: "center",
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
});
