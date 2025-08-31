import ApiClient from '@/api'
import {Team} from '../types'

export const getTeams = async () => {
  const response = await ApiClient.get<Team[]>('/teams/')
  return response
}
