import {useLogin} from '@/hooks/auth/useLogin'
import {SplashScreen} from 'expo-router'
import {useAppRouter} from '@/shared'
import {ROUTES} from '@/shared'
import {checkIsMember} from '@/features/auth/login'
import {useEffectOnce} from '@/shared'

export default function Index() {
  const {refreshAccessToken} = useLogin()
  const router = useAppRouter()

  const checkIsLogined = async () => {
    try {
      await refreshAccessToken()
      const isMember = await checkIsMember()
      if (isMember) {
        router.replace(ROUTES.CALENDAR_TAB)
      } else {
        router.replace(ROUTES.AUTH_LOGIN)
      }
    } catch (error) {
      router.replace(ROUTES.AUTH_LOGIN)
    } finally {
      SplashScreen.hideAsync()
    }
  }

  useEffectOnce(() => checkIsLogined())

  return null
}
