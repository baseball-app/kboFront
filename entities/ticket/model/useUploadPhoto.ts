import {openNoPermissionAlert} from '@/shared/lib/openNoPermissionAlert';
import * as ImagePicker from 'expo-image-picker';

function useUploadPhoto() {
  const uploadPhoto = async () => {
    /** 갤러리 접근 권한 요청 */
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      openNoPermissionAlert();
      return;
    }

    /** 갤러리에서 이미지 선택 */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      aspect: [307, 270],
      selectionLimit: 1,
    } as ImagePicker.ImagePickerOptions);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // 사진이 선택되었을 때의 동작
      return result.assets[0];
    } else if (result.canceled) {
      // 취소했을 때의 동작
      return null;
    } else {
      // 그 외의 동작
      // 즉, 취소는 아닌데, assets이 없는 경우
      // 취소와 동일함
      return null;
    }
  };

  return {uploadPhoto};
}

export {useUploadPhoto};
