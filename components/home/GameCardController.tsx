import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const GameCardController = () => {
  return (
    <View style={styles.tabMenu}>
      <Text style={styles.todayText}>오늘의 야구</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    lineHeight: 22.4,
  },
  dayText: {
    fontSize: 12,
    color: '#95938B',
    fontWeight: '600',
  },
  arrowImgBox: {
    height: 20,
    width: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default GameCardController
