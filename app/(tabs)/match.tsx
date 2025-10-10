import {StyleSheet} from 'react-native'
import {View} from 'react-native'
import React from 'react'
import {MatchList} from '@/widgets'
import {MatchNotification} from '@/entities/match'

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
