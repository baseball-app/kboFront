import {renderHook, act} from '@testing-library/react-hooks'
import React, {PropsWithChildren} from 'react'
import {useUpdateDeviceToken} from './useUpdateDeviceToken'
import {updateDeviceToken} from '../../api'
import {useMMKVObject} from 'react-native-mmkv'
import {TestQueryClientWrapper} from '@/shared/lib/test/TestQueryClientWrapper'

// Mock dependencies
jest.mock('../../api')
jest.mock('react-native-mmkv')
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
}))

const mockUpdateDeviceToken = updateDeviceToken as jest.MockedFunction<typeof updateDeviceToken>
const mockUseMMKVObject = useMMKVObject as jest.MockedFunction<typeof useMMKVObject>

const wrapper = ({children}: PropsWithChildren) => <TestQueryClientWrapper>{children}</TestQueryClientWrapper>

describe('useUpdateDeviceToken', () => {
  const mockSetStoredDeviceToken = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseMMKVObject.mockReturnValue([null, mockSetStoredDeviceToken])
    mockUpdateDeviceToken.mockResolvedValue({data: {success: true}})
  })

  it('저장된 토큰이 없을 경우, api는 호출되어야 한다.', async () => {
    const {result} = renderHook(() => useUpdateDeviceToken(), {wrapper})

    await act(async () => {
      result.current.mutate({token: 'test-token'})
    })

    expect(mockUpdateDeviceToken).toHaveBeenCalledWith({
      token: 'test-token',
      device_type: 'IOS',
    })
    expect(mockUpdateDeviceToken).toHaveBeenCalledTimes(1)
    expect(mockSetStoredDeviceToken).toHaveBeenCalledWith('test-token')
  })

  it('저장된 토큰과 현재 토큰이 다를 경우, api는 호출되어야 한다.', async () => {
    mockUseMMKVObject.mockReturnValue(['test-token', mockSetStoredDeviceToken])
    const {result} = renderHook(() => useUpdateDeviceToken(), {wrapper})

    await act(async () => {
      result.current.mutate({token: 'test-token1'})
    })

    expect(mockUpdateDeviceToken).toHaveBeenCalledWith({
      token: 'test-token1',
      device_type: 'IOS',
    })
    expect(mockUpdateDeviceToken).toHaveBeenCalledTimes(1)
    expect(mockSetStoredDeviceToken).toHaveBeenCalledWith('test-token1')
  })

  it('저장된 토큰과 현재 토큰이 같을 경우, api는 호출되지 않아야 한다.', async () => {
    mockUseMMKVObject.mockReturnValue(['test-token', mockSetStoredDeviceToken])
    const {result} = renderHook(() => useUpdateDeviceToken(), {wrapper})

    await act(async () => {
      result.current.mutate({token: 'test-token'})
    })

    expect(mockUpdateDeviceToken).not.toHaveBeenCalled()
    expect(mockSetStoredDeviceToken).not.toHaveBeenCalled()
  })
})
