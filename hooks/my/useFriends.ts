import {useQuery} from '@tanstack/react-query'
import {useLogin} from '@/hooks/auth/useLogin'
import ApiClient from '@/api'

export type FriendType = 'followers' | 'followings'

export type Friend = {
  id: number
  nickname: string
  profile_image: string
  profile_type: number
}

export type Friends = Record<FriendType, Friend[]>

export type FriendStatusList = {
  friends: FriendStatus[]
}

export type FriendStatus = {
  id: number // 1
  nickname: string // 'abc'
  profile_type: number // 0
  profile_image: string // ''
  ticket_info: {
    writer_id?: number // 1
    game_id?: number // 1
  }
}

const useFriends = () => {
  const {user, isLogined} = useLogin()

  const {data: followers, refetch: refetchFollowers} = useQuery({
    queryKey: ['friend', 'followers', user],
    queryFn: () => ApiClient.get<Friends>('/users/followers/'),
    enabled: Boolean(isLogined),
    staleTime: 20 * 1000,
  })

  const {data: followings, refetch: refetchFollowings} = useQuery({
    queryKey: ['friend', 'followings', user],
    queryFn: () => ApiClient.get<Friends>('/users/followings/'),
    enabled: Boolean(isLogined),
    staleTime: 20 * 1000,
  })

  const {data: friend_status, refetch: refetchFriendStatus} = useQuery({
    queryKey: ['friend', 'friend_status', user],
    queryFn: () => ApiClient.get<FriendStatusList>('/users/friends/'),
    enabled: Boolean(isLogined),
    staleTime: 20 * 1000,
  })

  const checkIsFriend = (id: number) => {
    return friend_status?.friends.find(friend => friend.id === id)
  }

  const reloadFriendList = () => {
    refetchFollowers()
    refetchFollowings()
    refetchFriendStatus()
  }

  return {
    followers: followers?.followers,
    followings: followings?.followings,
    friend_status: friend_status,
    checkIsFriend,
    reloadFriendList,
  }
}

export default useFriends
