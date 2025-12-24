import {renderHook, act} from '@testing-library/react-hooks'
import {useSegments} from 'expo-router'
import useUserJoin from '../useUserJoin'
import useProfile from '../../my/useProfile'
import {ROUTES, useAppRouter} from '@/shared'

jest.mock('../../my/useProfile', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@/shared', () => ({
  useAppRouter: jest.fn(),
  ROUTES: {
    AUTH_NICKNAME: '/auth/nickname',
    AUTH_LOGIN: '/auth/login',
    TABS: '/(tabs)',
    AUTH_TERM_OF_SERVICE: '/auth/term-of-service',
    AUTH_PROFILE: '/auth/profile-image',
    AUTH_TEAM: '/auth/my-team',
    CALENDAR_TAB: '/(tabs)',
  },
}))

jest.mock('@/slice/userJoinSlice', () => ({
  userJoinSlice: jest.fn(() => () => ({
    nickname: 'testUser',
    profile: 'test-profile.jpg',
    myTeam: 'testTeam',
  })),
}))

describe('useUserJoin', () => {
  const mockRouter = {
    navigate: jest.fn(),
    push: jest.fn(),
    back: jest.fn(),
    dismissAll: jest.fn(),
    dismissTo: jest.fn(),
  }

  const mockUpdateProfileWithSignUp = jest.fn()
  const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAppRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useProfile as jest.Mock).mockReturnValue({updateProfileWithSignUp: mockUpdateProfileWithSignUp})
    mockConsoleError.mockClear()
  })

  afterAll(() => {
    mockConsoleError.mockRestore()
  })

  it('should move to next step correctly', () => {
    ;(useSegments as jest.Mock).mockReturnValue(['auth', 'term-of-service'])

    const {result} = renderHook(() => useUserJoin())

    act(() => {
      result.current.moveToNextStep()
    })

    expect(mockRouter.navigate).toHaveBeenCalledWith('/auth/nickname')
  })

  it('should move to previous step correctly', () => {
    ;(useSegments as jest.Mock).mockReturnValue(['auth', 'nickname'])

    const {result} = renderHook(() => useUserJoin())

    act(() => {
      result.current.moveToPrevStep()
    })

    expect(mockRouter.back).toHaveBeenCalled()
  })

  it('should navigate to login when moving back from first step', () => {
    ;(useSegments as jest.Mock).mockReturnValue(['auth', 'term-of-service'])

    const {result} = renderHook(() => useUserJoin())

    act(() => {
      result.current.moveToPrevStep()
    })

    expect(mockRouter.navigate).toHaveBeenCalledWith('/auth/login')
  })

  it('should attempt signup when reaching the last step', async () => {
    ;(useSegments as jest.Mock).mockReturnValue(['auth', 'profile-image'])

    const {result} = renderHook(() => useUserJoin())

    await act(async () => {
      await result.current.moveToNextStep()
    })

    expect(mockUpdateProfileWithSignUp).toHaveBeenCalled()
    expect(mockRouter.dismissTo).toHaveBeenCalledWith(ROUTES.CALENDAR_TAB)
  })

  it('should throw error for invalid path', () => {
    ;(useSegments as jest.Mock).mockReturnValue(['auth', 'invalid-path'])

    const {result} = renderHook(() => useUserJoin())

    act(() => {
      result.current.moveToNextStep()
    })

    expect(mockConsoleError).toHaveBeenCalled()
  })
})
