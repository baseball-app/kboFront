import { color_token } from '@/constants/theme';
import { size } from '@/shared';
import { TextStyle, ViewStyle } from 'react-native';
import { create, StateCreator } from 'zustand';

/** 모달데이터 구조 */
export interface IModalConfig {
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
export const commonSlice: StateCreator<ICommonSlice> = set => ({
  currentModal: null,
  modal: {
    open: (pModalConfig: IModalConfig) => {
      set({currentModal: pModalConfig});
    },
    hide: () => {
      set({currentModal: null});
    },
  },
});
export const useCommonSlice = create<ICommonSlice>(commonSlice);

export const usePopup = () => {
  const commonSlice = useCommonSlice();

  const openCommonPopup = (content: string, onSuccess?: () => void) => {
    commonSlice.modal.open({
      header: '안내',
      content: content,
      button: [
        {
          text: '확인',
          onPress: () => {
            commonSlice.modal.hide();
            onSuccess?.();
          },
          buttonStyle: {
            width: '100%',
            borderRadius: size(10),
            backgroundColor: color_token.primary,
          },
          buttonTextStyle: {
            color: color_token.white,
          },
        },
      ],
    });
  };

  const openConfirmPopup = (content: string, confirm: {
    text: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    buttonTextStyle?: TextStyle;
  }, cancel: {
    text: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    buttonTextStyle?: TextStyle;
  }) => {
    commonSlice.modal.open({
      header: '안내',
      content: content,
      button: [
        {
          text: cancel.text,
          onPress: cancel.onPress,
          buttonStyle: {
            backgroundColor: color_token.gray300,
            ...cancel.buttonStyle,
          },
          buttonTextStyle: {
            color: color_token.gray900,
            ...cancel.buttonTextStyle,
          },
        },
        {
          text: confirm.text,
          onPress: confirm.onPress,
          buttonStyle: {
            backgroundColor: color_token.primary,
            ...confirm.buttonStyle,
            },
          buttonTextStyle: {
            color: color_token.white,
            ...confirm.buttonTextStyle,
            },
        },
      ]
    });
  };


  return {...commonSlice, openCommonPopup, openConfirmPopup};
};
