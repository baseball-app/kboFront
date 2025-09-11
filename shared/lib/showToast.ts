import Toast from 'react-native-toast-message'

export const showToast = (text: string) => {
  Toast.show({
    type: 'info',
    text1: text,
    visibilityTime: 2000,
    autoHide: true,
    position: 'bottom',
  })
}
