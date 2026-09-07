import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function EmotionARScreen() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [emotion, setEmotion] = useState('Scanning...');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      // Mocking an AI model analyzing the camera feed
      const emotions = ['😄 Happy', '😢 Sad', '😠 Angry', '😲 Surprised', '😐 Neutral'];
      interval = setInterval(() => {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setEmotion(randomEmotion);
      }, 2000);
    } else {
      setEmotion('Point camera at a face and press Scan');
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <SafeAreaView style={styles.overlay}>
          
          <View style={styles.header}>
            <Text style={styles.title}>AI Emotion Explorer 🤖</Text>
            <Text style={styles.subtitle}>Learn to recognize feelings!</Text>
          </View>

          {/* Simulated Face Bounding Box */}
          {isScanning && (
            <View style={styles.boundingBox}>
              <View style={styles.emotionTag}>
                <Text style={styles.emotionText}>{emotion}</Text>
              </View>
            </View>
          )}

          <View style={styles.controls}>
            <TouchableOpacity style={styles.actionBtn} onPress={toggleCameraFacing}>
              <Text style={styles.actionBtnText}>🔄 Flip Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.scanBtn, isScanning ? styles.scanBtnActive : null]} 
              onPress={() => setIsScanning(!isScanning)}
            >
              <Text style={styles.scanBtnText}>{isScanning ? '🛑 Stop Scanning' : '🔍 Start AI Scan'}</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 16, color: '#E0E0E0', marginTop: 5 },
  
  boundingBox: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: '60%',
    height: '40%',
    borderWidth: 4,
    borderColor: '#4CAF50',
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emotionTag: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: -20,
  },
  emotionText: { color: 'white', fontWeight: 'bold', fontSize: 18 },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center'
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  
  actionBtn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    borderRadius: 30,
    flex: 1,
    marginRight: 10,
    alignItems: 'center'
  },
  actionBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  scanBtn: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 30,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center'
  },
  scanBtnActive: { backgroundColor: '#EF5350' },
  scanBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
