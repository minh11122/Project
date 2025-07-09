import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  ImageBackground,
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
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/574/901/119/pose-muscle-muscle-athlete-simulators-hd-wallpaper-preview.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.timeText}>10:18</Text>
          <Image
            source={{
              uri: "https://storage.googleapis.com/a1aa/image/ab87b3de-31f9-48e3-d3e8-34b3dba13ba2.jpg",
            }}
            style={styles.topBarIcon}
          />
        </View>

        {/* Progress */}
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
          <TouchableOpacity onPress={() => navigation.navigate("TrainingLevel")}>
            <Text style={styles.skipButton}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Đặt mục tiêu hàng tuần{"\n"}của bạn</Text>
        <Text style={styles.description}>
          Chúng tôi khuyến nghị tập ít nhất 3 ngày mỗi tuần để có kết quả tốt hơn.
        </Text>

        {/* Weekly Days */}
        <View style={styles.labelWithIcon}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/a1aa/image/1723e14b-7ed5-4cf7-df60-5888584ab9da.jpg",
            }}
            style={styles.labelIcon}
          />
          <Text style={styles.labelText}>Ngày tập luyện hàng tuần</Text>
        </View>

        <View style={styles.daysContainer}>
          {days.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.dayButton, selectedDays === d && styles.dayButtonSelected]}
              onPress={() => setSelectedDays(d)}
            >
              <Text
                style={[styles.dayText, selectedDays === d && styles.dayTextSelected]}
              >
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.separator} />

        {/* Start Day Picker */}
        <View style={styles.labelWithIcon}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/a1aa/image/4b10ca22-e8c9-42c9-2e68-2c3c2cd245e3.jpg",
            }}
            style={styles.labelIcon}
          />
          <Text style={styles.labelText}>Ngày bắt đầu trong tuần</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={startDay}
            dropdownIconColor="#fff"
            onValueChange={(itemValue) => setStartDay(itemValue)}
            style={{ color: "#fff" }}
          >
            {weekdays.map((day) => (
              <Picker.Item key={day} label={day} value={day} />
            ))}
          </Picker>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigation.navigate("TrainingLevel")}
          >
            <Text style={styles.bottomButtonText}>TIẾP THEO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 8,
    paddingHorizontal: 16,
  },
  timeText: {
    color: "#fff",
    fontSize: 14,
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
    backgroundColor: "#6b7280",
    borderRadius: 9999,
  },
  progressBarFill: {
    height: 8,
    width: "70%",
    backgroundColor: "#22c55e",
    borderRadius: 9999,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  skipButton: {
    fontSize: 16,
    color: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
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
  labelText: {
    fontSize: 16,
    color: "#fff",
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
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  dayButtonSelected: {
    backgroundColor: "#22c55e",
    borderColor: "transparent",
  },
  dayText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  dayTextSelected: {
    color: "#000",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 24,
    marginHorizontal: 32,
  },
  pickerContainer: {
    marginHorizontal: 24,
    borderWidth: Platform.OS === "android" ? 1 : 0,
    borderColor: "#ccc",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  bottomButton: {
    backgroundColor: "#22c55e",
    borderRadius: 9999,
    paddingVertical: 16,
    alignItems: "center",
  },
  bottomButtonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
  },
});
