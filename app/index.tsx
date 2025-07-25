import {useLogin} from '@/hooks/auth/useLogin'
import {SplashScreen, useRouter} from 'expo-router'
import ApiClient from '@/api'
import {Profile} from '@/hooks/my/useProfile'
import {useEffectOnce} from '@/hooks/useEffectOnce'
import VersionCheck from 'react-native-version-check'
import {Alert, Linking} from 'react-native'

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

  useEffectOnce(() => {
    const checkVersion = async () => {
      try {
        const result = await VersionCheck.needUpdate({depth: 2, forceUpdate: true})
        if (result.isNeeded) {
          Alert.alert('업데이트 필요', '최신 버전으로 업데이트 해주세요.', [
            {
              text: '업데이트',
              style: 'default',
              onPress: () => Linking.openURL(result.storeUrl),
            },
          ])
        } else {
          checkIsLogined()
        }
      } catch (e) {
        checkIsLogined()
      }
    }

    checkVersion()
  })

  return null
}
