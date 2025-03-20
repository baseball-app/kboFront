import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons'
import {router, Stack} from 'expo-router'
import {horizontalScale, moderateScale, verticalScale} from '@/utils/metrics'
import {theme} from '@/constants/Colors'
import {useLocalSearchParams} from 'expo-router'
import useFriends, {Friend, FriendType} from '@/hooks/my/useFriends'
import {findProfileImageById} from '@/constants/join'
import useMakeFriend from '@/hooks/my/useMakeFriend'
import {usePopup} from '@/slice/commonSlice'
import Header from '@/components/common/Header'

interface Follower {
  id: string
  name: string
  isFollowing: boolean
}

const FollowerScreen = () => {
  const {id} = useLocalSearchParams()
  const [activeTab, setActiveTab] = useState<FriendType>(id as FriendType)
  const {modal} = usePopup()
  const {unfollowFriend} = useMakeFriend()

  const {followers, followings} = useFriends()

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
    })
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

      {/* Follower List */}
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
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(20),
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomColor: '#E4E2DC',
  },
  tab: {
    paddingVertical: verticalScale(10),
    marginRight: horizontalScale(20),
  },
  ActiveTab: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  NonActiveTab: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },
  tabTextNonActive: {
    fontSize: moderateScale(16),
    color: '#999',
  },
  tabTextActive: {
    fontSize: moderateScale(16),
    color: '#000',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(10),
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
  },
  followerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderWidth: 0.64,
    borderRadius: 50,
    borderColor: '#D0CEC7',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: horizontalScale(12),
  },
  baseballIcon: {
    width: moderateScale(12.57),
    height: moderateScale(12.57),
  },
  followerName: {
    fontSize: moderateScale(14),
    color: '#000',
  },
  followButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    backgroundColor: '#111111',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followIcon: {
    width: moderateScale(9.9),
    height: moderateScale(9.9),
  },
  unfollowButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    backgroundColor: '#F3F2EE',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unfollowIcon: {
    width: moderateScale(9.9),
    height: moderateScale(9.9),
  },
  // removeButton: {
  //   width: moderateScale(32),
  //   height: moderateScale(32),
  //   backgroundColor: '#F3F2EE',
  //   borderRadius: 50,
  // },
})

export default FollowerScreen
