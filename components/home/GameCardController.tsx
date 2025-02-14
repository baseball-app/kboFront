import {useGameContext} from '@/hooks/game/useGame'
import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

const GameCardController = () => {
  const gameContext = useGameContext()

  return (
    <View style={styles.tabMenu}>
      <TouchableOpacity style={styles.tabMenuButton} onPress={gameContext?.moveToYesterday}>
        <View style={styles.arrowImgBox}>
          <Image source={require('@/assets/icons/left-arrow.png')} resizeMode="contain" />
        </View>
        <Text style={styles.dayText}>어제의 야구</Text>
      </TouchableOpacity>
      <Text style={styles.todayText}>오늘의 야구</Text>
      <TouchableOpacity style={styles.tabMenuButton} onPress={gameContext?.moveToYesterday}>
        <Text style={styles.dayText}>내일의 야구</Text>
        <View style={styles.arrowImgBox}>
          <Image source={require('@/assets/icons/right-arrow.png')} resizeMode="contain" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
