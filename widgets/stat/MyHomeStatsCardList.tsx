import React, {useMemo} from 'react'
import {View, StyleSheet} from 'react-native'
import {useNotBallparkWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat'
import {TeamStatsCard} from '@/entities/stat/ui'
import {EmptyStatsList} from './EmptyStatsList'
import {LoadingStatsList} from './LoadingStatsList'

const MyHomeStatsCardList = () => {
  const {selectedStatsFilter} = useSelectedStatsFilter()
  const year = selectedStatsFilter?.year ?? 2025
  const {data, isLoading, isError} = useNotBallparkWinPercentByYear({year})

  const sortedData = useMemo(() => {
    if (!data?.my_home_win_stat) return []

    const sorted = [...data.my_home_win_stat]
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
        <TeamStatsCard
          key={stat.team_id}
          teamName={stat.team_nm}
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

export {MyHomeStatsCardList}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
})
