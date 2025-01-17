import {userJoinSlice} from '@/slice/userJoinSlice'
import {useRouter, useSegments} from 'expo-router'

// 유저의 회원가입 프로세스
const userJoinProcess = ['/auth/nickname', '/auth/my-team', '/auth/profile-image'] as const
type JoinProcess = (typeof userJoinProcess)[number]

/**
 * 회원가입 화면에서 사용하는 hook
 */
const useUserJoin = () => {
    const router = useRouter()
    const segments = useSegments()
    // 현재 step 경로
    const currentStep = `/${segments.join('/')}` as JoinProcess

    const {
        myTeam,
        setNickname,
        setProfile,
        setMyTeam,
        nickname,
        profile, //
    } = userJoinSlice()

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

    /** 뒤로가기 하면 데이터 날라갈지 ? 아니면 유지할지 기획적으로 이야기 */
    const moveToPrevStep = router.back

    return {
        myTeam,
        nickname,
        profile,
        setNickname,
        setProfile,
        setMyTeam,
        moveToNextStep,
        moveToPrevStep,
    }
}

export default useUserJoin
