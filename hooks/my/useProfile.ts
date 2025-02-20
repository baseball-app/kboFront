import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import {useMMKVObject} from 'react-native-mmkv'
import {useLogin} from '../useLogin'
import {useQuery} from '@tanstack/react-query'
import ApiClient from '@/api'
import {findTeamById, PROFILE_IMAGES} from '@/constants/join'
import {useEffect} from 'react'
import {IUserJoinSlice} from '@/slice/userJoinSlice'
import {useCommonSlice} from '@/slice/commonSlice'
import {moderateScale, verticalScale} from '@/utils/metrics'
import {useRouter} from 'expo-router'

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
}

const useProfile = () => {
  const {user, isLogined} = useLogin()
  const [profile, updateProfileCacheData] = useMMKVObject<Profile>(MmkvStoreKeys.USER_PROFILE)
  const {modal} = useCommonSlice()
  const router = useRouter()

  const {data, refetch} = useQuery({
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

  // 마이팀 변경 페이지에서 사용하는 함수
  const updateTeam = async (teamId: number) => {
    if (!profile) return
    await ApiClient.post('/users/modify/', {
      my_team: teamId,
    })
    refetch()
  }

  const updateMyTeam = (teamId?: number) => {
    if (!teamId) return

    modal.open({
      header: '안내',
      content: `마이팀 변경시, 기존의 데이터는 삭제가 됩니다.\n변경하시겠습니까?`,
      button: [
        {
          text: '취소',
          onPress: modal.hide,
          buttonStyle: {
            paddingVertical: verticalScale(12),
            borderRadius: 8,
            backgroundColor: '#EEEEEE',
            flex: 1,
          },
          buttonTextStyle: {
            color: '#000000',
            fontSize: moderateScale(16),
            fontWeight: '600',
            textAlign: 'center',
          },
        },
        {
          text: '팀 변경',
          onPress: async () => {
            try {
              await updateTeam(teamId)
              router.back()
            } catch (error) {
              console.error('updateMyTeam error :: ', error)
            } finally {
              modal.hide()
            }
          },
          buttonStyle: {
            backgroundColor: '#1E5EF4',
            flex: 1,
            paddingVertical: verticalScale(12),
            borderRadius: 8,
          },
          buttonTextStyle: {
            color: 'white',
            fontSize: moderateScale(16),
            fontWeight: '600',
            textAlign: 'center',
          },
        },
      ],
    })
  }

  useEffect(() => {
    if (data) updateProfileCacheData(data)
  }, [data])

  const myTeam = findTeamById(data?.my_team.id)
  const myProfileImage = PROFILE_IMAGES.find(image => image.id === data?.profile_type)?.image

  return {
    profile: {
      ...data,
      my_team: myTeam,
      profile_image: myProfileImage,
      predict_ratio: Math.floor((data?.predict_ratio ?? 0) * 100),
    },
    modifyProfile,
    updateMyTeam,
  }
}

export default useProfile
