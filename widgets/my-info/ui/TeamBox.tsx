import {ROUTES, size, useAppRouter} from '@/shared';
import useProfile from '@/hooks/my/useProfile';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {color_token} from '@/constants/theme';
import {Txt} from '@/shared/ui';

const TeamBox = () => {
  const router = useAppRouter();
  const {profile} = useProfile();
  return (
    <View style={styles.teamCard}>
      <View style={styles.teamInfo}>
        <Image source={profile.my_team?.logo} style={styles.teamLogo} resizeMode="contain" />
        <Txt size={16} weight="semibold" color={color_token.gray900}>
          {profile.my_team?.name}
        </Txt>
      </View>

      <TouchableOpacity style={styles.teamSettingsIconBox} onPress={() => router.push(ROUTES.MY_CHANGE_TEAM)}>
        <Image source={require('@/assets/icons/gear.png')} style={styles.teamSettingsIcon} />
      </TouchableOpacity>
    </View>
  );
};

export {TeamBox};

const styles = StyleSheet.create({
  teamCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color_token.white,
    borderWidth: size(1),
    borderColor: color_token.gray350,
    margin: size(20),
    marginBottom: size(14),
    padding: size(15),
    borderRadius: size(10),
    height: size(68),
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamLogo: {
    width: size(32),
    height: size(32),
    marginRight: size(10),
  },
  teamSettingsIconBox: {
    backgroundColor: color_token.secondary,
    borderRadius: size(50),
    width: size(26),
    height: size(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamSettingsIcon: {
    width: size(16),
    height: size(16),
  },
});
