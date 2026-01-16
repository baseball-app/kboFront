import React from 'react'
import {Image, StyleSheet} from 'react-native'
import {useKakaoLogin} from '../model'
import {Txt} from '@/shared/ui/Txt'
import {Pressable, size} from '@/shared'

const KakaoLoginButton = () => {
  const {onPressButton} = useKakaoLogin()

  return (
    <Pressable style={styles.button} onPress={onPressButton}>
      <Image source={require('@/assets/icons/kakao.png')} style={[styles.loginIcon]} />
      <Txt size={15} weight="semibold" color={'#191919'} style={styles.text}>
        카카오로 시작하기
      </Txt>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FEE500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: size(12),
    paddingHorizontal: size(20),
    borderRadius: size(8),
    width: '100%',
    height: size(50),
  },
  text: {
    marginLeft: size(8),
  },
  loginIcon: {
    marginRight: size(4),
    width: size(14),
    height: size(14),
  },
})

export {KakaoLoginButton}
