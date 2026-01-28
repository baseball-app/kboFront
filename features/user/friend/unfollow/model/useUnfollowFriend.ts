import * as api from '../api';
import { useMutation } from '@tanstack/react-query';
import useProfile from '@/hooks/my/useProfile';
import { Friend, useFriends } from '@/entities/friend';
import { usePopup } from '@/slice/commonSlice';

const useUnfollowFriend = () => {
  const {profile, refetch: refetchProfile} = useProfile();
  const {reloadFriendList} = useFriends();
  const {modal, openConfirmPopup} = usePopup();

  const {mutateAsync: unfollowFriend} = useMutation({
    mutationFn: (targetId: number) => api.unfollow(Number(profile.id), targetId),
    onError: error => {
      console.error('친구 추가 실패', error);
    },
    onSuccess: () => {
      reloadFriendList();
      refetchProfile();
    },
  });

  const openUnfollowPopup = (friend: Friend) => {
    openConfirmPopup({
      content: `${friend.nickname}님과 친구를 끊겠습니까?`,
      confirm: {
        text: '친구 끊기',
        onPress: () => unfollowFriend(friend.id).finally(modal.hide),
      },
      cancel: {
        text: '취소',
        onPress: modal.hide,
      },
    })
  };

  return {openUnfollowPopup};
};

export {useUnfollowFriend};
