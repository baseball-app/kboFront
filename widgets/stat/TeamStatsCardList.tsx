import React, {useMemo} from 'react'
import {View, StyleSheet} from 'react-native'
import {useOpponentWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat'
import {TeamStatsCard} from '@/entities/stat/ui'

const TeamStatsCardList = () => {
  const {selectedStatsFilter} = useSelectedStatsFilter()
  const year = selectedStatsFilter?.year ?? 2025
  const {data, isLoading, isError} = useOpponentWinPercentByYear({year})

  const sortedData = useMemo(() => {
    if (!data?.opponent_win_stat) return []

    const sorted = [...data.opponent_win_stat]
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
        <TeamStatsCard
          key={stat.opponent_id}
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

export {TeamStatsCardList}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
})
