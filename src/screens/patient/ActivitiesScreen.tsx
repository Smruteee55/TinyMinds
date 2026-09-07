import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, TouchableOpacity } from 'react-native';

export default function ActivitiesScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isBreathing, setIsBreathing] = useState(false);
  const [instruction, setInstruction] = useState('Tap to Start');

  useEffect(() => {
    if (!isBreathing) {
      scaleAnim.stopAnimation();
      setInstruction('Tap to Start');
      return;
    }

    const breatheIn = Animated.timing(scaleAnim, {
      toValue: 2,
      duration: 4000, // 4 seconds breathe in
      useNativeDriver: true,
    });

    const breatheOut = Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 4000, // 4 seconds breathe out
      useNativeDriver: true,
    });

    const sequence = Animated.sequence([
      Animated.delay(500),
      breatheIn,
      Animated.delay(500),
      breatheOut,
    ]);

    const loop = Animated.loop(sequence);
    
    // Sync text with animation
    let isMounted = true;
    const updateInstruction = () => {
      if (!isMounted || !isBreathing) return;
      setInstruction('Breathe In...');
      setTimeout(() => {
        if (!isMounted || !isBreathing) return;
        setInstruction('Breathe Out...');
      }, 4500);
    };

    updateInstruction();
    const interval = setInterval(updateInstruction, 9000);
    
    loop.start();

    return () => {
      isMounted = false;
      clearInterval(interval);
      loop.stop();
    };
  }, [isBreathing]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Calming Activities</Text>
      <Text style={styles.subtitle}>Sensory Breathing Exercise</Text>

      <View style={styles.animationContainer}>
        <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]} />
        <Text style={styles.instructionText}>{instruction}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, isBreathing ? styles.buttonStop : styles.buttonStart]} 
        onPress={() => setIsBreathing(!isBreathing)}
      >
        <Text style={styles.buttonText}>{isBreathing ? '🛑 Stop' : '▶️ Start Calming'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#E3F2FD', alignItems: 'center' }, // Soft blue
  title: { fontSize: 28, fontWeight: 'bold', color: '#1565C0', marginTop: 40 },
  subtitle: { fontSize: 18, color: '#555', marginTop: 10, marginBottom: 50 },
  
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#90CAF9',
    opacity: 0.6,
    position: 'absolute',
  },
  instructionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    zIndex: 10, // Keep above the circle
  },

  button: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonStart: { backgroundColor: '#4CAF50' },
  buttonStop: { backgroundColor: '#EF5350' },
  buttonText: { color: 'white', fontSize: 20, fontWeight: 'bold' }
});
