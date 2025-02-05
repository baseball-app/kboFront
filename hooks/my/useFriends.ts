import {useQuery} from '@tanstack/react-query'
import {useLogin} from '../useLogin'
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

const useFriends = () => {
    const {user} = useLogin()

    const {data: followers} = useQuery({
        queryKey: ['followers', user],
        queryFn: () => ApiClient.get<Friends>('/users/followers/'),
    })

    const {data: followings} = useQuery({
        queryKey: ['followings', user],
        queryFn: () => ApiClient.get<Friends>('/users/followings/'),
    })

    return {
        followers: [
            {
                user_id: 1,
                nickname: 'nickname',
                profile_image: 'https://image.com/',
            },
        ],
        // followers: followers?.followers,
        followings: followings?.followings,
    }
}

export default useFriends
