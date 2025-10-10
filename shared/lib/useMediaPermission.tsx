import {Platform, PermissionsAndroid, Linking, Alert} from 'react-native'
import * as MediaLibrary from 'expo-media-library'

export class NoPermissionError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'NO_PERMISSION_ERROR'
  }
}

const useMediaPermission = () => {
  const [premissionResponse, requestPermission] = MediaLibrary.usePermissions()
  const checkMediaPermission = async (): Promise<{isGranted: boolean}> => {
    if (Platform.OS === 'ios' && premissionResponse?.status !== 'granted') {
      const result = await requestPermission()
      if (result.status !== 'granted') throw new NoPermissionError()
    }

    if (Platform.OS === 'android' && premissionResponse?.status !== 'granted') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES)
      const isNotGranted = granted !== PermissionsAndroid.RESULTS.GRANTED
      if (isNotGranted) throw new NoPermissionError()
    }

    // console.log('status', premissionResponse?.status)
    // console.log('accessPrivileges', premissionResponse?.accessPrivileges)

    return {isGranted: true}
  }

  const openSettingModal = () => {
    Alert.alert('권한이 없어요', '앱 설정으로 가서 액세스 권한을 수정할 수 있어요. 이동하시겠어요?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '설정하기',
        onPress: () => Linking.openSettings(),
      },
    ])
  }

  return {checkMediaPermission, openSettingModal}
}

export {useMediaPermission}
