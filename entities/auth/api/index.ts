import ApiClient from '@/api';
import {LoginServerResponse, LoginRequest} from '../types';

export const refreshToken = async (refreshToken: string) => {
  return ApiClient.post<LoginServerResponse>('/auths/token/refresh/', {
    refresh_token: refreshToken,
  });
};

export const revokeToken = async () => {
  return ApiClient.post('/auths/token/revoke/', {});
};

export const login = async ({channel, code, id_token, native}: LoginRequest) => {
  try {
    const response = await ApiClient.post<LoginServerResponse>(`/auths/${channel}/`, {
      code,
      state: 'string',
      // id_token은 애플 로그인에만 씀
      id_token: id_token || '',
      // 애플 로그인 여부로 사용 중임(의도는 네이티브 로그인 여부인듯)
      native,
    });

    return response;
  } catch (error) {
    console.error('로그인 에러 :: ', error);
    throw error;
  }
};

export const checkIsMember = async () => {
  const profile = await ApiClient.get<{my_team: {id: number}}>('/users/me/');
  const myTeamId = profile?.my_team?.id;

  return Boolean(myTeamId);
};
