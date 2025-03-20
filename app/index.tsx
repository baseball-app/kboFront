import {findQueryValueByName} from '@/hooks/deepLink/findQueryValueByName'
import useDeepLink from '@/hooks/deepLink/useDeepLink'
import useMakeFriend from '@/hooks/my/useMakeFriend'
import {useLogin} from '@/hooks/auth/useLogin'
import {useRouter} from 'expo-router'
import {useEffect} from 'react'
import ApiClient from '@/api'
import {Profile} from '@/hooks/my/useProfile'

export default function Index() {
  const {refreshAccessToken} = useLogin()
  const router = useRouter()

  const checkIsLogined = async () => {
    try {
      await refreshAccessToken()
      const profile = await ApiClient.get<Profile>('/users/me/')
      if (profile?.my_team?.id) {
        router.replace('/(tabs)')
      } else {
        router.replace('/auth/login')
      }
    } catch (error) {
      console.log('error', error)
      router.replace('/auth/login')
    }
  }

  // TODO: 여기에서 확실히 저장되는지 확인해야 함
  // 테스트 코드 작성하는 것도 좋을듯?
  const {temporarySaveFriendInvitationCode} = useMakeFriend()

  // 딥링크 감지하여 invitationCode가 있을 경우 임시 저장
  useDeepLink(url => {
    const invitationCode = findQueryValueByName(url, 'code')
    console.log('invitationCode', invitationCode)
    if (invitationCode) {
      temporarySaveFriendInvitationCode(invitationCode)
    }
  })

  useEffect(() => {
    checkIsLogined()
  }, [])

  return null
}
