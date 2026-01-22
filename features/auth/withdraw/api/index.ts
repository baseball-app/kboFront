import ApiClient from '@/api';

export const withdraw = async () => {
  return ApiClient.post('/users/leave/', {});
};
