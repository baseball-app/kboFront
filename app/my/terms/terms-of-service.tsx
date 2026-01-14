import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '@/components/common/Header'
import {Service} from '@/entities/terms'
import {color_token} from '@/constants/theme'

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
    backgroundColor: color_token.white,
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
