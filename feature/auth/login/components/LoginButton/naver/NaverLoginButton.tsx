import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useNaverLogin} from './useNaverLogin'

const NaverLoginButton = () => {
  const {onPressButton} = useNaverLogin()

  return (
    <TouchableOpacity style={styles.button} onPress={onPressButton}>
      <Image source={require('@/assets/icons/naver.png')} style={[styles.loginIcon]} />
      <Text style={styles.text}>네이버로 시작하기</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#03C75A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    height: 50,
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
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

export {NaverLoginButton}
