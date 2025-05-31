import React from 'react'
import {ScrollView, StyleSheet, SafeAreaView} from 'react-native'
import Service from '@/components/term/Service'
import Header from '@/components/common/Header'

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header variants="transparent" />
      <ScrollView style={styles.content}>
        {/* 이용약관 */}
        <Service />
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
    flexDirection: 'row',
    alignItems: 'center',
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
