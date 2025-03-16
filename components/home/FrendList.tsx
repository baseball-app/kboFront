import useFriends from '@/hooks/my/useFriends'
import React from 'react'
import {View, Text, StyleSheet, FlatList, Image} from 'react-native'
import FriendStatusProfile from './FriendStatusProfile'
import useProfile from '@/hooks/my/useProfile'
import {useRouter} from 'expo-router'
import {useDiaryStore} from '@/hooks/diary/useDiary'

const FriendList = () => {
  const {friend_status} = useFriends()
  const {profile} = useProfile()
  const router = useRouter()
  const {setUserId} = useDiaryStore()

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
                if (item.ticket_info?.id) {
                  console.log('여기?', item.ticket_info?.id)
                  router.push({
                    pathname: '/write/todayTicketCard', //
                    params: {id: item.ticket_info?.id},
                  })
                } else {
                  setUserId(item.id)
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
                setUserId(profile.id!)
              }}
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
