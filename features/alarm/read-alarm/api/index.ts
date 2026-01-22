import ApiClient from '@/api';
import {Notification} from '@/entities/alarm/types';

export const readAlarm = async (id: number, is_read: boolean) => {
  return ApiClient.put<Notification>(`/notifications/${id}/`, {is_read});
};
