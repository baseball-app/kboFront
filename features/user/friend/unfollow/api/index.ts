import ApiClient from '@/api';

export const unfollow = async (source_id: number, target_id: number) => {
  return ApiClient.post('/users/unfollow/', {
    source_id: source_id,
    target_id: target_id,
  });
};
