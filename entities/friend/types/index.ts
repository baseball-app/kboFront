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

export type FriendStatus = Friend & {
  ticket_info?: {
    writer_id?: number // 1
    game_id?: number // 1
    id: number
  }
}
