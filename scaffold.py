import os

folders = [
    "src/store",
    "src/navigation",
    "src/screens/patient",
    "src/screens/caregiver",
    "src/components"
]

for folder in folders:
    os.makedirs(folder, exist_ok=True)

with open("src/store/useStore.ts", "w") as f:
    f.write("""import { create } from 'zustand';

interface AppState {
  role: 'patient' | 'caregiver' | null;
  setRole: (role: 'patient' | 'caregiver' | null) => void;
}

export const useStore = create<AppState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
""")

with open("src/screens/OnboardingScreen.tsx", "w") as f:
    f.write("""import React from 'react';
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
""")

with open("src/screens/patient/PatientHomeScreen.tsx", "w") as f:
    f.write("""import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useStore } from '../../store/useStore';

export default function PatientHomeScreen() {
  const setRole = useStore((state) => state.setRole);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Patient Home</Text>
      <Text onPress={() => setRole(null)} style={styles.logout}>Log out (Switch Role)</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0FFEA' },
  title: { fontSize: 28, fontWeight: 'bold' },
  logout: { marginTop: 20, color: 'blue', fontSize: 16 }
});
""")

with open("src/screens/caregiver/CaregiverHomeScreen.tsx", "w") as f:
    f.write("""import React from 'react';
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
""")

with open("src/navigation/PatientNavigator.tsx", "w") as f:
    f.write("""import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientHomeScreen from '../screens/patient/PatientHomeScreen';

const Tab = createBottomTabNavigator();

export default function PatientNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Schedule" component={PatientHomeScreen} />
    </Tab.Navigator>
  );
}
""")

with open("src/navigation/CaregiverNavigator.tsx", "w") as f:
    f.write("""import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CaregiverHomeScreen from '../screens/caregiver/CaregiverHomeScreen';

const Tab = createBottomTabNavigator();

export default function CaregiverNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={CaregiverHomeScreen} />
    </Tab.Navigator>
  );
}
""")

with open("src/navigation/AppNavigator.tsx", "w") as f:
    f.write("""import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import OnboardingScreen from '../screens/OnboardingScreen';
import PatientNavigator from './PatientNavigator';
import CaregiverNavigator from './CaregiverNavigator';

export default function AppNavigator() {
  const role = useStore((state) => state.role);

  return (
    <NavigationContainer>
      {!role ? (
        <OnboardingScreen />
      ) : role === 'patient' ? (
        <PatientNavigator />
      ) : (
        <CaregiverNavigator />
      )}
    </NavigationContainer>
  );
}
""")
