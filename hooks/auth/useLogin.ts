import {useMemo} from 'react'
import {useMMKVObject} from 'react-native-mmkv'
import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import ApiClient from '@/api'

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
    login,
    refreshAccessToken,
  }
}
