import React from 'react'
import {View, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {router} from 'expo-router'
import Privacy from '@/components/term/Privacy'

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {/* 개인정보 처리방침 */}
        <Privacy />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
  },
  header: {
    padding: 16,
    borderBottomColor: '#E0E0E0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  agreeButton: {
    backgroundColor: '#1A73E8',
    padding: 14,
    alignItems: 'center',
    margin: 16,
    borderRadius: 10,
  },
  agreeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default PrivacyPolicyScreen
