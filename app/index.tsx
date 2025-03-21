import {useLogin} from '@/hooks/auth/useLogin'
import {SplashScreen, useRouter} from 'expo-router'
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
    } finally {
      SplashScreen.hideAsync()
    }
  }

  useEffect(() => {
    checkIsLogined()
  }, [])

  return null
}
