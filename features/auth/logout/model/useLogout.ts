import {useAuthStore} from '@/entities/auth'
import {useAppRouter} from '@/hooks/common/useAppRouter'
import {ROUTES} from '@/hooks/common/constants'
import * as api from '../api'

const useLogout = () => {
  const {clear} = useAuthStore()
  const router = useAppRouter()

  const logout = async () => {
    try {
      await api.logout()
    } catch (error) {
      console.error('토큰 무효화 실패', error)
    } finally {
      await clear()

      router.dismissAll()
      router.replace(ROUTES.AUTH_LOGIN)
    }
  }

  return {logout}
}

export {useLogout}
