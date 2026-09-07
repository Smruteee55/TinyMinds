import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useStore } from '../store/useStore';

export default function OnboardingScreen() {
  const setRole = useStore((state) => state.setRole);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to TinyMind</Text>
      <Text style={styles.subtitle}>Who is using this device?</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.patientButton]} onPress={() => setRole('patient')}>
          <Text style={styles.buttonText}>I am the Child</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.caregiverButton]} onPress={() => setRole('caregiver')}>
          <Text style={styles.buttonText}>I am the Caregiver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F8FF' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 18, marginBottom: 40, color: '#666' },
  buttonContainer: { width: '100%', paddingHorizontal: 20 },
  button: { padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  patientButton: { backgroundColor: '#87CEFA' },
  caregiverButton: { backgroundColor: '#4682B4' },
  buttonText: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
});
