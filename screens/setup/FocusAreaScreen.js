import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FocusAreaScreen({ navigation }) {
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

      {/* Main Content */}
      <View style={styles.main}>
        <Text style={styles.heading}>Hãy chọn vùng tập trung của bạn</Text>
        <View style={styles.contentWrapper}>
          <View style={styles.buttons}>
            {["Toàn thân", "CÁNH TAY", "Ngực", "Bụng", "Chân"].map((label, index) => (
              <TouchableOpacity key={index} style={styles.optionButton}>
                <Text style={styles.optionText}>{label}</Text>
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
          style={styles.nextButton}
          onPress={() => navigation.navigate("Goal")}
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 16,
    height: 8,
    backgroundColor: "#d1d5db",
    borderRadius: 100,
    overflow: "hidden",
  },
  progressBar: {
    height: 8,
    width: "25%",
    backgroundColor: "#2563eb",
    borderRadius: 100,
  },
  skipText: {
    fontSize: 16,
    color: "black",
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
    marginBottom: 20,
  },
  contentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  buttons: {
    justifyContent: "center",
    gap: 16,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  image: {
    width: 160,
    height: 280,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  nextButton: {
    backgroundColor: "#005BFF",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
    width: "100%",
  },
  nextButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
  },
});
