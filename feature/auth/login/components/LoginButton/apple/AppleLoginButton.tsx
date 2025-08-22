import React from 'react'
import {Image, Platform, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useAppleLogin} from './useAppleLogin'

const AppleLoginButton = () => {
  const {onPressButton} = useAppleLogin()

  if (Platform.OS !== 'ios') return null

  return (
    <TouchableOpacity style={styles.button} onPress={onPressButton}>
      <Image source={require('@/assets/icons/apple.png')} style={[styles.loginIcon, {height: 18, marginBottom: 2}]} />
      <Text style={styles.text}>Apple로 시작하기</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    height: 50,
  },
  loginIcon: {
    marginRight: 4,
    width: 14,
    height: 14,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
})
export {AppleLoginButton}
