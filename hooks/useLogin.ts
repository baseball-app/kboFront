import {useMemo} from 'react'
import {useMMKVObject} from 'react-native-mmkv'
import {MmkvStoreKeys} from "@/store/mmkv-store/constants";


export type TUser = {
    accessToken: string
    refreshToken: string
}

export const useLogin = () => {
    const [user, setUser] = useMMKVObject<TUser>(MmkvStoreKeys.USER_LOGIN)
    const isLogined = useMemo(() => user?.accessToken && user.accessToken.length > 0, [user?.accessToken])
    return {
        user,
        isLogined,
        setUser,
    }
}

/*
    ex)
    setUser({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
    })
*/
