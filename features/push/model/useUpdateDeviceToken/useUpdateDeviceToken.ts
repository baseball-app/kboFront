import {MmkvStoreKeys} from '@/store/mmkv-store/constants';
import {Platform} from 'react-native';
import {useMMKVObject} from 'react-native-mmkv';
import {updateDeviceToken} from '../../api';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export class AlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AlreadyExistsError';
  }
}

type UpdateDeviceTokenVariables = {
  token: string;
};

export const useUpdateDeviceToken = () => {
  const [storedDeviceToken, setStoredDeviceToken] = useMMKVObject<string>(MmkvStoreKeys.DEVICE_TOKEN);

  return useMutation({
    mutationFn: ({token}: UpdateDeviceTokenVariables) => {
      if (storedDeviceToken === token) throw new AlreadyExistsError('이미 존재하는 토큰입니다.');
      return updateDeviceToken({token, device_type: Platform.OS.toUpperCase()});
    },
    onSuccess: (_, variables) => {
      setStoredDeviceToken(variables.token);
    },
    onError: (error, variables) => {
      if (error instanceof AxiosError) {
        if (error.status === 400) setStoredDeviceToken(variables.token);
      }
    },
  });
};
