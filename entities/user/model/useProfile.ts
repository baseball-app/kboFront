import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import {useMMKVObject} from 'react-native-mmkv'
import {useLogin} from '@/hooks/auth/useLogin'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import ApiClient from '@/api'
import {PROFILE_IMAGES} from '@/constants/join'
import {useEffect} from 'react'
import {IUserJoinSlice} from '@/slice/userJoinSlice'
import {useCommonSlice} from '@/slice/commonSlice'

export type Team = {
  id: number // 3
  name: string // 'LG 트윈스'
  logo_url: string // 'https://image.com/'
}

export type Profile = {
  nickname: string
  predict_ratio: number
  my_team: Team
  followers: number // 20
  followings: number // 32
  profile_type: number // 1
  id: number
  is_unread: boolean
}

const useProfile = () => {
  const queryClient = useQueryClient()
  const {user, isLogined} = useLogin()
  const [profile, updateProfileCacheData] = useMMKVObject<Profile>(MmkvStoreKeys.USER_PROFILE)

  const {data, refetch} = useQuery({
    queryKey: ['profile', user],
    queryFn: () => ApiClient.get<Profile>('/users/me/'),
    enabled: Boolean(isLogined),
    placeholderData: profile ?? undefined,
  })

  // 회원가입 시, 초기 데이터 업데이트 하는 함수
  const updateInitialProfile = (joinSlice: IUserJoinSlice) => {
    updateProfileCacheData({
      id: joinSlice.id,
      nickname: joinSlice.nickname,
      predict_ratio: 0,
      my_team: {
        id: joinSlice.myTeam?.id ?? 0,
        name: joinSlice.myTeam?.name ?? '',
        logo_url: '',
      },
      followers: 0,
      followings: 0,
      profile_type: Number(joinSlice.profile?.id),
      is_unread: false,
    })
  }

  const updateProfileWithSignUp = async (joinSlice: IUserJoinSlice) => {
    await ApiClient.post('/users/modify/', {
      nickname: joinSlice.nickname,
      profile_image: String(joinSlice.profile?.id),
      my_team: joinSlice.myTeam?.id,
      profile_type: Number(joinSlice.profile?.id),
    })

    updateInitialProfile(joinSlice)
  }

  // 마이팀 변경 페이지에서 사용하는 함수
  const updateProfile = async (info: Partial<{my_team: number; nickname: string}>) => {
    if (!profile) return
    await ApiClient.post('/users/modify/', info).then(res => console.log('res', res))
    queryClient.clear()
    // refetch()
  }

  useEffect(() => {
    if (data) updateProfileCacheData(data)
  }, [data])

  const myProfileImage = PROFILE_IMAGES.find(image => image.id === data?.profile_type)?.image

  const checkIsMe = (id: number) => {
    return data?.id === id
  }

  return {
    profile: {
      ...data,
      profile_image: myProfileImage,
      predict_ratio: Math.floor(data?.predict_ratio ?? 0),
    },
    updateProfileWithSignUp,
    updateProfile,
    checkIsMe,
    refetch,
  }
}

export {useProfile}
