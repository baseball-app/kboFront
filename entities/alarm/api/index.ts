import ApiClient from '@/api'

export const hasUnReadAlarm = async () => {
  return ApiClient.get<{is_unread: boolean}>('/users/me/')
}
