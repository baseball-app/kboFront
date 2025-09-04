import ApiClient from '@/api'
import {Profile} from '../types'

export const getProfile = async () => {
  return ApiClient.get<Profile>('/users/me/')
}
