import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientHomeScreen from '../screens/patient/PatientHomeScreen';
import AACBoardScreen from '../screens/patient/AACBoardScreen';

const Tab = createBottomTabNavigator();

export default function PatientNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' } }}>
      <Tab.Screen name="Schedule" component={PatientHomeScreen} options={{ tabBarIcon: () => '📅' }} />
      <Tab.Screen name="Speak (AAC)" component={AACBoardScreen} options={{ tabBarIcon: () => '🗣️' }} />
    </Tab.Navigator>
  );
}
