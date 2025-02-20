import React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Clipboard} from 'react-native'
import {Ionicons} from '@expo/vector-icons' // Assuming you're using Expo
import {moderateScale, horizontalScale, verticalScale} from '../../utils/metrics'
import {theme} from '@/constants/Colors'
import {router} from 'expo-router'
import {useLogin} from '@/hooks/useLogin'
import useMyInfo from '@/hooks/my/useMyInfo'
import ProfileImageBox from '@/components/common/ProfileImageBox'

const ProfileScreen = () => {
  const {logout} = useLogin()
  const {profile, onPasteInviteCode, withdrawUser} = useMyInfo()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <ProfileImageBox source={profile.profile_image} />

        <View style={styles.profileInfoBox}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile?.nickname} 님</Text>
            <TouchableOpacity
              onPress={() => {
                // router.push('/profile/edit')
              }}
              style={styles.profileEditIconBox}>
              <Image
                source={require('../../assets/icons/edit.png')}
                style={styles.profileEditIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.winRateContainer}>
            <Text style={styles.winRateLabel}>승요력</Text>
            <Text style={styles.winRateValue}>{profile?.predict_ratio}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.teamCard}>
        <View style={styles.teamInfo}>
          <Image
            // image 연결해줘야 함 어떻게 ?
            // 로고 url을 넣을 것인가?
            source={profile.my_team?.logo}
            style={styles.teamLogo}
            resizeMode="contain"
          />
          <Text style={styles.teamName}>{profile.my_team?.name}</Text>
        </View>

        <TouchableOpacity style={styles.teamSettingsIconBox} onPress={() => router.push('/my/change')}>
          <Image source={require('../../assets/icons/gear.png')} style={styles.teamSettingsIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statItem, styles.statBox]}>
          <Text style={styles.statLabel}>팔로워</Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/my/followers')
            }}>
            <Text style={styles.statValue}>{profile?.followers}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.statItem, styles.statBox]}>
          <Text style={styles.statLabel}>팔로잉</Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/my/followings')
            }}>
            <Text style={styles.statValue}>{profile?.followings}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.statItem, styles.statBox]}>
          <Text style={styles.statLabel}>초대코드</Text>
          <TouchableOpacity onPress={onPasteInviteCode}>
            <Image source={require('../../assets/icons/invitation.png')} style={styles.inviteCodeIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Text style={styles.menuText}>로그아웃</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={withdrawUser}>
          <Text style={styles.menuText}>회원탈퇴</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* <PopUpModal
                isInviteModalVisible={isInviteModalVisible}
                setIsInviteModalVisible={setIsInviteModalVisible}
                isWithdrawalModalVisible={isWithdrawalModalVisible}
                setIsWithdrawalModalVisible={setIsWithdrawalModalVisible}
            /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileImageBox: {
    backgroundColor: '#F3F2EE',
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: 50,
    marginRight: horizontalScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(0.8),
    borderColor: '#D0CEC7',
  },
  profileImage: {
    width: horizontalScale(46.44),
    height: verticalScale(50.58),
    backgroundColor: '#F5F5F5', // Light background color
  },
  profileInfo: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileInfoBox: {
    // paddingTop: verticalScale(6),
    // paddingBottom: verticalScale(7),

    gap: verticalScale(10),
    // flex:1,
    justifyContent: 'center',

    flexDirection: 'column',
  },
  profileName: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginRight: horizontalScale(4),
  },
  profileEditIconBox: {
    backgroundColor: '#00184F',
    borderRadius: 50,
    width: moderateScale(18),
    height: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEditIcon: {
    width: moderateScale(8.18),
    height: moderateScale(8.18),
  },
  winRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  winRateLabel: {
    fontSize: moderateScale(16),
    marginRight: verticalScale(3),
    color: 'gray',
  },
  winRateValue: {
    fontSize: moderateScale(16),
    color: '#2D68FF', // Blue color for the percentage
    // fontWeight: "bold",
  },
  teamCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: moderateScale(1),
    borderColor: theme.colors.borderColor,
    margin: moderateScale(20),
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    // width: verticalScale(327),
    height: verticalScale(68),
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamLogo: {
    width: horizontalScale(32),
    height: verticalScale(32),
    marginRight: 10,
  },
  teamName: {
    fontWeight: '600',
    fontSize: moderateScale(16),
  },
  teamSettingsIconBox: {
    backgroundColor: '#00184F',
    borderRadius: moderateScale(50),
    width: moderateScale(26),
    height: moderateScale(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamSettingsIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    gap: horizontalScale(12),
  },
  statItem: {
    flex: 1,
  },
  statBox: {
    backgroundColor: 'white',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    gap: verticalScale(10),
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  statValue: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  statLabel: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: '#171716',
  },
  inviteCodeIcon: {
    width: horizontalScale(16),
    height: verticalScale(16),
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 1,
  },
  menuText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default ProfileScreen
