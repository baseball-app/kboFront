import { create, StateCreator } from "zustand";

export interface ITestSlice {
  count: number;
  increase: () => void;
  decrease: () => void;
}

export const testSlice: StateCreator<ITestSlice> = (set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
});

export const useTestStore = create<ITestSlice>(testSlice);
