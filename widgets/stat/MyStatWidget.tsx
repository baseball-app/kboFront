import Input from '@/components/common/Input'
import {MyStat, StatBox, useMyStat} from '@/entities/stat'
import useProfile from '@/hooks/my/useProfile'
import {size} from '@/shared'
import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'

function MyStatWidget() {
  const {data} = useMyStat()
  const {profile} = useProfile()

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
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
  )
}

export {MyStatWidget}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  section: {
    marginTop: size(40),
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: size(15),
    width: '100%',
    paddingHorizontal: size(24),
    marginTop: size(28),
  },
  summaryContainer: {
    gap: size(24),
    paddingHorizontal: size(24),
    marginTop: size(40),
    marginBottom: size(40),
  },
})
