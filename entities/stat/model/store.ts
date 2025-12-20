import {create} from 'zustand'
import {SelectedStatsFilterStore, SelectedStatsType} from './type'

const useSelectedStatsFilterStore = create<SelectedStatsFilterStore>(set => ({
  selectedStatsFilter: {
    year: 2025,
    season: true,
    type: '상대구단별',
  },
  onChangeSeasonYear: year => set(state => ({selectedStatsFilter: {...state.selectedStatsFilter!, year: year}})),
  onChangeSeason: (season: boolean) =>
    set(state => ({selectedStatsFilter: {...state.selectedStatsFilter!, season: season}})),
  onChangeType: (type: SelectedStatsType) =>
    set(state => ({selectedStatsFilter: {...state.selectedStatsFilter!, type: type}})),
}))

const useSelectedStatsFilter = () => {
  const {selectedStatsFilter, onChangeSeasonYear, onChangeSeason, onChangeType} = useSelectedStatsFilterStore()

  return {
    selectedStatsFilter,
    onChangeSeasonYear,
    onChangeSeason,
    onChangeType,
  }
}

export {useSelectedStatsFilter}
