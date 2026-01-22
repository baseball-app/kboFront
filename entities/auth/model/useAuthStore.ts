import {useMMKVObject} from 'react-native-mmkv';
import {MmkvStoreKeys} from '@/store/mmkv-store/constants';
import {useMemo} from 'react';
import {clearAll} from '@/store/mmkv-store/mmkvStore';
import {useQueryClient} from '@tanstack/react-query';

const useAuthStore = () => {
  const [auth, setAuth] = useMMKVObject<{
    accessToken: string;
    refreshToken: string;
  }>(MmkvStoreKeys.USER_LOGIN);

  const queryClient = useQueryClient();

  // 나중에 isLogined를 accessToken이 아니라, 토큰 검증 api로 해서,
  // 유효성이 통과하면 다른 api 쏠 수 있게 바꿔야겠다
  const isLogined = useMemo(() => auth?.accessToken && auth.accessToken.length > 0, [auth?.accessToken]);

  const clear = async () => {
    // 사용자 데이터 제거
    setAuth(undefined);

    // React Query 캐시 완전 클리어
    queryClient.removeQueries();
    queryClient.clear();
    await queryClient.cancelQueries();
    queryClient.resetQueries();

    // MMKV 로컬 스토리지 완전 클리어
    clearAll();
  };

  return {auth, setAuth, isLogined, clear};
};

export {useAuthStore};
