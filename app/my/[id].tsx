import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {theme} from '@/constants/Colors'
import {useLocalSearchParams} from 'expo-router'
import {findProfileImageById} from '@/constants/join'
import Header from '@/components/common/Header'
import {useFriends, type FriendType} from '@/entities/friend'
import {useUnfollowFriend} from '@/features/user/friend/unfollow'

const FollowerScreen = () => {
  const {id} = useLocalSearchParams()

  const {openUnfollowPopup} = useUnfollowFriend()

  const {followers, followings} = useFriends()
  const [activeTab, setActiveTab] = useState<FriendType>(id as FriendType)

  const friendList = (() => {
    switch (activeTab) {
      case 'followers':
        return followers
      case 'followings':
        return followings
      default:
        throw new Error('탭 정보를 확인해 주세요.')
    }
  })()

  const handleTabChange = (tab: FriendType) => {
    setActiveTab(tab)
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Header title="" variants="white" />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={activeTab === 'followers' ? styles.ActiveTab : styles.NonActiveTab}
            onPress={() => handleTabChange('followers')}>
            <Text style={activeTab === 'followers' ? styles.tabTextActive : styles.tabTextNonActive}>
              {followers?.length} 팔로워
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 'followings' ? styles.ActiveTab : styles.NonActiveTab}
            onPress={() => handleTabChange('followings')}>
            <Text style={activeTab === 'followings' ? styles.tabTextActive : styles.tabTextNonActive}>
              {followers?.length} 팔로잉
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {friendList?.map(friend => (
          <View key={friend.id} style={styles.followerItem}>
            <View style={styles.followerInfo}>
              <View style={styles.iconContainer}>
                <Image source={findProfileImageById(friend.profile_type)} style={styles.baseballIcon} />
              </View>
              <Text style={styles.followerName}>{friend.nickname}</Text>
            </View>
            <TouchableOpacity
              style={styles.unfollowButton} //
              onPress={() => openUnfollowPopup(friend)}>
              <Image source={require('@/assets/icons/x.png')} style={styles.unfollowIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {},
  backButton: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomColor: '#E4E2DC',
  },
  tab: {
    paddingVertical: 10,
    marginRight: 20,
  },
  ActiveTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  NonActiveTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabTextNonActive: {
    fontSize: 16,
    color: '#999',
  },
  tabTextActive: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  followerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderWidth: 0.64,
    borderRadius: 50,
    borderColor: '#D0CEC7',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  baseballIcon: {
    width: 12.57,
    height: 12.57,
  },
  followerName: {
    fontSize: 14,
    color: '#000',
  },
  followButton: {
    width: 32,
    height: 32,
    backgroundColor: '#111111',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followIcon: {
    width: 9.9,
    height: 9.9,
  },
  unfollowButton: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F2EE',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unfollowIcon: {
    width: 9.9,
    height: 9.9,
  },
  // removeButton: {
  //   width: (32),
  //   height: (32),
  //   backgroundColor: '#F3F2EE',
  //   borderRadius: 50,
  // },
})

export default FollowerScreen
