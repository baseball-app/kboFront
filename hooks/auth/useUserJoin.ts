import {userJoinSlice} from '@/slice/userJoinSlice'
import {useSegments} from 'expo-router'
import useConsent from './useConsent'
import useProfile from '../my/useProfile'
import {ROUTES, useAppRouter} from '@/shared'

// 유저의 회원가입 프로세스
const userJoinProcess = [
  ROUTES.AUTH_TERM_OF_SERVICE,
  ROUTES.AUTH_NICKNAME,
  ROUTES.AUTH_TEAM,
  ROUTES.AUTH_PROFILE,
] as const

type JoinProcess = (typeof userJoinProcess)[number]

/**
 * 회원가입 화면에서 사용하는 hook
 */
const useUserJoin = () => {
  const router = useAppRouter()
  const segments = useSegments()
  // 현재 step 경로
  const currentStep = `/${segments.join('/')}` as JoinProcess

  const joinSlice = userJoinSlice()
  const consent = useConsent()

  const {updateProfileWithSignUp} = useProfile()

  /**
   * 회원가입
   */
  const signUp = async () => {
    try {
      // 회원가입 로직
      await updateProfileWithSignUp(joinSlice)

      router.dismissTo(ROUTES.CALENDAR_TAB)
    } catch (error) {
      console.error('회원가입 정보 수정 오류 :: ', error)
      console.error('data :: ', {
        nickname: joinSlice.nickname,
        profile_image: joinSlice.profile,
        my_team: joinSlice.myTeam,
      })
    }
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
    router.navigate(userJoinProcess[0])
  }

  /**
   * 다음 step으로 이동
   * 다음 step이 없으면 회원가입 요청
   */
  const moveToNextStep = async () => {
    try {
      const nextStep = getNextStep(currentStep)
      if (!nextStep) {
        await signUp()
      } else {
        router.navigate(nextStep)
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
      router.navigate(ROUTES.AUTH_LOGIN)
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
