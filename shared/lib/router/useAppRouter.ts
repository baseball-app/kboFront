import {useRouter, UnknownInputParams} from 'expo-router'
import {RouterAddress} from './constants'

// 라우터 함수 타입 정의
type NavigationFunction = (path: RouterAddress, params?: UnknownInputParams, options?: any) => void
type DismissFunction = (count?: number) => void

class RouterError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RouterError'
  }
}

const useAppRouter = () => {
  const router = useRouter()
  // 뒤로 갈 수 있는지 확인
  const canGoBack = router.canGoBack

  // dismiss 가능한지 확인
  const canDismiss = router.canDismiss

  // 뒤로 가기
  const back = () => {
    if (!canGoBack()) throw new RouterError('뒤로 갈 수 없습니다.')
    router.back()
  }

  // push로 이동
  const push: NavigationFunction = (path, params, options) => {
    router.push({pathname: path, params}, options)
  }

  // navigate로 이동
  const navigate: NavigationFunction = (path, params, options) => {
    router.navigate({pathname: path, params}, options)
  }

  // replace로 이동
  const replace: NavigationFunction = (path, params, options) => {
    router.replace({pathname: path, params}, options)
  }

  // 스택에서 count만큼 화면 닫기
  const dismiss: DismissFunction = count => {
    if (!canDismiss()) throw new RouterError('스택을 닫을 수 없습니다.')
    router.dismiss(count)
  }

  // 특정 경로까지 dismiss
  const dismissTo: NavigationFunction = (path, params, options) => {
    router.dismissTo({pathname: path, params}, options)
  }

  // 스택 최상단으로 이동
  const dismissAll = () => {
    router.dismissAll()
  }

  // 현재 라우트의 쿼리 파라미터 업데이트
  const setParams = (params: Partial<UnknownInputParams>) => {
    router.setParams(params as any)
  }

  // 현재 라우트 리로드
  const reload = () => {
    router.reload()
  }

  return {
    back,
    canGoBack,
    push,
    navigate,
    replace,
    dismiss,
    dismissTo,
    dismissAll,
    canDismiss,
    setParams,
    reload,
  }
}

export {useAppRouter}
