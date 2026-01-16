import {create} from 'zustand'
import {SelectedStatsFilterStore, SelectedStatsType} from './type'
import {useCallback} from 'react'

const useSelectedStatsFilterStore = create<SelectedStatsFilterStore>(set => ({
  selectedStatsFilter: {
    year: new Date().getFullYear(),
    season: true,
    type: '상대구단별',
    sort: '승률 높은순',
  },
  onChangeSeasonYear: year => set(state => ({selectedStatsFilter: {...state.selectedStatsFilter!, year: year}})),
  onChangeSeason: (season: boolean) =>
    set(state => ({selectedStatsFilter: {...state.selectedStatsFilter!, season: season}})),
  onChangeType: (type: SelectedStatsType) =>
    set(state => ({selectedStatsFilter: {...state.selectedStatsFilter!, type: type}})),
  onChangeSort: (sort: '승률 높은순' | '승률 낮은순') =>
    set(state => ({selectedStatsFilter: {...state.selectedStatsFilter!, sort: sort}})),
  toggleSort: () =>
    set(state => ({
      selectedStatsFilter: {
        ...state.selectedStatsFilter!,
        sort: state.selectedStatsFilter!.sort === '승률 높은순' ? '승률 낮은순' : '승률 높은순',
      },
    })),
}))

const useSelectedStatsFilter = () => {
  const {selectedStatsFilter, onChangeSeasonYear, onChangeSeason, onChangeType, toggleSort} =
    useSelectedStatsFilterStore()

  const sortDataByWinRate = useCallback<<T extends {win_percent: number}>(data: T[]) => T[]>(
    data => {
      const isAscending = selectedStatsFilter?.sort === '승률 높은순'
      return data.sort((a, b) => (isAscending ? b.win_percent - a.win_percent : a.win_percent - b.win_percent))
    },
    [selectedStatsFilter?.sort],
  )

  return {
    selectedStatsFilter,
    onChangeSeasonYear,
    onChangeSeason,
    onChangeType,
    toggleSort,
    sortDataByWinRate,
  }
}

export {useSelectedStatsFilter}
