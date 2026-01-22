import useFriends from '@/hooks/my/useFriends';
import React, {memo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FriendStatusProfile from './FriendStatusProfile';
import useProfile from '@/hooks/my/useProfile';
import {usePathname} from 'expo-router';
import Skeleton from '../skeleton/Skeleton';
import {logEvent} from '@/analytics/func';
import {EVENTS} from '@/analytics/event';
import {ROUTES, size, useAppRouter} from '@/shared';
import {color_token} from '@/constants/theme';

const FriendList = ({setUserId, userId}: {setUserId: (userId: number) => void; userId: number | null}) => {
  const {friend_status, isLoadingFriendStatus} = useFriends();
  const {profile} = useProfile();
  const router = useAppRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <FlatList
        data={friend_status?.friends}
        ListEmptyComponent={isLoadingFriendStatus ? <LoadingFriendList /> : null}
        renderItem={({item}) => (
          <View style={styles.friendItem}>
            <FriendStatusProfile
              choice={{id: userId || profile.id!}}
              friendStatus={item}
              onClick={() => {
                // game id 가 있으면 오늘의 티켓
                // 없으면 친구의 달력
                logEvent(EVENTS.FRIEND_PROFILE_VIEW, {friend_id: item.id, screen_name: pathname});
                if (item.ticket_info?.id) {
                  router.push(ROUTES.WRITE_TODAY_TICKET_CARD, {id: item.ticket_info?.id, target_id: item.id});
                } else {
                  setUserId(item.id);
                }
              }}
            />
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.friendItem}>
            <FriendStatusProfile
              friendStatus={{
                id: profile.id!,
                nickname: '내 캘린더',
                profile_type: profile.profile_type!,
                profile_image: '',
              }}
              isMyProfile
              onClick={() => {
                setUserId(profile.id!);
              }}
            />
          </View>
        }
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color_token.white,
    paddingVertical: size(10),
    borderBottomColor: color_token.gray300,
    borderBottomWidth: 1,
    paddingRight: size(20),
  },
  friendItem: {
    marginLeft: size(20),
  },
});

const LoadingFriendList = memo(() => {
  return (
    <View style={{flexDirection: 'row', gap: size(20), marginLeft: size(20)}}>
      <View style={{gap: size(12)}}>
        <Skeleton height={50} width={50} type="circle" />
        <Skeleton height={15} width={50} />
      </View>
      <View style={{gap: 10}}>
        <Skeleton height={50} width={50} type="circle" />
        <Skeleton height={15} width={50} />
      </View>
      <View style={{gap: 10}}>
        <Skeleton height={50} width={50} type="circle" />
        <Skeleton height={15} width={50} />
      </View>
      <View style={{gap: 10}}>
        <Skeleton height={50} width={50} type="circle" />
        <Skeleton height={15} width={50} />
      </View>
    </View>
  );
});

export default FriendList;
