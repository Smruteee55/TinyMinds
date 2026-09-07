import React from 'react';
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
