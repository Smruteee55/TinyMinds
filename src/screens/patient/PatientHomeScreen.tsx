import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useStore, Routine } from '../../store/useStore';

export default function PatientHomeScreen() {
  const { setRole, routines, toggleRoutine } = useStore();

  const renderRoutine = ({ item }: { item: Routine }) => (
    <TouchableOpacity 
      style={[styles.routineCard, item.completed && styles.routineCardCompleted]} 
      onPress={() => toggleRoutine(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <View style={styles.routineInfo}>
        <Text style={[styles.routineTitle, item.completed && styles.routineTitleCompleted]}>
          {item.title}
        </Text>
        <Text style={styles.routineTime}>{item.time}</Text>
      </View>
      <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning, Leo!</Text>
        <TouchableOpacity onPress={() => setRole(null)}>
          <Text style={styles.switchRole}>🔄 Switch Role</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={renderRoutine}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.sosButton}>
        <Text style={styles.sosText}>🚨 SOS - CALL FOR HELP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#E8F5E9' }, // Soft green pastel background
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20,
    paddingTop: 40,
  },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#2E7D32' },
  switchRole: { fontSize: 14, color: '#555' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  routineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  routineCardCompleted: {
    backgroundColor: '#F1F8E9',
    opacity: 0.8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#E8F5E9',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: { fontSize: 30 },
  routineInfo: { flex: 1 },
  routineTitle: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 4 },
  routineTitleCompleted: { textDecorationLine: 'line-through', color: '#888' },
  routineTime: { fontSize: 16, color: '#666' },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#66BB6A',
    borderColor: '#66BB6A',
  },
  checkmark: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  sosButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#EF5350',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  sosText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
