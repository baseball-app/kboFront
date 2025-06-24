import {useLogin} from '@/hooks/auth/useLogin'
import {SplashScreen, useRouter} from 'expo-router'
import ApiClient from '@/api'
import {Profile} from '@/hooks/my/useProfile'
import {useEffectOnce} from '@/hooks/useEffectOnce'

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
      router.replace('/auth/login')
    } finally {
      SplashScreen.hideAsync()
    }
  }

  useEffectOnce(() => checkIsLogined())

  return null
}
