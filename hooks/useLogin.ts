import {useEffect, useMemo} from 'react'
import {useMMKVObject} from 'react-native-mmkv'
import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import ApiClient from '@/api'
import {useRouter} from 'expo-router'

export type TUser = {
    accessToken: string
    refreshToken: string
}

export type LoginServerResponse = {
    access_token: string // 'MId4pT7NNu9vSdETnWmBHQxZtdqeMZ'
    expires_in: number // 3600
    refresh_token: string // 'lmgEzKKLpljXDxP8feUV2aDzom2cig'
    scope: string // 'read write'
    token_type: string // 'Bearer'
}

export const useLogin = () => {
    const [user, setUser] = useMMKVObject<TUser>(MmkvStoreKeys.USER_LOGIN)
    const isLogined = useMemo(() => user?.accessToken && user.accessToken.length > 0, [user?.accessToken])
    const router = useRouter()

    const logout = () => {
        setUser(undefined)
        // api 호출 /auths/token/revoke/
        router.navigate('/auth/login')
    }

    const login = async (code: string) => {
        try {
            const {access_token, refresh_token} = await ApiClient.post<LoginServerResponse>('/auths/kakao/token/', {
                code,
                state: 'string',
            })

            setUser({
                accessToken: access_token,
                refreshToken: refresh_token,
            })

            router.navigate('/(tabs)')
        } catch (error) {
            console.error('Error occurred during login:', error)
        }
    }

    // TODO: api 확정되면 구현 예정
    // const refreshAccessToken = async () => {
    //     if (!user?.refreshToken) return

    //     // const response = await ApiClient.post('/auths/kakao/token', {
    //     //     refreshToken: user.refreshToken,
    //     // })

    //     //
    //     // user?.refreshToken

    //     // setUser(prev => {
    //     //     return {
    //     //         accessToken: 'new access',
    //     //         refreshToken: user.refreshToken,
    //     //     }
    //     // })
    // }

    // const {data} = useQuery({
    //     queryKey: ['user'],
    //     queryFn: () => {},
    //     staleTime: 1000 * 60 * 10,
    //     enable: Boolean(user?.refreshToken),
    // })

    // useEffect(() => {

    //     refreshAccessToken()

    //     // refresh 토큰으로 발급
    // }, [data])

    return {
        user,
        isLogined,
        setUser,
        logout,
        login,
    }
}

/*
    ex)
    setUser({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
    })
*/
