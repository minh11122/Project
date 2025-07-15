import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import WorkoutAIService from '../../services/WorkoutAIService';

const WEEK_DAYS = [
  'THỨ HAI',
  'THỨ BA',
  'THỨ TƯ',
  'THỨ NĂM',
  'THỨ SÁU',
  'THỨ BẢY',
  'CHỦ NHẬT',
];

const SectionTitle = ({ children }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const ReportScreen = () => {
  const [userId, setUserId] = useState(null);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchUserIdAndWorkout = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Không tìm thấy token, vui lòng đăng nhập lại.');
        const decoded = jwtDecode(token);
        if (!decoded.userId && !decoded._id && !decoded.id) throw new Error('Token không hợp lệ.');
        const id = decoded.userId || decoded._id || decoded.id;
        setUserId(id);
        const res = await WorkoutAIService.getWorkout(id);
        setWorkout(res.data || res);
      } catch (err) {
        setError(err.message || 'Đã có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };
    fetchUserIdAndWorkout();
  }, [refreshing]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
        <TouchableOpacity style={styles.regenBtn} onPress={() => setRefreshing((r) => !r)}>
          <Text style={styles.regenText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const overview = workout?.workoutPlan?.overview || workout?.overview;
  const schedule = workout?.workoutPlan?.weeklySchedule || workout?.weeklySchedule || {};
  const nutrition = workout?.workoutPlan?.nutritionPlan || workout?.nutritionPlan;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Tổng quan */}
        <View style={styles.cardOverview}>
          <SectionTitle>📋 Tổng quan lịch tập</SectionTitle>
          {overview ? (
            <View style={styles.overviewRow}>
              <View style={styles.overviewItem}><Text style={styles.overviewIcon}>🎯</Text><Text>Mục tiêu: <Text style={styles.overviewValue}>{overview.goal}</Text></Text></View>
              <View style={styles.overviewItem}><Text style={styles.overviewIcon}>⭐</Text><Text>Trình độ: <Text style={styles.overviewValue}>{overview.level}</Text></Text></View>
              <View style={styles.overviewItem}><Text style={styles.overviewIcon}>💪</Text><Text>Nhóm cơ chính: <Text style={styles.overviewValue}>{overview.targetMuscle}</Text></Text></View>
              <View style={styles.overviewItem}><Text style={styles.overviewIcon}>📅</Text><Text>Số buổi/tuần: <Text style={styles.overviewValue}>{overview.workoutDaysPerWeek}</Text></Text></View>
              <View style={styles.overviewItem}><Text style={styles.overviewIcon}>⏱</Text><Text>Thời lượng dự kiến: <Text style={styles.overviewValue}>{overview.estimatedDuration} phút</Text></Text></View>
            </View>
          ) : <Text>Không có dữ liệu tổng quan</Text>}
        </View>

        {/* Lịch tập tuần */}
        <View style={styles.card}>
          <SectionTitle>Lịch tập tuần</SectionTitle>
          <View style={styles.calendarRow}>
            {WEEK_DAYS.map(day => (
              <View
                key={day}
                style={[styles.calendarDayBlock, schedule[day] ? styles.activeDay : styles.inactiveDay]}
              >
                <Text style={styles.dayTitle}>{day}</Text>
                {schedule[day] ? (
                  <ScrollView>
                    {/* Warm up */}
                    <Text style={styles.subTitleCal}><Text style={{color:'#FF9800'}}>🔥</Text> Khởi động:</Text>
                    {schedule[day].warmUp?.length > 0 ? schedule[day].warmUp.map((ex, idx) => (
                      <Text key={idx} style={styles.exerciseCal}>- {ex.name} ({ex.duration || ''}s)</Text>
                    )) : <Text style={styles.exerciseCal}>Không có</Text>}
                    {/* Main workout */}
                    <Text style={styles.subTitleCal}><Text style={{color:'#2196F3'}}>🏋️</Text> Bài tập chính:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 4}}>
                      {schedule[day].mainWorkout?.length > 0 ? schedule[day].mainWorkout.map((ex, idx) => {
                        const e = ex.exerciseId || {};
                        return (
                          <View key={idx} style={styles.exerciseCard}>
                            {e.imageUrl ? (
                              <View style={styles.imgWrap}><Image source={{uri: e.imageUrl}} style={styles.exerciseImg} /></View>
                            ) : null}
                            <Text style={styles.exerciseName}>{e.name || 'Bài tập không xác định'}</Text>
                            <Text style={styles.exerciseDetail}>{(e.set || '-') + 'x' + (e.rep || '-')} {e.equipment ? `- ${e.equipment}` : ''}</Text>
                            {e.huongDan ? <Text style={styles.exerciseGuide}>{e.huongDan}</Text> : null}
                          </View>
                        );
                      }) : <Text style={styles.exerciseCal}>Không có</Text>}
                    </ScrollView>
                    {/* Cool down */}
                    <Text style={styles.subTitleCal}><Text style={{color:'#4CAF50'}}>🧘</Text> Thư giãn:</Text>
                    {schedule[day].coolDown?.length > 0 ? schedule[day].coolDown.map((ex, idx) => (
                      <Text key={idx} style={styles.exerciseCal}>- {ex.name} ({ex.duration || ''}s)</Text>
                    )) : <Text style={styles.exerciseCal}>Không có</Text>}
                    {/* Tổng thời gian */}
                    <Text style={styles.totalTimeCal}>⏱ Tổng thời gian: {schedule[day].totalDuration || 0} phút</Text>
                  </ScrollView>
                ) : (
                  <Text style={styles.exerciseCal}>Không có lịch tập</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Nutrition Plan */}
        {nutrition && (
          <View style={styles.cardNutrition}>
            <SectionTitle>🍽️ Kế hoạch dinh dưỡng</SectionTitle>
            <View style={styles.nutritionRow}>
              <View style={styles.nutriBlock}><Text style={styles.nutriIcon}>🔥</Text><Text style={styles.nutriLabel}>BMR</Text><Text style={styles.nutriValue}>{nutrition.bmr}</Text></View>
              <View style={styles.nutriBlock}><Text style={styles.nutriIcon}>⚡</Text><Text style={styles.nutriLabel}>TDEE</Text><Text style={styles.nutriValue}>{nutrition.tdee}</Text></View>
              <View style={styles.nutriBlock}><Text style={styles.nutriIcon}>🎯</Text><Text style={styles.nutriLabel}>Calories</Text><Text style={styles.nutriValue}>{nutrition.targetCalories}</Text></View>
            </View>
            <Text style={styles.nutriMacroTitle}>Macros:</Text>
            <View style={styles.macroRow}>
              <View style={[styles.macroBlock, {backgroundColor:'#e3f7e3'}]}><Text style={styles.macroIcon}>🥩</Text><Text style={styles.macroLabel}>Protein</Text><Text style={styles.macroValue}>{nutrition.macros?.protein}g</Text></View>
              <View style={[styles.macroBlock, {backgroundColor:'#e3e8f7'}]}><Text style={styles.macroIcon}>🍚</Text><Text style={styles.macroLabel}>Carbs</Text><Text style={styles.macroValue}>{nutrition.macros?.carbs}g</Text></View>
              <View style={[styles.macroBlock, {backgroundColor:'#f7e3e3'}]}><Text style={styles.macroIcon}>🥑</Text><Text style={styles.macroLabel}>Fat</Text><Text style={styles.macroValue}>{nutrition.macros?.fat}g</Text></View>
            </View>
            <Text style={styles.nutriMacroTitle}>Gợi ý:</Text>
            {nutrition.suggestions?.map((sug, idx) => (
              <View key={idx} style={styles.suggestionRow}><Text style={styles.suggestionIcon}>💡</Text><Text style={styles.suggestionText}>{sug}</Text></View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#f8f9fa', borderRadius: 12, padding: 16, marginBottom: 18, elevation: 2 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#1E90FF' },
  calendarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDayBlock: {
    width: '48%',
    minHeight: 180,
    backgroundColor: '#f4f6fa',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
  },
  activeDay: {
    borderColor: '#1E90FF',
    backgroundColor: '#e3f0ff',
  },
  inactiveDay: {
    opacity: 0.6,
    backgroundColor: '#f4f6fa',
  },
  dayTitle: { fontSize: 17, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  subTitleCal: {
    fontWeight: '600',
    marginTop: 4,
    color: '#333',
    fontSize: 15,
  },
  exerciseCal: {
    fontSize: 14,
    marginLeft: 8,
    color: '#444',
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 120,
    maxWidth: 140,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  imgWrap: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 4,
    backgroundColor: '#f0f0f0',
  },
  exerciseImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  exerciseName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1E90FF',
    textAlign: 'center',
  },
  exerciseDetail: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
    textAlign: 'center',
  },
  exerciseGuide: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  totalTimeCal: {
    fontStyle: 'italic',
    color: '#888',
    marginTop: 4,
    marginBottom: 2,
    textAlign: 'right',
  },
  suggestion: { marginLeft: 12, color: '#444' },
  regenBtn: { backgroundColor: '#1E90FF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  regenText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cardOverview: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#1E90FF',
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  overviewRow: {
    flexDirection: 'column',
    gap: 6,
  },
  overviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  overviewIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  overviewValue: {
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  cardNutrition: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nutriBlock: {
    alignItems: 'center',
    backgroundColor: '#f4f6fa',
    borderRadius: 10,
    padding: 8,
    minWidth: 80,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  nutriIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  nutriLabel: {
    fontSize: 13,
    color: '#555',
  },
  nutriValue: {
    fontWeight: 'bold',
    color: '#4CAF50',
    fontSize: 15,
  },
  nutriMacroTitle: {
    fontWeight: '600',
    color: '#333',
    marginTop: 6,
    marginBottom: 2,
    fontSize: 15,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  macroBlock: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
    minWidth: 80,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  macroIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  macroLabel: {
    fontSize: 13,
    color: '#555',
  },
  macroValue: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 15,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    marginLeft: 8,
  },
  suggestionIcon: {
    fontSize: 15,
    marginRight: 4,
    color: '#FF9800',
  },
  suggestionText: {
    fontSize: 14,
    color: '#444',
  },
});

export default ReportScreen;
