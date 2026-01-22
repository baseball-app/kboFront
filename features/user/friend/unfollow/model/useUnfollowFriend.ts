import * as api from '../api';
import {useMutation} from '@tanstack/react-query';
import useProfile from '@/hooks/my/useProfile';
import {Friend, useFriends} from '@/entities/friend';
import {usePopup} from '@/slice/commonSlice';

const useUnfollowFriend = () => {
  const {profile, refetch: refetchProfile} = useProfile();
  const {reloadFriendList} = useFriends();
  const {modal} = usePopup();

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
    modal.open({
      header: '안내',
      content: `${friend.nickname}님과 친구를 끊겠습니까?`,
      button: [
        {
          text: '취소',
          onPress: modal.hide,
          buttonStyle: {
            backgroundColor: '#D0CEC7',
          },
        },
        {
          text: '친구 끊기',
          onPress: () => unfollowFriend(friend.id).finally(modal.hide),
          buttonStyle: {
            backgroundColor: '#1E5EF4',
          },
          buttonTextStyle: {
            color: '#fff',
          },
        },
      ],
    });
  };

  return {openUnfollowPopup};
};

export {useUnfollowFriend};
