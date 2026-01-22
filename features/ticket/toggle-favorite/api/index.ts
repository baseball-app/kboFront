import ApiClient from '@/api';

export const toggleFavorite = async ({id, favorite_status}: {id: number; favorite_status: 'clear' | 'excute'}) => {
  return ApiClient.post(`/tickets/ticket_favorite/`, {id: id, favorite_status});
};
