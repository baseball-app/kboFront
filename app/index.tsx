import {findQueryValueByName} from '@/hooks/deepLink/findQueryValueByName'
import useDeepLink from '@/hooks/deepLink/useDeepLink'
import useMakeFriend from '@/hooks/my/useMakeFriend'
import {useLogin} from '@/hooks/auth/useLogin'
import {useRouter} from 'expo-router'
import {useEffect} from 'react'

export default function Index() {
  const {refreshAccessToken} = useLogin()
  const router = useRouter()

  const checkIsLogined = async () => {
    try {
      await refreshAccessToken()
      router.replace('/(tabs)')
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
    console.log('url', url)
    if (invitationCode) {
      console.log('hi', url)
      temporarySaveFriendInvitationCode(invitationCode)
    }
  })

  useEffect(() => {
    console.log('여기 호출 안 하고 갈까?')
    checkIsLogined()
  }, [])

  return null
}
