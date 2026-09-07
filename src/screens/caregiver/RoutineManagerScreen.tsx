import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { useStore, Routine } from '../../store/useStore';

export default function RoutineManagerScreen() {
  const { routines, addRoutine, deleteRoutine, fetchRoutines } = useStore();
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newIcon, setNewIcon] = useState('');

  useEffect(() => {
    fetchRoutines();
  }, []);

  const handleAddRoutine = () => {
    if (!newTitle || !newTime || !newIcon) {
      Alert.alert('Error', 'Please fill in all fields (Title, Time, Icon Emoji)');
      return;
    }
    addRoutine({ title: newTitle, time: newTime, icon: newIcon });
    setNewTitle('');
    setNewTime('');
    setNewIcon('');
  };

  const renderRoutine = ({ item }: { item: Routine }) => (
    <View style={styles.routineCard}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <View style={styles.routineInfo}>
        <Text style={styles.routineTitle}>{item.title}</Text>
        <Text style={styles.routineTime}>{item.time}</Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteRoutine(item.id)}>
        <Text style={styles.deleteBtnText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.headerTitle}>Manage Routines</Text>
      
      <View style={styles.addCard}>
        <Text style={styles.cardHeader}>Add New Routine</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Routine Title (e.g. Wash Hands)" 
          value={newTitle} 
          onChangeText={setNewTitle} 
        />
        <View style={styles.row}>
          <TextInput 
            style={[styles.input, { flex: 1, marginRight: 10 }]} 
            placeholder="Time (e.g. 10:00 AM)" 
            value={newTime} 
            onChangeText={setNewTime} 
          />
          <TextInput 
            style={[styles.input, { width: 80 }]} 
            placeholder="Emoji 🧼" 
            value={newIcon} 
            onChangeText={setNewIcon} 
          />
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddRoutine}>
          <Text style={styles.addBtnText}>+ Create Routine</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listHeader}>Current Schedule</Text>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={renderRoutine}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', margin: 20, color: '#333' },
  
  addCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  cardHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: {
    backgroundColor: '#F1F3F5',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  row: { flexDirection: 'row' },
  addBtn: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  addBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

  listHeader: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 20, marginBottom: 10 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 50 },
  
  routineCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: { fontSize: 24 },
  routineInfo: { flex: 1 },
  routineTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  routineTime: { fontSize: 14, color: '#666', marginTop: 4 },
  deleteBtn: { padding: 10 },
  deleteBtnText: { fontSize: 20 }
});
