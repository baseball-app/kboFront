import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native'
import {theme} from '@/constants/Colors'
import useMyInfo from '@/hooks/my/useMyInfo'

import {SafeAreaView} from 'react-native-safe-area-context'
import {ROUTES, useAppRouter} from '@/shared'

import {AccountMenuWidget} from '@/widgets/account-menu'
import {ProfileBox, TeamBox} from '@/widgets/my-info'
import {AddFriendInput} from '@/features/user/friend/follow'
import {AlarmIcon} from '@/entities/alarm'
import {color_token} from '@/constants/theme'

const ProfileScreen = () => {
  const {profile, onPasteInviteCode} = useMyInfo()
  const router = useAppRouter()

  return (
    <SafeAreaView style={[styles.container, {flex: 1}]}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.container, {backgroundColor: color_token.white}]}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
          <View
            style={{
              backgroundColor: color_token.gray150,
              paddingBottom: 32,
              paddingTop: 12,
              position: 'relative',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderBottomStartRadius: 20,
              borderBottomEndRadius: 20,
              overflow: 'hidden',
            }}>
            <View
              style={{
                paddingHorizontal: 24,
                position: 'absolute',
                top: 10,
                right: 0,
                alignItems: 'flex-end',
                paddingTop: 10,
              }}>
              <AlarmIcon onPress={() => router.push(ROUTES.MY_ALARM)} />
            </View>
            <View style={{height: 10}} />
            {/* 프로필 박스 */}
            <ProfileBox />
            {/* 팀 박스 */}
            <TeamBox />

            <View style={styles.statsContainer}>
              <PressableButton
                onPress={() => router.push(ROUTES.MY_FOLLOWERS)}
                label="팔로워"
                value={`${profile?.followers}`}
              />
              <PressableButton
                onPress={() => router.push(ROUTES.MY_FOLLOWINGS)}
                label="팔로잉"
                value={`${profile?.followings}`}
              />
              <PressableButton
                onPress={onPasteInviteCode}
                label="초대코드"
                value={
                  <Image //
                    source={require('@/assets/icons/invitation.png')}
                    style={styles.inviteCodeIcon}
                  />
                }
              />
            </View>
            <AddFriendInput />
          </View>

          {/* 메뉴 */}
          <AccountMenuWidget />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

const PressableButton = ({onPress, label, value}: {onPress: () => void; label: string; value: React.ReactNode}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.statItem, styles.statBox]} onPress={onPress}>
      <View style={{gap: 10}}>
        <Text style={styles.statLabel}>{label}</Text>
        {typeof value === 'string' ? <Text style={styles.statValue}>{value}</Text> : value}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    flex: 1,
    backgroundColor: color_token.gray150,
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
