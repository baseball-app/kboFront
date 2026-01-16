import React, {useState} from 'react'
import {View, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useLocalSearchParams} from 'expo-router'
import {findProfileImageById} from '@/constants/join'
import Header from '@/components/common/Header'
import {useFriends, type FriendType} from '@/entities/friend'
import {useUnfollowFriend} from '@/features/user/friend/unfollow'
import {color_token} from '@/constants/theme'
import {size} from '@/shared'
import {Txt} from '@/shared/ui'

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
      <View style={styles.header}>
        <Header title="" variants="white" />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={activeTab === 'followers' ? styles.ActiveTab : styles.NonActiveTab}
            onPress={() => handleTabChange('followers')}>
            <Txt
              size={16}
              weight={activeTab === 'followers' ? 'semibold' : 'regular'}
              color={activeTab === 'followers' ? color_token.black : color_token.gray500}>
              {followers?.length} 팔로워
            </Txt>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 'followings' ? styles.ActiveTab : styles.NonActiveTab}
            onPress={() => handleTabChange('followings')}>
            <Txt
              size={16}
              weight={activeTab === 'followings' ? 'semibold' : 'regular'}
              color={activeTab === 'followings' ? color_token.black : color_token.gray500}>
              {followers?.length} 팔로잉
            </Txt>
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
              <Txt size={14} color={color_token.black}>
                {friend.nickname}
              </Txt>
            </View>
            <TouchableOpacity style={styles.unfollowButton} onPress={() => openUnfollowPopup(friend)}>
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
    backgroundColor: color_token.white,
  },
  header: {},
  tabContainer: {
    flexDirection: 'row',
    borderBottomColor: color_token.gray300,
  },
  ActiveTab: {
    flex: 1,
    paddingVertical: size(10),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: color_token.black,
  },
  NonActiveTab: {
    flex: 1,
    paddingVertical: size(10),
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: color_token.gray100,
    paddingHorizontal: size(20),
    paddingTop: size(10),
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: size(12),
  },
  followerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderWidth: 0.64,
    borderRadius: size(50),
    borderColor: color_token.gray350,
    backgroundColor: color_token.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: size(12),
  },
  baseballIcon: {
    width: size(12),
    height: size(12),
  },
  unfollowButton: {
    width: 32,
    height: 32,
    backgroundColor: color_token.gray150,
    borderRadius: size(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  unfollowIcon: {
    width: 9.9,
    height: 9.9,
  },
})

export default FollowerScreen
