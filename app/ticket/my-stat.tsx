import Input from '@/components/common/Input'
import MyStat from '@/components/ticket/MyStat'
import StatBox from '@/components/ticket/StatBox'
import useMyStat from '@/hooks/stat/useMyStat'
import {router} from 'expo-router'
import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

export default function MyStatScreen() {
  const {data} = useMyStat()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity style={styles.backButton} onPress={router.back}>
          <Image source={require('@/assets/icons/back.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>나의 승요력</Text>
      </View>
      <View style={styles.section}>
        <MyStat percentage={80} />
      </View>
      <View style={styles.row}>
        <StatBox
          title="직관"
          value={data?.winSitePercent}
          win={data.winRateCalculation.win_count}
          draw={data.winRateCalculation.draw_count}
          lose={data.winRateCalculation.loss_count}
        />
        <StatBox
          title="집관"
          value={data?.winHomePercent}
          win={data.winRateCalculation.win_count}
          draw={data.winRateCalculation.draw_count}
          lose={data.winRateCalculation.loss_count}
        />
      </View>
      <View style={styles.summaryContainer}>
        <Input label="최다 관람구장" editable value={data?.mostWatchStadium} />
        <Input label="나의 승요 요일" editable value={data?.weekdayMostWin} />
        <Input label="나의 최다 연승" editable value={data?.longestWinningStreak} />
        <Input label="최다 승리 구단" editable value={data?.mostWinTeam} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcf3',
  },
  headerBox: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 25.2,
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    left: 24,
  },
  section: {
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 28,
  },
  summaryContainer: {
    gap: 40,
    paddingHorizontal: 24,
    marginTop: 48,
  },
  backImage: {
    width: 16,
    height: 28,
  },
})
