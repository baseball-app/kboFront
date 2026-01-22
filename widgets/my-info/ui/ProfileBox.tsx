import {ProfileImage} from '@/entities/user';
import {ROUTES, size, useAppRouter} from '@/shared';
import useProfile from '@/hooks/my/useProfile';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Pressable, Txt} from '@/shared/ui';
import {color_token} from '@/constants/theme';

const ProfileBox = () => {
  const router = useAppRouter();
  const {profile} = useProfile();

  return (
    <View style={styles.profileHeader}>
      <ProfileImage source={profile.profile_image} />
      <View style={styles.profileInfoBox}>
        <View style={styles.profileInfo}>
          <Txt size={20} weight="bold">
            {profile?.nickname} 님
          </Txt>
          <Pressable onPress={() => router.push(ROUTES.MY_CHANGE_NICKNAME)}>
            <Image
              source={require('@/assets/icons/edit_pen.png')}
              style={styles.profileEditIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <View style={styles.winRateContainer}>
          <Txt size={16} color={color_token.gray700}>
            승요력
          </Txt>
          <Txt size={16} color={color_token.primary}>
            {profile?.predict_ratio}%
          </Txt>
        </View>
      </View>
    </View>
  );
};

export {ProfileBox};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: size(20),
    paddingBottom: 0,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(4),
  },
  profileInfoBox: {
    gap: size(4),
    justifyContent: 'center',
    flexDirection: 'column',
  },
  profileEditIcon: {
    width: size(18),
    height: size(18),
  },
  winRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(2),
  },
});
