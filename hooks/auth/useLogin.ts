import {useMemo} from 'react'
import {useMMKVObject} from 'react-native-mmkv'
import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import ApiClient from '@/api'
import {useRouter} from 'expo-router'
import {useQueryClient} from '@tanstack/react-query'
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
  const router = useRouter()
  const queryClient = useQueryClient()
  console.log(user)

  const logout = async () => {
    try {
      await ApiClient.post('/auths/token/revoke/', {})
    } catch (error) {
      console.error('토큰 무효화 실패', error)
    } finally {
      setUser(undefined)
      // api 호출 /auths/token/revoke/
      queryClient.clear()
      router.dismissAll()
      router.navigate('/auth/login')
    }
  }

  const resetToken = (info: Pick<LoginServerResponse, 'access_token' | 'refresh_token'>) => {
    setUser({
      accessToken: info.access_token,
      refreshToken: info.refresh_token,
    })
  }

  const login = async (channel: Channel, code: string) => {
    try {
      const data = await ApiClient.post<LoginServerResponse>(`/auths/${channel}/`, {
        code,
        state: 'string',
      })

      resetToken(data)

      return data
    } catch (error) {
      console.error('로그인 에러 :: ', error)
    }
  }

  // TODO: api 확정되면 구현 예정
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
