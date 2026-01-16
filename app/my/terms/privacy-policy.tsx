import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '@/components/common/Header'
import {Privacy} from '@/entities/terms'
import {color_token} from '@/constants/theme'
import {size} from '@/shared'

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
    backgroundColor: color_token.white,
  },
  content: {
    flex: 1,
    padding: size(16),
  },
})

export default PrivacyPolicyScreen
