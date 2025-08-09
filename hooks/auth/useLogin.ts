import {useMemo} from 'react'
import {useMMKVObject} from 'react-native-mmkv'
import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import {clearAll} from '@/store/mmkv-store/mmkvStore'
import ApiClient from '@/api'
import {useQueryClient} from '@tanstack/react-query'
import {ROUTES, useAppRouter} from '../common'

export type TUser = {
  accessToken: string
  refreshToken: string
}

export type Channel = 'kakao' | 'naver' | 'apple'

export type LoginServerResponse = {
  access_token: string // 'MId4pT7NNu9vSdETnWmBHQxZtdqeMZ'
  expires_in: number // 3600
  refresh_token: string // 'lmgEzKKLpljXDxP8feUV2aDzom2cig'
  scope: string // 'read write'
  token_type: string // 'Bearer'
  is_new_user: boolean // true
}

export const useLogin = () => {
  const [user, setUser] = useMMKVObject<TUser>(MmkvStoreKeys.USER_LOGIN)
  const isLogined = useMemo(() => user?.accessToken && user.accessToken.length > 0, [user?.accessToken])
  const router = useAppRouter()
  const queryClient = useQueryClient()

  const logout = async () => {
    try {
      await ApiClient.post('/auths/token/revoke/', {})
    } catch (error) {
      console.error('토큰 무효화 실패', error)
    } finally {
      // 사용자 데이터 제거
      setUser(undefined)

      // React Query 캐시 완전 클리어
      queryClient.removeQueries()
      queryClient.clear()
      await queryClient.cancelQueries()
      queryClient.resetQueries()

      // MMKV 로컬 스토리지 완전 클리어
      clearAll()

      router.dismissAll()
      router.replace(ROUTES.AUTH_LOGIN)
    }
  }

  const resetToken = (info: Pick<LoginServerResponse, 'access_token' | 'refresh_token'>) => {
    setUser({
      accessToken: info.access_token,
      refreshToken: info.refresh_token,
    })
  }

  const login = async (channel: Channel, code: string, id_token?: string) => {
    try {
      const data = await ApiClient.post<LoginServerResponse>(`/auths/${channel}/`, {
        code,
        state: 'string',
        id_token: id_token || '',
        native: channel === 'apple',
      })

      resetToken(data)

      return data
    } catch (error) {
      console.error('로그인 에러 :: ', error)
    }
  }

  const refreshAccessToken = async () => {
    if (!user?.refreshToken) throw new Error('refreshToken이 없습니다.')

    const data = await ApiClient.post<LoginServerResponse>('/auths/token/refresh/', {
      refresh_token: user.refreshToken,
    })

    resetToken(data)
  }

  return {
    user,
    isLogined,
    setUser,
    logout,
    login,
    refreshAccessToken,
  }
}
