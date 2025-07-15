import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { FontAwesome5 } from "@expo/vector-icons";
import fitnessProfileServices from "../../services/fitnessProfile.services";
import WorkoutAIService from "../../services/WorkoutAIService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export default function ProgressPlanScreen({ navigation, route }) {
  const [progress, setProgress] = useState(0);
  const profileData = route.params.profileData;
  const strokeDasharray = 2 * Math.PI * 70;
  const strokeDashoffset = strokeDasharray * (1 - progress / 100);

  useEffect(() => {
    const simulateProgress = () => {
      let value = 0;
      const interval = setInterval(() => {
        value += 5;
        setProgress(value);
        if (value >= 100) {
          clearInterval(interval);
          navigation.navigate("Main"); 
        }
      }, 200);
    };

    const createProfileAndStartProgress = async () => {
      if (!profileData) {
        console.log(profileData);
        navigation.navigate("Home");
        return;
      }

      try {
        await fitnessProfileServices.createFitnessProfile(profileData);
        // Lấy userId từ token
        const token = await AsyncStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.userId || decoded._id || decoded.id;
        console.log(userId);
        // Gọi API tạo recommendation
        await WorkoutAIService.getRecommendation(userId);
        simulateProgress();
      } catch (error) {
        console.log(profileData);
        Alert.alert("Lỗi", error.message || "Không thể tạo hồ sơ.");
        navigation.navigate("Login");
      }
    };

    createProfileAndStartProgress();
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/756/656/18/look-pose-tattoo-tattoo-actor-hd-wallpaper-preview.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>ĐANG TẠO KẾ HOẠCH{"\n"}CHO BẠN</Text>
        <Text style={styles.description}>
          Đang chuẩn bị kế hoạch dựa trên mục tiêu của bạn...
        </Text>

        {/* Progress Circle */}
        <View style={styles.progressContainer}>
          <Svg width={192} height={192} viewBox="0 0 160 160">
            <Circle cx={80} cy={80} r={70} stroke="#ccc" strokeWidth={20} />
            <Defs>
              <LinearGradient id="blueGradient" x1="160" y1="80" x2="0" y2="80">
                <Stop offset="0" stopColor="#60A5FA" />
                <Stop offset="1" stopColor="#3B82F6" />
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

        {/* Thông tin hồ sơ */}
        {profileData && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoLine}>
              <FontAwesome5 name="check" size={14} color="#60A5FA" />{"  "}
              Phân tích cơ thể: {" "}
              <Text style={styles.highlightBlue}>{profileData.height}cm</Text>,{" "}
              <Text style={styles.highlightBlue}>{profileData.weight}kg</Text>
            </Text>
            <Text style={styles.infoLine}>
              <FontAwesome5 name="sync-alt" size={14} color="#60A5FA" />{"  "}
              Cấp độ thể dục: {" "}
              <Text style={styles.highlightStrong}>{profileData.level}</Text>
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.buttonText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 12,
    color: "#fff",
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
    color: "#fff",
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
    color: "#fff",
  },
  highlightBlue: {
    color: "#93c5fd",
    fontWeight: "600",
  },
  highlightStrong: {
    color: "#60a5fa",
    fontWeight: "900",
  },
  button: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 9999,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontWeight: "800",
    fontSize: 16,
    color: "#000",
  },
});
