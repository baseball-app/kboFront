import { TextStyle, ViewStyle } from "react-native";
import { create, StateCreator } from "zustand";

/** 모달데이터 구조 */
interface IModalConfig {
  header: string;
  content: string;
  button: IButton[];
}
/** 모달데이터 버튼 구조 */
interface IButton {
  text: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
}

interface ICommonSlice {
  currentModal: IModalConfig | null;
  modal: {
    open: (pModalConfig: IModalConfig) => void;
    hide: () => void;
  };
}
export const commonSlice: StateCreator<ICommonSlice> = (set) => ({
  currentModal: null,
  modal: {
    open: (pModalConfig: IModalConfig) => {
      set({ currentModal: pModalConfig });
    },
    hide: () => {
      set({ currentModal: null });
    },
  },
});
export const useCommonSlice = create<ICommonSlice>(commonSlice);
