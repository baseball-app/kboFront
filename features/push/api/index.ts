import ApiClient from '@/api'

export const updateDeviceToken = async (req: {token: string; device_type: string}) => {
  return ApiClient.post('/devices/', req)
}
