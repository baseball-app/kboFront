import * as schemas from '../types'
import {ROUTES, useAppRouter} from '@/hooks/common'
import * as api from '../api'
import {useAuthStore} from './useAuthStore'

const useAuthentication = () => {
  const {setAuth} = useAuthStore()
  const router = useAppRouter()

  const login = async (req: schemas.LoginRequest) => {
    return api
      .login(req)
      .then(({access_token, refresh_token}) => setAuth({accessToken: access_token, refreshToken: refresh_token}))
      .then(api.checkIsMember)
      .then(isMember => _redirectToNextPage(isMember))
  }

  const _redirectToNextPage = (isMember: boolean) => {
    if (isMember) return router.replace(ROUTES.CALENDAR_TAB)
    router.replace(ROUTES.AUTH_TERM_OF_SERVICE)
  }

  return {login}
}

export {useAuthentication}
