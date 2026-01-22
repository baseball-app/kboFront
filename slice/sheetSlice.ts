import {create, StateCreator} from 'zustand';

/** 모달데이터 구조 */
interface IModalConfig {
  content: React.ReactNode;
}

interface ISheetSlice {
  currentSheet: IModalConfig | null;
  sheet: {
    open: (pModalConfig: IModalConfig) => void;
    hide: () => void;
  };
}
export const sheetSlice: StateCreator<ISheetSlice> = set => ({
  currentSheet: null,
  sheet: {
    open: (pModalConfig: IModalConfig) => {
      set({currentSheet: pModalConfig});
    },
    hide: () => {
      set({currentSheet: null});
    },
  },
});
export const useSheetSlice = create<ISheetSlice>(sheetSlice);

export const useSheet = () => {
  const sheetSlice = useSheetSlice();

  const openCommonPopup = (content: React.ReactNode) => {
    sheetSlice.sheet.open({
      content,
    });
  };

  return {...sheetSlice, openCommonPopup};
};
