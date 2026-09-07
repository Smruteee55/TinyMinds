import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Community & Learning 🫂</Text>
        
        {/* Parent-Therapist Portal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Therapist Portal</Text>
          <Text style={styles.cardDesc}>Direct messaging with registered professionals.</Text>
          <TouchableOpacity style={styles.chatBox}>
            <Text style={styles.chatIcon}>💬</Text>
            <View>
              <Text style={styles.chatName}>Dr. Alisha Reed</Text>
              <Text style={styles.chatStatus}>Online - Tap to Chat</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Enhanced Awareness & FAQ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Awareness & Guidelines</Text>
          <Text style={styles.cardDesc}>Personalized learning paths and expert videos.</Text>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]}>
            <Text style={styles.actionBtnText}>▶️ Watch: Coping with Sensory Overload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FF9800' }]}>
            <Text style={styles.actionBtnText}>❓ Open Interactive AI FAQ</Text>
          </TouchableOpacity>
        </View>

        {/* Peer Support Groups */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Peer Support Groups</Text>
          <Text style={styles.cardDesc}>Moderated community forums for caregivers.</Text>
          <View style={styles.forumItem}>
            <Text style={styles.forumTopic}>Navigating picky eating phases...</Text>
            <Text style={styles.forumReplies}>12 replies</Text>
          </View>
          <View style={styles.forumItem}>
            <Text style={styles.forumTopic}>Best noise-cancelling headphones?</Text>
            <Text style={styles.forumReplies}>34 replies</Text>
          </View>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#1976D2' }]}>
            <Text style={styles.actionBtnText}>Browse All Forums</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: { padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5 },
  cardDesc: { fontSize: 13, color: '#666', marginBottom: 15 },
  
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 12,
  },
  chatIcon: { fontSize: 24, marginRight: 15 },
  chatName: { fontSize: 16, fontWeight: 'bold', color: '#1976D2' },
  chatStatus: { fontSize: 13, color: '#1565C0', marginTop: 2 },

  actionBtn: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 },

  forumItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginBottom: 10,
  },
  forumTopic: { fontSize: 15, fontWeight: '600', color: '#333' },
  forumReplies: { fontSize: 12, color: '#888', marginTop: 4 },
});
