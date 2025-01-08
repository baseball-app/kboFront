import { create, StateCreator } from "zustand";

export interface IDailyLogWrite {
  selectedMatch: any;
  selectedMatchResult: string;
  selectedWeather: string;
  selectedPlace: string;
  setSelectedMatch: (pM: any) => void;
  setSelectedMatchResult: (pR: string) => void;
  setSelectedWeather: (pW: string) => void;
  setSelectedPlace: (pP: string) => void;
  clearState: () => void;
}

export const dailyWriteSlice: StateCreator<IDailyLogWrite> = (set) => ({
  selectedMatch: {},
  selectedMatchResult: "",
  selectedWeather: "",
  selectedPlace: "",
  setSelectedMatch: (pM) => set({ selectedMatch: pM }),
  setSelectedMatchResult: (pR) => set({ selectedMatchResult: pR }),
  setSelectedWeather: (pW) => set({ selectedWeather: pW }),
  setSelectedPlace: (pP) => set({ selectedPlace: pP }),
  clearState: () =>
    set({
      selectedMatch: {},
      selectedMatchResult: "",
      selectedWeather: "",
      selectedPlace: "",
    }),
});

export const useDailyWriteStore = create<IDailyLogWrite>(dailyWriteSlice);
