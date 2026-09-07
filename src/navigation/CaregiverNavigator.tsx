import React from 'react';
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
