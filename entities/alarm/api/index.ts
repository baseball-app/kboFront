import ApiClient from '@/api'
import {Pagination} from '@/types/generic'
import {Notification} from '../types'

export const hasUnReadAlarm = async () => {
  return ApiClient.get<{is_unread: boolean}>('/users/me/')
}

export const getNotification = async (page: number) => {
  return ApiClient.get<Pagination<Notification>>('/notifications/', {page})
}
