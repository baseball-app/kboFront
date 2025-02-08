import {useLogin} from '@/hooks/useLogin'
import {useRouter} from 'expo-router'
import {useEffect} from 'react'

export default function Index() {
    const {refreshAccessToken} = useLogin()
    const router = useRouter()

    const checkIsLogined = async () => {
        try {
            await refreshAccessToken()
            router.replace('/(tabs)')
        } catch (error) {
            console.log('error', error)
            router.replace('/auth/login')
        }
    }

    useEffect(() => {
        checkIsLogined()
    }, [])

    return null
}
