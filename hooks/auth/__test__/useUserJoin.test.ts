import {renderHook, act} from '@testing-library/react-hooks'
import {useRouter, useSegments} from 'expo-router'
import useUserJoin from '../useUserJoin'
import useProfile from '../../my/useProfile'

// Mocking dependencies
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useSegments: jest.fn(),
}))

jest.mock('../../my/useProfile', () => ({
  __esModule: true,
  default: jest.fn(),
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
  }

  const mockUpdateProfileWithSignUp = jest.fn()
  const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
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

    expect(mockRouter.push).toHaveBeenCalledWith('/auth/nickname')
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
      result.current.moveToNextStep()
    })

    expect(mockUpdateProfileWithSignUp).toHaveBeenCalled()
    expect(mockRouter.navigate).toHaveBeenCalledWith('/(tabs)')
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
