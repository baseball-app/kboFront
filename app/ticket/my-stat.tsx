import Header from '@/components/common/Header'
import Input from '@/components/common/Input'
import MyStat from '@/components/ticket/MyStat'
import StatBox from '@/components/ticket/StatBox'
import useProfile from '@/hooks/my/useProfile'
import useMyStat from '@/hooks/stat/useMyStat'
import {router} from 'expo-router'
import React from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

export default function MyStatScreen() {
  const {data} = useMyStat()
  const {profile} = useProfile()

  return (
    <SafeAreaView style={styles.container}>
      <Header title="나의 승요력" variants="transparent" />
      <ScrollView>
        <View style={styles.section}>
          <MyStat percentage={profile?.predict_ratio || 0} />
        </View>
        <View style={styles.row}>
          <StatBox
            title="직관"
            value={data?.winSitePercent}
            win={data.ballparkWinRateCalculation.win_count}
            draw={data.ballparkWinRateCalculation.draw_count}
            lose={data.ballparkWinRateCalculation.loss_count}
          />
          <StatBox
            title="집관"
            value={data?.winHomePercent}
            win={data.notBallparkWinRateCalculation.win_count}
            draw={data.notBallparkWinRateCalculation.draw_count}
            lose={data.notBallparkWinRateCalculation.loss_count}
          />
        </View>
        <View style={styles.summaryContainer}>
          <Input label="최다 관람구장" editable={false} value={data?.mostWatchStadium} />
          <Input label="나의 승요 요일" editable={false} value={data?.weekdayMostWin} />
          <Input label="나의 최다 연승" editable={false} value={data?.longestWinningStreak} />
          <Input label="최다 승리 구단" editable={false} value={data?.mostWinTeam} />
        </View>
      </ScrollView>
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
    gap: 24,
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 40,
  },
  backImage: {
    width: 16,
    height: 28,
  },
})
