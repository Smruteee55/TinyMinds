import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useStore } from '../../store/useStore';

export default function CaregiverHomeScreen() {
  const { setRole, routines } = useStore();
  
  const completedRoutines = routines.filter(r => r.completed).length;
  const totalRoutines = routines.length;
  const progressPercent = Math.round((completedRoutines / totalRoutines) * 100) || 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back, Caregiver!</Text>
            <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
          </View>
          <TouchableOpacity onPress={() => setRole(null)}>
            <Text style={styles.switchRole}>🔄 Switch Role</Text>
          </TouchableOpacity>
        </View>

        {/* Overview Card */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Progress</Text>
          <Text style={styles.cardSubtitle}>Leo's Mood & Routine Completion</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{progressPercent}%</Text>
              <Text style={styles.statLabel}>Completion</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{completedRoutines}/{totalRoutines}</Text>
              <Text style={styles.statLabel}>Routines Done</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>8.4</Text>
              <Text style={styles.statLabel}>Avg Mood</Text>
            </View>
          </View>
          
          {/* A simple mock progress bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Emergency Contacts */}
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
            <Text style={styles.contactIcon}>🩺</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactName}>Dr. Alisha Reed</Text>
              <Text style={styles.contactRole}>Pediatrician</Text>
            </View>
            <TouchableOpacity style={styles.callButton}><Text style={styles.callIcon}>📞</Text></TouchableOpacity>
          </View>
          <View style={styles.contactDivider} />
          <View style={styles.contactRow}>
            <Text style={styles.contactIcon}>👩</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactName}>Mom (Grace)</Text>
              <Text style={styles.contactRole}>Primary Caregiver</Text>
            </View>
            <TouchableOpacity style={styles.callButton}><Text style={styles.callIcon}>📞</Text></TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#1976D2' }]}>
            <Text style={styles.actionBtnText}>+ Add Routine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#7B1FA2' }]}>
            <Text style={styles.actionBtnText}>+ Log Behavior</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#00796B' }]}>
            <Text style={styles.actionBtnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F57C00' }]}>
            <Text style={styles.actionBtnText}>View Reports</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30, marginTop: 20 },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  dateText: { fontSize: 14, color: '#666', marginTop: 4 },
  switchRole: { color: '#007AFF', fontSize: 14, fontWeight: '600' },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12, marginTop: 10 },
  
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 4, marginBottom: 20 },
  
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#1976D2' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 4 },
  
  progressBarContainer: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 4 },
  
  contactCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, marginBottom: 25 },
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  contactDivider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 5 },
  contactIcon: { fontSize: 24, marginRight: 15 },
  contactName: { fontSize: 16, fontWeight: '600', color: '#333' },
  contactRole: { fontSize: 13, color: '#888', marginTop: 2 },
  callButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  callIcon: { fontSize: 18 },
  
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionBtn: { width: '48%', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  actionBtnText: { color: '#FFF', fontSize: 15, fontWeight: '600' }
});
