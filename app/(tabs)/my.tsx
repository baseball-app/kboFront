import React, {useRef, useState} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native'
import {Ionicons} from '@expo/vector-icons' // Assuming you're using Expo
import {theme} from '@/constants/Colors'
import {router} from 'expo-router'
import {useLogin} from '@/hooks/auth/useLogin'
import useMyInfo from '@/hooks/my/useMyInfo'
import ProfileImageBox from '@/components/common/ProfileImageBox'
import useTeam from '@/hooks/match/useTeam'
import useMakeFriend from '@/hooks/my/useMakeFriend'
import {usePushMessage} from '@/hooks/usePushMessage'
import Clipboard from '@react-native-clipboard/clipboard'
import {usePopup} from '@/slice/commonSlice'
import {Config} from '@/config/Config'

const ProfileScreen = () => {
  const {logout} = useLogin()
  const {profile, onPasteInviteCode, withdrawUser} = useMyInfo()
  const {openCommonPopup} = usePopup()
  const {} = useTeam()

  const [inviteCode, setInviteCode] = useState<string | undefined>(undefined)
  const {addFriend} = useMakeFriend()
  const inputRef = useRef<TextInput>(null)

  const {deviceToken} = usePushMessage()

  const copyDeviceToken = () => {
    Clipboard.setString(deviceToken)
    openCommonPopup(`토큰이 복사되었습니다.`)
  }

  return (
    <SafeAreaView style={[styles.container, {flex: 1}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.backgroundPrimary,
              paddingBottom: 20,
              paddingTop: 12,
              position: 'relative',
            }}>
            <Pressable
              onPress={() => router.push('/my/alarm')}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: 24,
                paddingTop: 10,
                paddingBottom: 0,
                position: 'absolute',
                right: 0,
                top: 0,
              }}>
              <Image source={require('@/assets/icons/tabMenu/alarmMenuActive.png')} style={{width: 24, height: 24}} />
              {profile.is_unread ? (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#E42217',
                    borderRadius: 9999,
                    position: 'absolute',
                    right: 22,
                    top: 10,
                  }}
                />
              ) : null}
            </Pressable>
            <View style={styles.profileHeader}>
              <ProfileImageBox source={profile.profile_image} />

              <View style={styles.profileInfoBox}>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profile?.nickname} 님</Text>
                  <TouchableOpacity onPress={() => router.push('/my/change-nickname')}>
                    <Image
                      source={require('@/assets/icons/edit_pen.png')}
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

              <TouchableOpacity style={styles.teamSettingsIconBox} onPress={() => router.push('/my/change-team')}>
                <Image source={require('../../assets/icons/gear.png')} style={styles.teamSettingsIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.statItem, styles.statBox]}
                onPress={() => {
                  router.push('/my/followers')
                }}>
                <View style={{gap: 10}}>
                  <Text style={styles.statLabel}>팔로워</Text>
                  <Text style={styles.statValue}>{profile?.followers}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.statItem, styles.statBox]}
                onPress={() => {
                  router.push('/my/followings')
                }}>
                <View style={{gap: 10}}>
                  <Text style={styles.statLabel}>팔로잉</Text>
                  <Text style={styles.statValue}>{profile?.followings}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.statItem, styles.statBox]}
                onPress={onPasteInviteCode}>
                <View style={{gap: 10}}>
                  <Text style={styles.statLabel}>초대코드</Text>
                  <Image source={require('../../assets/icons/invitation.png')} style={styles.inviteCodeIcon} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.inviteCodeInputBox}>
              <TextInput
                placeholder="초대코드를 입력해주세요"
                style={styles.inviteCodeInput}
                value={inviteCode}
                onChangeText={setInviteCode}
                placeholderTextColor="#95938B"
                ref={inputRef}
              />
              <TouchableOpacity
                style={[styles.inviteCodeInputButton, !inviteCode && {backgroundColor: '#D0CEC7'}]} //
                disabled={!inviteCode}
                onPress={() => {
                  inputRef.current?.blur()
                  inviteCode &&
                    addFriend(inviteCode).finally(() => {
                      setInviteCode(undefined)
                    })
                }}>
                <Text style={[styles.inviteCodeInputButtonText, !inviteCode && {color: '#77756C'}]}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/my/terms')}>
              <Text style={styles.menuText}>이용약관</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/my/inquiry')}>
              <Text style={styles.menuText}>문의하기</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={logout}>
              <Text style={styles.menuText}>로그아웃</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={withdrawUser}>
              <Text style={styles.menuText}>회원탈퇴</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>

            {Config.MODE === 'dev' ? (
              <TouchableOpacity style={styles.menuItem} onPress={copyDeviceToken}>
                <Text style={styles.menuText}>디바이스 토큰 복사</Text>
                <Ionicons name="chevron-forward" size={24} color="gray" />
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.colors.backgroundPrimary,
    backgroundColor: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfoBox: {
    gap: 10,
    justifyContent: 'center',

    flexDirection: 'column',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 4,
  },
  profileEditIcon: {
    width: 18,
    height: 18,
  },
  winRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  winRateLabel: {
    fontSize: 16,
    marginRight: 3,
    color: 'gray',
  },
  winRateValue: {
    fontSize: 16,
    color: '#2D68FF', // Blue color for the percentage
    // fontWeight: "bold",
  },
  teamCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    margin: 20,
    marginBottom: 14,
    padding: 15,
    borderRadius: 10,
    // width: 327,
    height: 68,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  teamName: {
    fontWeight: '600',
    fontSize: 16,
  },
  teamSettingsIconBox: {
    backgroundColor: '#00184F',
    borderRadius: 50,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamSettingsIcon: {
    width: 16,
    height: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    gap: 12,
  },
  statItem: {
    flex: 1,
  },
  statBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  statValue: {
    fontSize: 22,
    lineHeight: 22 * 1.4,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171716',
  },
  inviteCodeIcon: {
    width: 32,
    height: 32,
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginVertical: 1,
  },
  menuText: {
    fontSize: 16,
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
  inviteCodeInputBox: {
    marginHorizontal: 20,
    marginTop: 14,
    backgroundColor: '#F3F2EE',
    paddingVertical: 12,
    paddingHorizontal: 14,
    paddingLeft: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D0CEC7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inviteCodeInput: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171716',
    maxWidth: '60%',
  },
  inviteCodeInputButton: {
    backgroundColor: '#1E5EF4',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  inviteCodeInputButtonText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: '#FFFFFF',
  },
})

export default ProfileScreen
