import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientHomeScreen from '../screens/patient/PatientHomeScreen';
import AACBoardScreen from '../screens/patient/AACBoardScreen';
import ActivitiesScreen from '../screens/patient/ActivitiesScreen';
import EmotionARScreen from '../screens/patient/EmotionARScreen';

const Tab = createBottomTabNavigator();

export default function PatientNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 11, fontWeight: 'bold' } }}>
      <Tab.Screen name="Schedule" component={PatientHomeScreen} options={{ tabBarIcon: () => '📅' }} />
      <Tab.Screen name="Speak" component={AACBoardScreen} options={{ tabBarIcon: () => '🗣️' }} />
      <Tab.Screen name="Activities" component={ActivitiesScreen} options={{ tabBarIcon: () => '🎮' }} />
      <Tab.Screen name="Emotions AR" component={EmotionARScreen} options={{ tabBarIcon: () => '🤖' }} />
    </Tab.Navigator>
  );
}
