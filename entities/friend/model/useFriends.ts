import {useQuery} from '@tanstack/react-query';
import * as api from '../api';

const useFriends = () => {
  const {data: followers, refetch: refetchFollowers} = useQuery({
    queryKey: ['friend', 'followers'],
    queryFn: () => api.getFollowers(),
    staleTime: 20 * 1000,
  });

  const {data: followings, refetch: refetchFollowings} = useQuery({
    queryKey: ['friend', 'followings'],
    queryFn: () => api.getFollowings(),
    staleTime: 20 * 1000,
  });

  const {
    data: friend_status,
    refetch: refetchFriendStatus,
    isLoading: isLoadingFriendStatus,
  } = useQuery({
    queryKey: ['friend', 'friend_status'],
    queryFn: () => api.getFriendStatus(),
    staleTime: 20 * 1000,
  });

  const checkIsFriend = (id: number) => {
    return friend_status?.friends.find(friend => friend.id === id);
  };

  const reloadFriendList = () => {
    refetchFollowers();
    refetchFollowings();
    refetchFriendStatus();
  };

  return {
    followers: followers?.followers,
    followings: followings?.followings,
    friend_status: friend_status,
    checkIsFriend,
    reloadFriendList,
    isLoadingFriendStatus,
  };
};

export {useFriends};
