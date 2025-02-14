import React from 'react'
import {View, Text, StyleSheet, FlatList, Image} from 'react-native'

interface Friend {
  id: string
  name: string
  imageUrl: string
}

/** 테스트 */
const friendsData: Friend[] = [
  {id: '1', name: '김철수', imageUrl: 'https://via.placeholder.com/50'},
  {id: '2', name: '이영희', imageUrl: 'https://via.placeholder.com/50'},
  {id: '3', name: '박지성', imageUrl: 'https://via.placeholder.com/50'},
  {id: '4', name: '최동욱', imageUrl: 'https://via.placeholder.com/50'},
  {id: '5', name: '정수민', imageUrl: 'https://via.placeholder.com/50'},
]

const FriendList = () => {
  const renderFriendItem = ({item}: {item: Friend}) => (
    <View style={styles.friendItem}>
      <Image source={{uri: item.imageUrl}} style={styles.profileImage} />
      <Text style={styles.friendName}>{item.name}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={friendsData}
        renderItem={renderFriendItem}
        keyExtractor={item => item.id}
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
    alignItems: 'center',
    marginHorizontal: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  friendName: {
    fontSize: 12,
    textAlign: 'center',
  },
})

export default FriendList
