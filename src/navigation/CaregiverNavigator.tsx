import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CaregiverHomeScreen from '../screens/caregiver/CaregiverHomeScreen';
import RoutineManagerScreen from '../screens/caregiver/RoutineManagerScreen';

const Tab = createBottomTabNavigator();

export default function CaregiverNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' } }}>
      <Tab.Screen name="Dashboard" component={CaregiverHomeScreen} options={{ tabBarIcon: () => '📊' }} />
      <Tab.Screen name="Routines" component={RoutineManagerScreen} options={{ tabBarIcon: () => '🗓️' }} />
    </Tab.Navigator>
  );
}
