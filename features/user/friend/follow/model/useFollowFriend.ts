import ApiClient from '@/api'
import {useMutation} from '@tanstack/react-query'

import {showToast} from '@/utils/showToast'
import {useFriends} from '@/entities/friend'
import useProfile from '@/hooks/my/useProfile'

/**
 * 친구 추가 플로우
 * 1. 딥링크로 접속하면 코드를 일단 저장해둠 (친구 추가 플로우 완료 후 삭제) -> 왜냐하면 가입하지 않은 사용자일 수 있기 때문
 * 2. 캘린더 페이지로 이동 시, 친구 추가 로직 수행 (이미 친구가 아닐 경우에만 수행)
 * 3. 친구 추가 완료 시, 친구 추가 플로우 완료 후 저장해둔 코드 삭제
 */
const useFollowFriend = () => {
  const {profile, checkIsMe, refetch: refetchProfile} = useProfile()
  const {checkIsFriend, reloadFriendList} = useFriends()

  const {mutateAsync: follow} = useMutation({
    mutationFn: async (targetCode: string) => {
      try {
        const {user_id} = await ApiClient.post<{user_id: string}>('/users/apply-invitation/', {
          code: targetCode,
        })

        // 이미 친구라면 진행하지 않음
        if (checkIsFriend(Number(user_id)) || checkIsMe(Number(user_id))) {
          setTimeout(() => {
            showToast('이미 추가된 친구입니다')
          }, 200)
          return targetCode
        }

        await ApiClient.post('/users/follow/', {
          source_id: Number(profile.id),
          target_id: Number(user_id),
        })

        setTimeout(() => {
          showToast('친구가 추가 되었습니다')
        }, 200)

        return targetCode
      } catch (error) {
        setTimeout(() => {
          showToast('코드가 잘못 입력되었습니다')
        }, 200)
        return targetCode
      }
    },
    onSuccess: () => {
      reloadFriendList()
      refetchProfile()
    },
    onError: error => {
      console.error('친구 추가 실패', error)
    },
  })

  return {
    follow,
  }
}

export {useFollowFriend}
