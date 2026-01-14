import React, {useMemo} from 'react'
import {View, StyleSheet} from 'react-native'
import {useBallparkWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat'
import {StadiumStatsCard} from '@/entities/stat/ui'

const StadiumStatsCardList = () => {
  const {selectedStatsFilter} = useSelectedStatsFilter()
  const year = selectedStatsFilter?.year ?? 2025
  const {data, isLoading, isError} = useBallparkWinPercentByYear({year})

  const sortedData = useMemo(() => {
    if (!data?.by_user_ballpark_win_stat) return []

    const sorted = [...data.by_user_ballpark_win_stat]
    const isAscending = selectedStatsFilter?.sort === '승률 높은순'

    return sorted.sort((a, b) => {
      if (isAscending) {
        return b.win_percent - a.win_percent
      }
      return a.win_percent - b.win_percent
    })
  }, [data, selectedStatsFilter?.sort])

  if (isLoading || isError || !sortedData.length) {
    return null
  }

  return (
    <View style={styles.container}>
      {sortedData.map(stat => (
        <StadiumStatsCard
          key={stat.ballpark_id}
          stadiumName={stat.ballpark_nm}
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

export {StadiumStatsCardList}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
})
