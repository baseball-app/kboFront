import ApiClient from '@/api'
import {AuthRepository} from '../api/AuthRepository'
import * as schemas from '../types'
import {useMMKVObject} from 'react-native-mmkv'
import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import {ROUTES, useAppRouter} from '@/hooks/common'
import {useMemo} from 'react'

type TUser = {
  accessToken: string
  refreshToken: string
}

const useAuthentication = () => {
  const authRepository = useMemo(() => new AuthRepository(ApiClient), [])

  const [_, setUser] = useMMKVObject<TUser>(MmkvStoreKeys.USER_LOGIN)
  const router = useAppRouter()

  const login = async (req: schemas.LoginRequest) => {
    return authRepository
      .login(req)
      .then(({access_token, refresh_token}) => setUser({accessToken: access_token, refreshToken: refresh_token}))
      .then(authRepository.checkIsMember)
      .then(isMember => _redirectToNextPage(isMember))
  }

  const _redirectToNextPage = (isMember: boolean) => {
    if (isMember) return router.replace(ROUTES.CALENDAR_TAB)
    router.replace(ROUTES.AUTH_TERM_OF_SERVICE)
  }

  return {login}
}

export {useAuthentication}
