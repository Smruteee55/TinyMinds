import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import * as Speech from 'expo-speech';

// Pre-defined vocabulary for the AAC board
const VOCABULARY = [
  { id: '1', word: 'I want', icon: '🤲', color: '#FFF9C4' }, // Yellow (Pronouns/Verbs)
  { id: '2', word: 'I feel', icon: '🙂', color: '#FFF9C4' },
  { id: '3', word: 'Help', icon: '🆘', color: '#FFCDD2' }, // Red (Important/Emergency)
  { id: '4', word: 'Stop', icon: '🛑', color: '#FFCDD2' },
  { id: '5', word: 'Yes', icon: '✅', color: '#C8E6C9' }, // Green (Positive)
  { id: '6', word: 'No', icon: '❌', color: '#FFCDD2' },
  { id: '7', word: 'Eat', icon: '🍽️', color: '#B3E5FC' }, // Blue (Actions/Nouns)
  { id: '8', word: 'Drink', icon: '🥤', color: '#B3E5FC' },
  { id: '9', word: 'Play', icon: '🧸', color: '#B3E5FC' },
  { id: '10', word: 'Toilet', icon: '🚽', color: '#E1BEE7' }, // Purple (Places/Things)
  { id: '11', word: 'Happy', icon: '😄', color: '#FFE082' },
  { id: '12', word: 'Sad', icon: '😢', color: '#90CAF9' },
];

export default function AACBoardScreen() {
  const [sentence, setSentence] = useState<string[]>([]);

  const handleWordPress = (word: string) => {
    // Speak immediately for feedback
    Speech.speak(word, { rate: 0.9, pitch: 1.2 }); 
    setSentence([...sentence, word]);
  };

  const speakSentence = () => {
    if (sentence.length > 0) {
      const fullSentence = sentence.join(' ');
      Speech.speak(fullSentence, { rate: 0.85, pitch: 1.1 });
    }
  };

  const clearSentence = () => {
    setSentence([]);
  };

  const renderItem = ({ item }: { item: typeof VOCABULARY[0] }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: item.color }]} 
      onPress={() => handleWordPress(item.word)}
      activeOpacity={0.7}
    >
      <Text style={styles.cardIcon}>{item.icon}</Text>
      <Text style={styles.cardText}>{item.word}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Sentence Strip Area */}
      <View style={styles.sentenceStripContainer}>
        <View style={styles.sentenceStrip}>
          <Text style={styles.sentenceText}>
            {sentence.length > 0 ? sentence.join(' ') : 'Tap words to build a sentence...'}
          </Text>
        </View>
        <View style={styles.stripActions}>
          <TouchableOpacity style={[styles.actionBtn, styles.clearBtn]} onPress={clearSentence}>
            <Text style={styles.actionBtnText}>🗑️ Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.speakBtn]} onPress={speakSentence}>
            <Text style={styles.actionBtnText}>🔊 Speak</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Vocabulary Grid */}
      <FlatList
        data={VOCABULARY}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0F4F8' },
  
  sentenceStripContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#E2E8F0',
    paddingTop: 40,
  },
  sentenceStrip: {
    minHeight: 60,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginBottom: 15,
  },
  sentenceText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#334155',
  },
  stripActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  clearBtn: { backgroundColor: '#FFCDD2' },
  speakBtn: { backgroundColor: '#81C784' },
  actionBtnText: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },

  gridContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 5,
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  }
});
