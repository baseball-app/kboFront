import ApiClient from '@/api';

export const logout = async () => {
  return ApiClient.post('/auths/token/revoke/', {});
};
