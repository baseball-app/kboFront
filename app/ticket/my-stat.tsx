import Header from '@/components/common/Header'
import {MyStatWidget} from '@/widgets'
import React from 'react'
import {StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

export default function MyStatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="나의 승요력" variants="transparent" />
      <MyStatWidget />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
})
