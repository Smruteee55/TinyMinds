import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';

// Standard CARS-15 categories (simplified for UI)
const CARS_QUESTIONS = [
  {
    id: 1,
    category: 'Relating to People',
    options: [
      { score: 1, desc: 'Normal. No evidence of difficulty or abnormality in relating to people.' },
      { score: 2, desc: 'Mildly abnormal. Avoids looking the adult in the eye; may be fussy.' },
      { score: 3, desc: 'Moderately abnormal. Aloof, indifferent. Sometimes must be forced to respond.' },
      { score: 4, desc: 'Severely abnormal. Consistently aloof or unaware of what the adult is doing.' }
    ]
  },
  {
    id: 2,
    category: 'Imitation',
    options: [
      { score: 1, desc: 'Normal. Can imitate sounds, words, and movements appropriately.' },
      { score: 2, desc: 'Mildly abnormal. Imitates simple behaviors most of the time.' },
      { score: 3, desc: 'Moderately abnormal. Imitates only after coaxing or delay.' },
      { score: 4, desc: 'Severely abnormal. Rarely or never imitates sounds or words.' }
    ]
  },
  {
    id: 3,
    category: 'Emotional Response',
    options: [
      { score: 1, desc: 'Normal. Age-appropriate and situation-appropriate emotional responses.' },
      { score: 2, desc: 'Mildly abnormal. Occasionally shows inappropriate type or degree of reaction.' },
      { score: 3, desc: 'Moderately abnormal. Shows definite signs of inappropriate emotional responses.' },
      { score: 4, desc: 'Severely abnormal. Responses are seldom appropriate to the situation.' }
    ]
  },
  {
    id: 4,
    category: 'Body Use',
    options: [
      { score: 1, desc: 'Normal. Moves with the same ease and agility as a child of the same age.' },
      { score: 2, desc: 'Mildly abnormal. Some minor peculiarities (e.g., clumsiness or repetitive movements).' },
      { score: 3, desc: 'Moderately abnormal. Behaviors that are clearly strange or unusual for age.' },
      { score: 4, desc: 'Severely abnormal. Intense or frequent unusual movements (e.g., spinning, rocking).' }
    ]
  }
];

export default function CARSTestScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectOption = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (!answers[CARS_QUESTIONS[currentQuestionIndex].id]) {
      Alert.alert('Selection Required', 'Please select an option before proceeding.');
      return;
    }
    
    if (currentQuestionIndex < CARS_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetTest = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    let diagnosis = '';
    
    // Simplistic representation of the 15-to-60 CARS scale mapped down to our 4 questions (4-16 scale)
    if (totalScore <= 6) diagnosis = 'Minimal to no symptoms of autism.';
    else if (totalScore <= 10) diagnosis = 'Mild-to-moderate autism symptoms.';
    else diagnosis = 'Severe autism symptoms.';

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultHeader}>C.A.R.S Test Complete</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{totalScore}</Text>
            <Text style={styles.scoreMax}>/ 16</Text>
          </View>
          <Text style={styles.diagnosisText}>{diagnosis}</Text>
          <Text style={styles.disclaimerText}>
            *This is an AI-powered estimation based on your responses. It is not a formal medical diagnosis. Please share these results with your therapist via the Community portal.
          </Text>
          
          <TouchableOpacity style={styles.primaryButton} onPress={resetTest}>
            <Text style={styles.primaryButtonText}>Retake Assessment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQ = CARS_QUESTIONS[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>C.A.R.S Assessment</Text>
        <Text style={styles.progressText}>Question {currentQuestionIndex + 1} of {CARS_QUESTIONS.length}</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${((currentQuestionIndex + 1) / CARS_QUESTIONS.length) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.questionCategory}>{currentQ.category}</Text>
        <Text style={styles.questionPrompt}>How would you rate the child's behavior in this category over the past week?</Text>

        {currentQ.options.map((option, index) => {
          const isSelected = answers[currentQ.id] === option.score;
          return (
            <TouchableOpacity 
              key={index} 
              style={[styles.optionCard, isSelected && styles.optionCardSelected]}
              onPress={() => handleSelectOption(currentQ.id, option.score)}
            >
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {option.desc}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>
            {currentQuestionIndex === CARS_QUESTIONS.length - 1 ? 'Finish Assessment' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  progressText: { fontSize: 14, color: '#666', fontWeight: 'bold' },
  
  progressBarBg: { height: 6, backgroundColor: '#E0E0E0', width: '100%' },
  progressBarFill: { height: '100%', backgroundColor: '#1976D2' },

  scrollContent: { padding: 20, paddingBottom: 100 },
  questionCategory: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 10 },
  questionPrompt: { fontSize: 16, color: '#666', marginBottom: 30, lineHeight: 22 },

  optionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  optionCardSelected: { borderColor: '#1976D2', backgroundColor: '#F0F8FF' },
  
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#CCC', marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  radioSelected: { borderColor: '#1976D2' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#1976D2' },
  
  optionText: { flex: 1, fontSize: 15, color: '#444', lineHeight: 22 },
  optionTextSelected: { color: '#0D47A1', fontWeight: '600' },

  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE' },
  primaryButton: { backgroundColor: '#1976D2', padding: 18, borderRadius: 30, alignItems: 'center' },
  primaryButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  resultHeader: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 30 },
  scoreCircle: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 4, borderColor: '#1976D2' },
  scoreText: { fontSize: 48, fontWeight: 'bold', color: '#1976D2' },
  scoreMax: { fontSize: 18, color: '#666', marginTop: -5 },
  diagnosisText: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'center', marginBottom: 20 },
  disclaimerText: { fontSize: 14, color: '#888', textAlign: 'center', fontStyle: 'italic', marginBottom: 40, lineHeight: 20 },
});
