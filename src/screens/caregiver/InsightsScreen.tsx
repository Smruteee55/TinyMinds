import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

export default function InsightsScreen() {
  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
  };

  const moodData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [7, 8, 6, 9, 8, 10, 9], // Mock mood ratings 1-10
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green
        strokeWidth: 3
      }
    ],
    legend: ['Avg Mood Rating (1-10)']
  };

  const routineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [80, 90, 75, 100, 95, 100, 100], // Mock completion %
      }
    ]
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Insights & Reports 📈</Text>

        {/* Mood Tracking Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Mood Tracking</Text>
          <Text style={styles.chartDesc}>Averaged from daily logs and CAR'S responses.</Text>
          <LineChart
            data={moodData}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chartStyle}
          />
        </View>

        {/* Routine Completion Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Routine Completion (%)</Text>
          <Text style={styles.chartDesc}>Percentage of scheduled routines completed.</Text>
          <BarChart
            data={routineData}
            width={screenWidth - 60}
            height={220}
            yAxisLabel=""
            yAxisSuffix="%"
            chartConfig={{...chartConfig, color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`}}
            style={styles.chartStyle}
          />
        </View>

        {/* Export Button Mock */}
        <View style={[styles.chartCard, { alignItems: 'center', backgroundColor: '#E3F2FD' }]}>
          <Text style={styles.chartTitle}>Therapist Report</Text>
          <Text style={styles.chartDesc}>Generate a PDF summary of the last 30 days to share with Leo's therapist.</Text>
          <View style={styles.exportBtn}>
            <Text style={styles.exportBtnText}>📄 Export PDF Report</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: { padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  
  chartCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  chartTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5 },
  chartDesc: { fontSize: 13, color: '#666', marginBottom: 15 },
  chartStyle: { borderRadius: 12, marginTop: 10 },
  
  exportBtn: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop: 15,
  },
  exportBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
