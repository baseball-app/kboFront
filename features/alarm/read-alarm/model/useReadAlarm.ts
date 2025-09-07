import {Notification} from '@/entities/alarm/types'
import {Pagination} from '@/types/generic'
import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query'
import React, {useRef} from 'react'
import * as api from '../api'

type InfiniteNotificationData = InfiniteData<Pagination<Notification>, unknown> | null
const useReadAlarm = () => {
  const queryClient = useQueryClient()
  const prevNotificationData = useRef<InfiniteNotificationData>(null)

  const updateNotificationStatus = (id: number) => {
    const notification = queryClient.getQueryData<InfiniteNotificationData>(['notification'])
    if (notification) {
      // 낙관적 업데이트를 위한 cache
      ;(prevNotificationData as any).current = notification

      // 변경한 데이터
      const updatedPagesData = notification?.pages.map(page => ({
        ...page,
        pages: page.results.map(result => (result.id === id ? {...result, is_read: true} : result)),
      }))

      queryClient.setQueryData<InfiniteNotificationData>(['notification'], {
        ...notification,
        pages: updatedPagesData,
      })
      // refetch()
    }
  }

  const resetNotificationStatus = () => {
    if (prevNotificationData) {
      queryClient.setQueryData<InfiniteNotificationData>(['notification'], prevNotificationData.current)
      clearPrevNotificationData()
    }
  }

  const clearPrevNotificationData = () => {
    prevNotificationData.current = null
  }

  /**
   * 읽음상태를 업데이트하는 함수
   */
  const {mutate: readAlarm} = useMutation({
    mutationFn: ({id, is_read}: Pick<Notification, 'id' | 'is_read'>) => api.readAlarm(id, is_read),
    onMutate: ({id}) => updateNotificationStatus(id),
    onError: resetNotificationStatus,
    onSuccess: clearPrevNotificationData,
  })

  return {readAlarm}
}

export {useReadAlarm}
