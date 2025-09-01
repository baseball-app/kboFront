import {StyleSheet} from 'react-native'
import {View} from 'react-native'
import React from 'react'
import {MatchNotification} from '@/feature/match/components'
import {MatchList} from '@/widgets'

const MatchScreen = () => {
  return (
    <View style={styles.container}>
      <MatchNotification />
      <MatchList />
    </View>
  )
}

export default MatchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcf3',
  },
})
