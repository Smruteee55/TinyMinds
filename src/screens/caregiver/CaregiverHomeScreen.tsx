import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useStore } from '../../store/useStore';

export default function CaregiverHomeScreen() {
  const setRole = useStore((state) => state.setRole);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Caregiver Dashboard</Text>
      <Text onPress={() => setRole(null)} style={styles.logout}>Log out (Switch Role)</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' },
  title: { fontSize: 28, fontWeight: 'bold' },
  logout: { marginTop: 20, color: 'blue', fontSize: 16 }
});
