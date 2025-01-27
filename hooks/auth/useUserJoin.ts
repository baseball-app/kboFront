import {userJoinSlice} from '@/slice/userJoinSlice'
import {useRouter, useSegments} from 'expo-router'
import useConsent from './useConsent'
import ApiClient from '@/api'
import {LoginServerResponse, TUser} from '../useLogin'
import {useMMKVObject} from 'react-native-mmkv'
import {MmkvStoreKeys} from '@/store/mmkv-store/constants'

// 유저의 회원가입 프로세스
const userJoinProcess = ['/auth/term-of-service', '/auth/nickname', '/auth/my-team', '/auth/profile-image'] as const
type JoinProcess = (typeof userJoinProcess)[number]

/**
 * 회원가입 화면에서 사용하는 hook
 */
const useUserJoin = () => {
    const [user, setUser] = useMMKVObject<TUser>(MmkvStoreKeys.USER_LOGIN)
    const router = useRouter()
    const segments = useSegments()
    // 현재 step 경로
    const currentStep = `/${segments.join('/')}` as JoinProcess

    const joinSlice = userJoinSlice()
    const consent = useConsent()

    /**
     * 회원가입
     */
    const signUp = async () => {
        // 회원가입 로직
        // api.post('/auths/kakao/register', {nickname, profile, team, code})
        router.navigate('/(tabs)')
    }

    /**
     *
     * @param currentStep 현재 step 경로
     * @returns 다음 step 경로
     */
    const getNextStep = (currentStep: JoinProcess): JoinProcess | undefined => {
        const currentIndex = userJoinProcess.indexOf(currentStep)
        const isInvalidPath = currentIndex === -1
        if (isInvalidPath) throw new Error(`${currentStep}은 잘못된 경로입니다.`)

        return userJoinProcess[currentIndex + 1]
    }

    // 회원가입 첫 페이지 진입하는 함수
    const startSignUpProcessWithCode = async (code: string) => {
        const {access_token, refresh_token} = await ApiClient.post<LoginServerResponse>('/auths/kakao/register/', {
            code,
            state: 'string',
        })

        setUser({
            accessToken: access_token,
            refreshToken: refresh_token,
        })

        joinSlice.setCode(code)
        router.navigate(userJoinProcess[0])
    }

    /**
     * 다음 step으로 이동
     * 다음 step이 없으면 회원가입 요청
     */
    const moveToNextStep = () => {
        try {
            const nextStep = getNextStep(currentStep)

            if (!nextStep) {
                signUp()
            } else {
                router.push(nextStep)
            }
        } catch (error) {
            // 경로 잘못 설정했을 때, 발생하는 에러
            console.error(error)
        }
    }

    // const moveTo

    /** 뒤로가기 하면 데이터 날라갈지 ? 아니면 유지할지 기획적으로 이야기 */
    const moveToPrevStep = () => {
        // 첫번째 페이지라면 로그인 화면으로 이동해야 함
        if (currentStep === userJoinProcess[0]) {
            router.navigate('/auth/login')
            return
        }

        router.back()
    }

    return {
        ...joinSlice,
        consent,
        moveToNextStep,
        moveToPrevStep,
        startSignUpProcessWithCode,
    }
}

export default useUserJoin
