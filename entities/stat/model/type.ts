type SelectedStatsType = '상대구단별' | '구장별' | '홈/원정 경기별' | '집관 경기별'
type SelectedStatsFilter = {
  year: number
  season: boolean
  type: SelectedStatsType
}

interface SelectedStatsFilterStore {
  selectedStatsFilter: SelectedStatsFilter | null
  onChangeSeasonYear: (year: number) => void
  onChangeSeason: (season: boolean) => void
  onChangeType: (type: SelectedStatsType) => void
}

export type {SelectedStatsType, SelectedStatsFilter, SelectedStatsFilterStore}
