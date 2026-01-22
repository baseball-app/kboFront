import React from 'react';
import {View, Image, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Dimensions} from 'react-native';
import {theme} from '@/constants/Colors';
import useMyInfo from '@/hooks/my/useMyInfo';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ROUTES, size, useAppRouter} from '@/shared';

import {AccountMenuWidget} from '@/widgets/account-menu';
import {ProfileBox, TeamBox} from '@/widgets/my-info';
import {AddFriendInput} from '@/features/user/friend/follow';
import {AlarmIcon} from '@/entities/alarm';
import {color_token} from '@/constants/theme';
import {Pressable, Txt} from '@/shared/ui';

const ProfileScreen = () => {
  const {profile, onPasteInviteCode} = useMyInfo();
  const router = useAppRouter();

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
              paddingBottom: size(32),
              paddingTop: size(12),
              position: 'relative',
              borderBottomLeftRadius: size(20),
              borderBottomRightRadius: size(20),
              borderBottomStartRadius: size(20),
              borderBottomEndRadius: size(20),
              overflow: 'hidden',
            }}>
            <View
              style={{
                paddingHorizontal: size(24),
                position: 'absolute',
                top: size(10),
                right: 0,
                alignItems: 'flex-end',
                paddingTop: size(10),
              }}>
              <AlarmIcon onPress={() => router.push(ROUTES.MY_ALARM)} />
            </View>
            <View style={{height: size(10)}} />
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
  );
};

const PressableButton = ({onPress, label, value}: {onPress: () => void; label: string; value: React.ReactNode}) => {
  return (
    <Pressable style={[styles.statItem, styles.statBox]} onPress={onPress}>
      <View>
        <Txt>{label}</Txt>
        {typeof value === 'string' ? (
          <Txt size={22} weight="semibold" color={color_token.gray900}>
            {value}
          </Txt>
        ) : (
          value
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    flex: 1,
    backgroundColor: color_token.gray150,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: size(20),
    gap: size(12),
  },
  statItem: {
    flex: 1,
  },
  statBox: {
    backgroundColor: 'white',
    padding: size(15),
    borderRadius: size(10),
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  statValue: {
    marginBottom: size(4),
  },
  inviteCodeIcon: {
    width: size(32),
    height: size(32),
  },
});

export default ProfileScreen;
