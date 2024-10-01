import { ITestSlice, testSlice } from "@/slice/testSlice";
import { create } from "zustand";

/** slice들 & 타입 확장 */
type InitStoreState = ITestSlice;

/** 프로젝트에서 사용할 여러개의 슬라이스가 합쳐진 하나의 스토어 */
export const useStore = create<InitStoreState>()((...a) => ({
  ...testSlice(...a),
}));
