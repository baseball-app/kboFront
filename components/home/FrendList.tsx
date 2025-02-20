import useFriends from '@/hooks/my/useFriends'
import React from 'react'
import {View, Text, StyleSheet, FlatList, Image} from 'react-native'
import FriendStatusProfile from './FriendStatusProfile'

const FriendList = () => {
  const {friend_status} = useFriends()

  return (
    <View style={styles.container}>
      <FlatList
        data={friend_status?.friends || []}
        renderItem={({item}) => (
          <View style={styles.friendItem}>
            <FriendStatusProfile friendStatus={item} isMyProfile />
          </View>
        )}
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
  },
  friendItem: {
    marginHorizontal: 10,
  },
})

export default FriendList
