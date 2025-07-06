import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { FontAwesome5 } from "@expo/vector-icons"; // Dùng Expo

export default function ProgressPlanScreen({ navigation }) {
  const progress = 55;
  const strokeDasharray = 2 * Math.PI * 70;
  const strokeDashoffset = strokeDasharray * (1 - progress / 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ĐANG TẠO KẾ HOẠCH {"\n"}CHO BẠN</Text>
      <Text style={styles.description}>
        Đang chuẩn bị kế hoạch dựa trên mục tiêu của bạn...
      </Text>

      {/* Progress Circle */}
      <View style={styles.progressContainer}>
        <Svg width={192} height={192} viewBox="0 0 160 160">
          <Circle cx={80} cy={80} r={70} stroke="#F0F0F0" strokeWidth={20} />
          <Defs>
            <LinearGradient id="blueGradient" x1="160" y1="80" x2="0" y2="80">
              <Stop offset="0" stopColor="#005BFF" />
              <Stop offset="1" stopColor="#007BFF" />
            </LinearGradient>
          </Defs>
          <Circle
            cx={80}
            cy={80}
            r={70}
            stroke="url(#blueGradient)"
            strokeWidth={20}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 80 80)"
          />
        </Svg>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLine}>
          <FontAwesome5 name="check" size={14} color="#3b82f6" />{"  "}
          Phân tích cơ thể của bạn:{" "}
          <Text style={styles.highlightBlue}>169cm</Text>,{" "}
          <Text style={styles.highlightBlue}>50.0kg</Text>
        </Text>
        <Text style={styles.infoLine}>
          <FontAwesome5 name="sync-alt" size={14} color="#3b82f6" />{"  "}
          Điều chỉnh cấp độ thể dục:{" "}
          <Text style={styles.highlightStrong}>Người bắt đầu</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Main")}>
                <Text style={styles.buttonText}>Skip to Main</Text>
              </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    color: "#000",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 12,
    color: "#000",
  },
  progressContainer: {
    width: 192,
    height: 192,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    position: "absolute",
    fontSize: 48,
    fontWeight: "900",
    color: "#000",
  },
  infoContainer: {
    marginTop: 40,
    maxWidth: 320,
    alignItems: "center",
  },
  infoLine: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    textAlign: "center",
    color: "#000",
  },
  highlightBlue: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  highlightStrong: {
    color: "#1e40af",
    fontWeight: "900",
  },
});
