import React from 'react';
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
