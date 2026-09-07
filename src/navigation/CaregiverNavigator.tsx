import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CaregiverHomeScreen from '../screens/caregiver/CaregiverHomeScreen';
import RoutineManagerScreen from '../screens/caregiver/RoutineManagerScreen';
import InsightsScreen from '../screens/caregiver/InsightsScreen';
import CommunityScreen from '../screens/caregiver/CommunityScreen';

const Tab = createBottomTabNavigator();

export default function CaregiverNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 11, fontWeight: 'bold' } }}>
      <Tab.Screen name="Dashboard" component={CaregiverHomeScreen} options={{ tabBarIcon: () => '📊' }} />
      <Tab.Screen name="Routines" component={RoutineManagerScreen} options={{ tabBarIcon: () => '🗓️' }} />
      <Tab.Screen name="Insights" component={InsightsScreen} options={{ tabBarIcon: () => '📈' }} />
      <Tab.Screen name="Community" component={CommunityScreen} options={{ tabBarIcon: () => '🫂' }} />
    </Tab.Navigator>
  );
}
