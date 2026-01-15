import React, {useCallback, useMemo} from 'react'
import {View, StyleSheet} from 'react-native'
import {useNotBallparkWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat'
import {TeamStatsCard} from '@/entities/stat/ui'
import {StatsList} from './StatsList'
import {useNavigateToStatsDetail} from '@/features/stats'

const MyHomeStatsCardList = () => {
  const {selectedStatsFilter, sortDataByWinRate} = useSelectedStatsFilter()
  const year = selectedStatsFilter?.year ?? 2025
  const {data, isLoading, isError} = useNotBallparkWinPercentByYear({year})

  const {navigateToMyHomeStatsDetail} = useNavigateToStatsDetail()

  const sortedData = useMemo(() => {
    if (!data?.my_home_win_stat) return []
    return sortDataByWinRate([...data.my_home_win_stat])
  }, [data, sortDataByWinRate])

  const renderItem = useCallback(({item}: {item: (typeof sortedData)[0]}) => {
    return (
      <TeamStatsCard
        onPress={() => navigateToMyHomeStatsDetail(item.team_id)}
        key={item.team_id}
        teamName={item.team_nm}
        matchResult={{
          win: item.wins,
          draw: item.draws,
          lose: item.losses,
        }}
      />
    )
  }, [])

  return (
    <StatsList
      data={sortedData}
      isLoading={isLoading}
      isError={isError} //
      renderItem={renderItem}
    />
  )
}

export {MyHomeStatsCardList}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
})
