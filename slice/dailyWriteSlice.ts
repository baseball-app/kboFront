import {Match} from '@/hooks/match/useMatch'
import {create, StateCreator} from 'zustand'

export interface IDailyLogWrite {
  selectedMatch: Match | null
  selectedMatchResult: string
  selectedWeather: string
  selectedPlace: string
  selectedDate: Date | null
  setSelectedMatch: (pM: Match | null) => void
  setSelectedMatchResult: (pR: string) => void
  setSelectedWeather: (pW: string) => void
  setSelectedPlace: (pP: string) => void
  setSelectedDate: (pD: Date) => void
  clearState: () => void
}

export const dailyWriteSlice: StateCreator<IDailyLogWrite> = set => ({
  selectedMatch: null,
  selectedMatchResult: '',
  selectedWeather: '',
  selectedPlace: '',
  selectedDate: null,
  setSelectedMatch: pM => set({selectedMatch: pM}),
  setSelectedMatchResult: pR => set({selectedMatchResult: pR}),
  setSelectedWeather: pW => set({selectedWeather: pW}),
  setSelectedPlace: pP => set({selectedPlace: pP}),
  setSelectedDate: pD => set({selectedDate: pD}),
  clearState: () =>
    set({
      selectedMatch: null,
      selectedMatchResult: '',
      selectedWeather: '',
      selectedPlace: '',
      selectedDate: null,
    }),
})

export const useDailyWriteStore = create<IDailyLogWrite>(dailyWriteSlice)
