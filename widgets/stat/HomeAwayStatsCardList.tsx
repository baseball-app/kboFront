import React, {useMemo} from 'react'
import {View, StyleSheet} from 'react-native'
import {useHomeAwayWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat'
import {HomeAwayStatsCard} from '@/entities/stat/ui'
import {LoadingStatsList} from './LoadingStatsList'
import {EmptyStatsList} from './EmptyStatsList'

const HomeAwayStatsCardList = () => {
  const {selectedStatsFilter} = useSelectedStatsFilter()
  const year = selectedStatsFilter?.year ?? 2025
  const {data, isLoading, isError} = useHomeAwayWinPercentByYear({year})

  const sortedData = useMemo(() => {
    if (!data?.home_away_win_stat) return []

    const sorted = [...data.home_away_win_stat]
    const isAscending = selectedStatsFilter?.sort === '승률 높은순'

    return sorted.sort((a, b) => {
      if (isAscending) {
        return b.win_percent - a.win_percent
      }
      return a.win_percent - b.win_percent
    })
  }, [data, selectedStatsFilter?.sort])

  if (isError || isLoading) {
    return <LoadingStatsList />
  }

  if (!sortedData.length) {
    return <EmptyStatsList />
  }

  return (
    <View style={styles.container}>
      {sortedData.map(stat => (
        <HomeAwayStatsCard
          key={`${stat.home_away}-${stat.is_cheer}`}
          title={stat.home_away === 'home' ? '홈' : '원정'}
          matchResult={{
            win: stat.wins,
            draw: stat.draws,
            lose: stat.losses,
          }}
        />
      ))}
    </View>
  )
}

export {HomeAwayStatsCardList}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
})
