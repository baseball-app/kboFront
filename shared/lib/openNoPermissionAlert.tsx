import {Alert, Linking} from 'react-native';

const openNoPermissionAlert = () => {
  Alert.alert('권한이 없어요', '앱 설정으로 가서 액세스 권한을 수정할 수 있어요. 이동하시겠어요?', [
    {
      text: '취소',
      style: 'cancel',
    },
    {
      text: '설정하기',
      onPress: () => Linking.openSettings(),
    },
  ]);
};

export {openNoPermissionAlert};
