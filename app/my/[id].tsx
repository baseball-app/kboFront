import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons'
import {router, Stack} from 'expo-router'
import {horizontalScale, moderateScale, verticalScale} from '@/utils/metrics'
import {theme} from '@/constants/Colors'
import {useLocalSearchParams} from 'expo-router'
import useFriends, {FriendType} from '@/hooks/my/useFriends'

interface Follower {
    id: string
    name: string
    isFollowing: boolean
}

const FollowerScreen = () => {
    const {id} = useLocalSearchParams()
    const [activeTab, setActiveTab] = useState<FriendType>(id as FriendType)

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

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
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
                    <View key={friend.user_id} style={styles.followerItem}>
                        <View style={styles.followerInfo}>
                            <View style={styles.iconContainer}>
                                <Image
                                    source={require('../../assets/profile_images/ball.png')}
                                    style={styles.baseballIcon}
                                />
                            </View>
                            <Text style={styles.followerName}>{friend.nickname}</Text>
                        </View>
                        <TouchableOpacity style={styles.unfollowButton}>
                            <Image source={require('../../assets/icons/x.png')} style={styles.unfollowIcon} />
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
    header: {
        paddingBottom: verticalScale(10),
    },
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
