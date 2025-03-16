import ApiClient from '@/api'
import {Pagination} from '@/types/generic'
import {InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {router} from 'expo-router'
import {useRef} from 'react'

type NotificationType = 'FRIEND_FEEDBACK' | 'FRIEND_UPDATE'

export type Notification = {
  id: number
  user: number
  user_info: {
    id: number
    nickname: string
    profile_image: string
  }
  type: NotificationType //'FRIEND_FEEDBACK' | 'FRIEND_UPDATE'
  is_read: boolean
  created_at: string // '2025-01-25T12:42:01.067Z'
  updated_at: string // '2025-01-25T12:42:01.067Z'
  ticket: number
}

type InfiniteNotificationData = InfiniteData<Pagination<Notification>, unknown> | null

const useNotification = () => {
  const queryClient = useQueryClient()

  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['notification'],
    queryFn: ({pageParam}) => ApiClient.get<Pagination<Notification>>('/notifications/', {page: pageParam}),
    getNextPageParam: ({last_page}, allPages, lastPageParam, allPageParams) =>
      last_page === lastPageParam ? null : lastPageParam + 1,
    initialPageParam: 1,
    staleTime: 1000 * 20,
  })

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
  const {mutate: onUpdateNotificationStatus} = useMutation({
    mutationFn: ({id, is_read}: Pick<Notification, 'id' | 'is_read'>) =>
      ApiClient.put<Notification>(`/notifications/${id}/`, {is_read}),
    onMutate: ({id}) => updateNotificationStatus(id),
    onError: resetNotificationStatus,
    onSuccess: clearPrevNotificationData,
  })

  /**
   * 알림을 클릭했을 때 호출하는 함수
   * @param notification 클릭한 알림
   */
  const onClickNotification = (notification: Notification) => {
    if (!notification.is_read) {
      onUpdateNotificationStatus({id: notification.ticket, is_read: true})
    }

    // TODO: Ticket 페이지로 이동하기
    // router.push('/ticket/stat')
  }

  const fetchNextNotificationPage = () => {
    if (hasNextPage) fetchNextPage()
  }

  return {
    // || mockData
    notificationList: data?.pages.flatMap(_ => _.results) || [],
    fetchNextPage: fetchNextNotificationPage,
    onClickNotification,
  }
}

export default useNotification

const mockData: Notification[] = Array.from({length: 30}, (_, i) => ({
  id: i + 1,
  user: 1,
  user_info: {
    id: 1,
    nickname: 'test',
    profile_image: 'https://example.com/image.png',
  },
  type: i % 2 === 1 ? 'FRIEND_FEEDBACK' : 'FRIEND_UPDATE',
  is_read: false,
  created_at: '2025-01-25T12:42:01.067Z',
  updated_at: '2025-01-25T12:42:01.067Z',
  ticket: i + 1,
}))
