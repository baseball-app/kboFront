import ApiClient from '@/api'
import {useMutation} from '@tanstack/react-query'
import useProfile from './useProfile'
import {useMMKVObject} from 'react-native-mmkv'
import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import useFriends from './useFriends'

/**
 * 친구 추가 플로우
 * 1. 딥링크로 접속하면 코드를 일단 저장해둠 (친구 추가 플로우 완료 후 삭제) -> 왜냐하면 가입하지 않은 사용자일 수 있기 때문
 * 2. 캘린더 페이지로 이동 시, 친구 추가 로직 수행 (이미 친구가 아닐 경우에만 수행)
 * 3. 친구 추가 완료 시, 친구 추가 플로우 완료 후 저장해둔 코드 삭제
 */
const useMakeFriend = () => {
  const {profile, checkIsMe, refetch: refetchProfile} = useProfile()
  const {checkIsFriend, reloadFriendList} = useFriends()
  const [friendInvitationCodeList, setFriendInvitationCodeList] = useMMKVObject<string[]>(
    MmkvStoreKeys.FRIEND_INVITATION_CODE,
  )

  const temporarySaveFriendInvitationCode = (code: string) => {
    // 이미 친구 추가 플로우 완료한 사용자일 경우 저장하지 않음
    if (friendInvitationCodeList?.includes(code)) return
    // 처음 친구 추가 플로우 시작한 사용자일 경우 저장
    if (!friendInvitationCodeList) return setFriendInvitationCodeList([code])

    setFriendInvitationCodeList([...(friendInvitationCodeList || []), code])
  }

  const {mutateAsync: addFriend} = useMutation({
    mutationFn: async (targetCode: string) => {
      try {
        const {user_id} = await ApiClient.post<{user_id: string}>('/users/apply-invitation/', {
          code: targetCode,
        })

        // 이미 친구라면 진행하지 않음
        if (checkIsFriend(Number(user_id)) || checkIsMe(Number(user_id))) {
          return targetCode
        }

        await ApiClient.post('/users/follow/', {
          source_id: Number(profile.id),
          target_id: Number(user_id),
        })

        return targetCode
      } catch (error) {
        return targetCode
      }
    },
    onError: error => {
      console.error('친구 추가 실패', error)
    },
  })

  const {mutateAsync: unfollowFriend} = useMutation({
    mutationFn: (targetId: number) =>
      ApiClient.post('/users/unfollow/', {
        source_id: Number(profile.id),
        target_id: targetId,
      }),
    onError: error => {
      console.error('친구 추가 실패', error)
    },
    onSuccess: () => {
      reloadFriendList()
      refetchProfile()
    },
  })

  const addFriendList = async () => {
    if (!friendInvitationCodeList?.length) return
    const successList: string[] = []

    // 친구 추가 시도
    for (let i = 0; i < friendInvitationCodeList.length; i++) {
      try {
        console.log('friendInvitationCodeList[i]', friendInvitationCodeList)
        const data = await addFriend(friendInvitationCodeList[i])
        successList.push(data)
      } catch (e) {
        console.error('친구 추가 실패', e)
      }
    }

    // 친구 추가 성공한 코드 제거
    setFriendInvitationCodeList(prev => prev?.filter(code => !successList.includes(code)))
  }

  return {
    temporarySaveFriendInvitationCode,
    addFriend,
    friendInvitationCodeList,
    addFriendList,
    unfollowFriend,
  }
}

export default useMakeFriend
