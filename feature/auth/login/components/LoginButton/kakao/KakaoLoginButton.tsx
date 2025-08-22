import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useKakaoLogin} from './useKakaoLogin'

const KakaoLoginButton = () => {
  const {onPressButton} = useKakaoLogin()

  return (
    <TouchableOpacity style={styles.button} onPress={onPressButton}>
      <Image source={require('@/assets/icons/kakao.png')} style={[styles.loginIcon]} />
      <Text style={styles.text}>카카오로 시작하기</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FEE500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    height: 50,
  },
  text: {
    color: '#191919',
    fontSize: 15,
    fontWeight: 600,
    marginLeft: 8,
  },
  loginIcon: {
    marginRight: 4,
    width: 14,
    height: 14,
  },
})

export {KakaoLoginButton}
