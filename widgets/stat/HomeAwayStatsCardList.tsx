import React, {useCallback, useMemo} from 'react'
import {useHomeAwayWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat'
import {HomeAwayStatsCard} from '@/entities/stat/ui'
import {StatsList} from './StatsList'
import {useNavigateToStatsDetail} from '@/features/stats'

const HomeAwayStatsCardList = () => {
  const {selectedStatsFilter, sortDataByWinRate} = useSelectedStatsFilter()
  const year = selectedStatsFilter?.year ?? 2025
  const {data, isLoading, isError} = useHomeAwayWinPercentByYear({year})

  const {navigateToAwayStatsDetail, navigateToHomeStatsDetail} = useNavigateToStatsDetail()

  const sortedData = useMemo(() => {
    if (!data?.home_away_win_stat) return []
    return sortDataByWinRate([...data.home_away_win_stat])
  }, [data, selectedStatsFilter?.sort])

  const renderItem = useCallback(({item}: {item: (typeof sortedData)[0]}) => {
    return (
      <HomeAwayStatsCard
        onPress={() => (item.home_away === 'home' ? navigateToHomeStatsDetail() : navigateToAwayStatsDetail())}
        key={`${item.home_away}-${item.is_cheer}`}
        title={item.home_away === 'home' ? '홈' : '원정'}
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

export {HomeAwayStatsCardList}
