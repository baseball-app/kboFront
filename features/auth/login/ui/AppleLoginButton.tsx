import React from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useAppleLogin} from '../model';
import {Pressable} from '@/shared';
import {size} from '@/shared';
import {Txt} from '@/shared/ui/Txt';
import {color_token} from '@/constants/theme';

const AppleLoginButton = () => {
  const {onPressButton} = useAppleLogin();

  if (Platform.OS !== 'ios') return null;

  return (
    <Pressable style={styles.button} onPress={onPressButton}>
      <Image
        source={require('@/assets/icons/apple.png')}
        style={[styles.loginIcon, {height: size(18), marginBottom: size(2)}]}
      />
      <Txt size={15} weight="semibold" color={color_token.white} style={styles.text}>
        Apple로 시작하기
      </Txt>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: size(12),
    paddingHorizontal: size(20),
    borderRadius: size(8),
    width: '100%',
    height: size(50),
  },
  loginIcon: {
    marginRight: size(4),
    width: size(14),
    height: size(14),
  },
  text: {
    marginLeft: size(8),
  },
});
export {AppleLoginButton};
