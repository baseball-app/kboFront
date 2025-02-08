import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import {useMMKVObject} from 'react-native-mmkv'
import {useLogin} from '../useLogin'
import {useQuery} from '@tanstack/react-query'
import ApiClient from '@/api'
import {PROFILE_IMAGES, TEAMS} from '@/constants/join'
import {useEffect} from 'react'

export type Profile = {
    nickname: string
    predict_ratio: number
    my_team: {
        id: number // 3
        name: string // 'LG 트윈스'
        logo_url: string // 'https://image.com/'
    }
    followers: number // 20
    followings: number // 32
    profile_type: number // 1
}

const useProfile = () => {
    const {user, isLogined} = useLogin()
    const [profile, updateProfile] = useMMKVObject<Profile>(MmkvStoreKeys.USER_PROFILE)

    const {data} = useQuery({
        queryKey: ['profile', user],
        queryFn: () => ApiClient.get<Profile>('/users/me/'),
        staleTime: 1000 * 60,
        enabled: Boolean(isLogined),
        placeholderData: profile ?? undefined,
    })

    useEffect(() => {
        if (data) updateProfile(data)
    }, [data])

    const myTeam = TEAMS.find(team => team.id === data?.my_team.id)
    const myProfileImage = PROFILE_IMAGES.find(image => image.id === data?.profile_type)?.image

    return {
        profile: {
            ...data,
            my_team: myTeam,
            profile_image: myProfileImage,
        },
        updateProfile,
    }
}

export default useProfile
