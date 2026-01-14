import {create} from 'zustand'
import {SelectedStatsFilterStore, SelectedStatsType} from './type'

const useSelectedStatsFilterStore = create<SelectedStatsFilterStore>(set => ({
  selectedStatsFilter: {
    year: 2025,
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

  return {
    selectedStatsFilter,
    onChangeSeasonYear,
    onChangeSeason,
    onChangeType,
    toggleSort,
  }
}

export {useSelectedStatsFilter}
