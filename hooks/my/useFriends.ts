import {useQuery} from '@tanstack/react-query'
import {useLogin} from '@/hooks/auth/useLogin'
import ApiClient from '@/api'

export type FriendType = 'followers' | 'followings'

export type Friends = Record<
  FriendType,
  {
    user_id: number
    nickname: string
    profile_image: string
  }[]
>

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

  const {data: followers} = useQuery({
    queryKey: ['followers', user],
    queryFn: () => ApiClient.get<Friends>('/users/followers/'),
    enabled: Boolean(isLogined),
  })

  const {data: followings} = useQuery({
    queryKey: ['followings', user],
    queryFn: () => ApiClient.get<Friends>('/users/followings/'),
    enabled: Boolean(isLogined),
  })

  const {data: friend_status} = useQuery({
    queryKey: ['friend_status', user],
    queryFn: () => ApiClient.get<FriendStatusList>('/users/friends/'),
    enabled: Boolean(isLogined),
  })

  const checkIsFriend = (id: number) => {
    return friend_status?.friends.find(friend => friend.id === id)
  }

  return {
    followers: followers?.followers,
    followings: followings?.followings,
    friend_status: friend_status,
    checkIsFriend,
  }
}

export default useFriends
