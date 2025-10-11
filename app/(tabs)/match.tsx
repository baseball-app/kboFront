import {StyleSheet} from 'react-native'
import {View} from 'react-native'
import React from 'react'
import {MatchList} from '@/widgets'
import {MatchNotification} from '@/entities/match'
import {SafeAreaView} from 'react-native-safe-area-context'

const MatchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MatchNotification />
      <MatchList />
    </SafeAreaView>
  )
}

export default MatchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcf3',
  },
})
