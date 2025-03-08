import useFriends from '@/hooks/my/useFriends'
import React from 'react'
import {View, Text, StyleSheet, FlatList, Image} from 'react-native'
import FriendStatusProfile from './FriendStatusProfile'
import useProfile from '@/hooks/my/useProfile'
import {useRouter} from 'expo-router'

const FriendList = () => {
  const {friend_status} = useFriends()
  const {profile} = useProfile()
  const router = useRouter()

  return (
    <View style={styles.container}>
      <FlatList
        data={friend_status?.friends || []}
        renderItem={({item}) => (
          <View style={styles.friendItem}>
            <FriendStatusProfile
              friendStatus={item}
              onClick={() => {
                // game id 가 있으면 오늘의 티켓
                // 없으면 친구의 달력
                if (item.ticket_info?.game_id) {
                  router.push('/write/todayTicketCard')
                } else {
                  console.log(item.ticket_info?.game_id)
                  // router.push('/(tabs)')
                  // TODO: 여기에서 id 변경해서 친구 달력으로 !
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
                ticket_info: {},
              }}
              isMyProfile
            />
          </View>
        }
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomColor: '#E4E2DC',
    borderBottomWidth: 1,
    paddingRight: 20,
  },
  friendItem: {
    marginLeft: 20,
  },
})

export default FriendList
