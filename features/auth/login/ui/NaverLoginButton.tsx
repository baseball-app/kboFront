import React from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNaverLogin} from '../model';
import {Txt} from '@/shared/ui/Txt';
import {color_token} from '@/constants/theme';
import {size} from '@/shared';

const NaverLoginButton = () => {
  const {onPressButton} = useNaverLogin();

  return (
    <Pressable style={styles.button} onPress={onPressButton}>
      <Image source={require('@/assets/icons/naver.png')} style={[styles.loginIcon]} />
      <Txt size={15} weight="semibold" color={color_token.white} style={styles.text}>
        네이버로 시작하기
      </Txt>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#03C75A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: size(12),
    paddingHorizontal: size(20),
    borderRadius: size(8),
    height: size(50),
    width: '100%',
  },
  text: {
    marginLeft: size(8),
  },
  loginIcon: {
    marginRight: size(4),
    width: size(14),
    height: size(14),
  },
});

export {NaverLoginButton};
