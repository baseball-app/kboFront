import {TextStyle, ViewStyle} from 'react-native'
import {create, StateCreator} from 'zustand'

/** 모달데이터 구조 */
interface IModalConfig {
  header: string
  content: string
  button: IButton[]
}
/** 모달데이터 버튼 구조 */
interface IButton {
  text: string
  onPress: () => void
  buttonStyle?: ViewStyle
  buttonTextStyle?: TextStyle
}

interface ICommonSlice {
  currentModal: IModalConfig | null
  modal: {
    open: (pModalConfig: IModalConfig) => void
    hide: () => void
  }
}
export const commonSlice: StateCreator<ICommonSlice> = set => ({
  currentModal: null,
  modal: {
    open: (pModalConfig: IModalConfig) => {
      set({currentModal: pModalConfig})
    },
    hide: () => {
      set({currentModal: null})
    },
  },
})
export const useCommonSlice = create<ICommonSlice>(commonSlice)

export const usePopup = () => {
  const commonSlice = useCommonSlice()

  const openCommonPopup = (content: string) => {
    commonSlice.modal.open({
      header: '안내',
      content: content,
      button: [
        {
          text: '확인',
          onPress: commonSlice.modal.hide,
          buttonStyle: {
            width: '100%',
            borderRadius: 10,
            backgroundColor: '#1E5EF4',
          },
          buttonTextStyle: {
            color: 'white',
          },
        },
      ],
    })
  }

  return {...commonSlice, openCommonPopup}
}
