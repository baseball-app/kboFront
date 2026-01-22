import {Platform, PermissionsAndroid, Linking, Alert} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {openNoPermissionAlert} from './openNoPermissionAlert';

export class NoPermissionError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NO_PERMISSION_ERROR';
  }
}

const useMediaPermission = () => {
  const [premissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const checkMediaPermission = async (): Promise<{isGranted: boolean}> => {
    if (Platform.OS === 'ios' && premissionResponse?.status !== 'granted') {
      const result = await requestPermission();
      if (result.status !== 'granted') throw new NoPermissionError();
    }

    if (Platform.OS === 'android' && premissionResponse?.status !== 'granted') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
      const isNotGranted = granted !== PermissionsAndroid.RESULTS.GRANTED;
      if (isNotGranted) throw new NoPermissionError();
    }

    // console.log('status', premissionResponse?.status)
    // console.log('accessPrivileges', premissionResponse?.accessPrivileges)

    return {isGranted: true};
  };

  return {checkMediaPermission, openSettingModal: openNoPermissionAlert};
};

export {useMediaPermission};
