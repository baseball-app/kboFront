import ApiClient from '@/api'
import {Friends, FriendStatusList} from '../types'

export const getFollowers = async () => {
  return ApiClient.get<Friends>('/users/followers/')
}

export const getFollowings = async () => {
  return ApiClient.get<Friends>('/users/followings/')
}

export const getFriendStatus = async () => {
  return ApiClient.get<FriendStatusList>('/users/friends/')
}
