import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import {useMMKVObject} from 'react-native-mmkv'
import {useLogin} from '../useLogin'
import {useQuery} from '@tanstack/react-query'
import ApiClient from '@/api'
import {PROFILE_IMAGES, TEAMS} from '@/constants/join'
import {useEffect} from 'react'
import {IUserJoinSlice} from '@/slice/userJoinSlice'

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
    const [profile, updateProfileCacheData] = useMMKVObject<Profile>(MmkvStoreKeys.USER_PROFILE)

    const {data} = useQuery({
        queryKey: ['profile', user],
        queryFn: () => ApiClient.get<Profile>('/users/me/'),
        staleTime: 1000 * 60,
        enabled: Boolean(isLogined),
        placeholderData: profile ?? undefined,
    })

    // 회원가입 시, 초기 데이터 업데이트 하는 함수
    const updateInitialProfile = (joinSlice: IUserJoinSlice) => {
        updateProfileCacheData({
            nickname: joinSlice.nickname,
            predict_ratio: 0,
            my_team: {
                id: joinSlice.myTeam?.id ?? 0,
                name: joinSlice.myTeam?.name ?? '',
                logo_url: joinSlice.myTeam?.logo ?? '',
            },
            followers: 0,
            followings: 0,
            profile_type: Number(joinSlice.profile?.id),
        })
    }

    const modifyProfile = async (joinSlice: IUserJoinSlice) => {
        await ApiClient.post('/users/modify/', {
            nickname: joinSlice.nickname,
            profile_image: String(joinSlice.profile?.id),
            my_team: joinSlice.myTeam?.id,
            profile_type: Number(joinSlice.profile?.id),
        })

        updateInitialProfile(joinSlice)
    }

    useEffect(() => {
        if (data) updateProfileCacheData(data)
    }, [data])

    const myTeam = TEAMS.find(team => team.id === data?.my_team.id)
    const myProfileImage = PROFILE_IMAGES.find(image => image.id === data?.profile_type)?.image

    return {
        profile: {
            ...data,
            my_team: myTeam,
            profile_image: myProfileImage,
        },
        modifyProfile,
    }
}

export default useProfile
